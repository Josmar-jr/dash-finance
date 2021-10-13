import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchHref = false,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  let isActive = false;

  if (shouldMatchHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if (
    !shouldMatchHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, { color: isActive ? "blue.500" : "white.400" })}
    </Link>
  );
}
