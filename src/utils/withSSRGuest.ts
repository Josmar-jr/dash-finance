import { GetServerSideProps, GetServerSidePropsContext, GetStaticPropsResult } from "next";
import { parseCookies } from "nookies";

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetStaticPropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (cookies["dashFinance.token"]) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
