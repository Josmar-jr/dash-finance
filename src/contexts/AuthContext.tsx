import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";

import toast from "react-hot-toast";
import { api } from "../services/apiClient";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type CredencialsData = Omit<User, "email"> & {
  token: string;
  refreshToken: string;
};

type SignInCredencials = {
  email: string;
  password: string;
};

type AuthContextData = {
  singIn: (credencials: SignInCredencials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, "dashFinance.token");
  destroyCookie(undefined, "dashFinance.refreshToken");

  authChannel.postMessage("signOut");

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          signOut();
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { "dashFinance.token": token } = parseCookies();

    if (token) {
      api
        .get<any>("/me")
        .then((response) => {
          const { email, permissions, roles } = response.data;

          setUser({ email, permissions, roles });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function singIn({ email, password }: SignInCredencials) {
    try {
      const response = await api.post<CredencialsData>("sessions", {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = response.data;

      setCookie(undefined, "dashFinance.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setCookie(undefined, "dashFinance.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser({
        email,
        permissions,
        roles,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success("Usuário logado com sucesso!");

      authChannel.postMessage("signIn");

      Router.push("/dashboard");
    } catch (err) {
      toast.error(`${err}`);
    }
  }

  return (
    <AuthContext.Provider value={{ singIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);

  return value;
}
