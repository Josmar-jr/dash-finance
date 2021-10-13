import { Flex, Input, Icon, Button } from "@chakra-ui/react";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  const [searchText, setSearchText] = useState("");

  return (
    <Flex
      as="label"
      flex="1"
      py="2"
      px="8"
      ml="36"
      maxW={400}
      alignSelf="center"
      color="gray.300"
      position="relative"
      bg="gray.800"
      borderRadius="8"
    >
      <Input
        color="gray.200"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: "gray.300" }}
        value={searchText}
        onChange={({ target }) => setSearchText(target.value)}
      />
      {!searchText ? (
        <Button
          bg="gray.800"
          _hover={{ bg: "gray.800", opacity: 0.8 }}
          cursor="not-allowed"
        >
          <Icon as={RiSearchLine} fontSize="20" />
        </Button>
      ) : (
        <Button
          bg="gray.800"
          _hover={{ bg: "gray.800", opacity: 0.8 }}
        >
          <Icon as={RiSearchLine} fontSize="20" />
        </Button>
      )}
    </Flex>
  );
}
