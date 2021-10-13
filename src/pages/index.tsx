import { Flex, Stack, Button } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { useAuth } from "../contexts/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Toaster } from "react-hot-toast";

import { withSSRGuest } from "../utils/withSSRGuest";

type SignInFromData = {
  email: string;
  password: string;
};

const signInFormSchema = yup
  .object()
  .shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória"),
  })
  .required();

export default function Home() {
  const { singIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInFromData>({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFromData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await singIn(values);

    reset();
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="full"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            error={errors.email}
            {...register("email")}
          />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            error={errors.password}
            {...register("password")}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          size="lg"
          colorScheme="blue"
          isLoading={isSubmitting}
        >
          Login
        </Button>
      </Flex>
      <Toaster />
    </Flex>
  );
}

export const getServerSideProps = withSSRGuest(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
