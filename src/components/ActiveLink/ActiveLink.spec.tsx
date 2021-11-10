import { Link as ChakraLink } from "@chakra-ui/layout";
import { render, screen } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("ActiveLink component", () => {
  it("renders correctly", () => {
    render(
      <ActiveLink href="/">
        <ChakraLink>Home</ChakraLink>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("add blue color if the link currently is active", () => {
    const { debug } = render(
      <ActiveLink href="/">
        <ChakraLink color="blue.500">Home</ChakraLink>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toHaveStyle({ color: "blue.500" });
  });
});
