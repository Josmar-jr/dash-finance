import { Text } from "@chakra-ui/layout";

export function Logo() {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      color="white"
    >
      My Wallet
      <Text as="span" ml="1" color="blue.500">
        .
      </Text>
    </Text>
  );
}
