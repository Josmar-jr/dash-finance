import decode from "jwt-decode";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPropsResult,
} from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../services/errors/authTokenError";
import { validateUserPermissions } from "./validateUserPermitions";

type WithSSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
};

export function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetStaticPropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies["dashFinance.token"];

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    if (options) {
      const user = decode<{ permissions: string[]; roles: string[] }>(token);

      const { permissions, roles } = options;

      const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles,
      });

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false,
          }
        }
      }
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, "dashFinance.token");
        destroyCookie(ctx, "dashFinance.refreshToken");

        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }
  };
}
