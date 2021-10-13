import {
  Box,
  Flex,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuDivider,
} from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
  onSignOut: () => void;
  email?: string;
}

export function Profile({ showProfileData, onSignOut, email }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Josmar Junior</Text>
          <Text color="gray.400" fontSize="small">
            {email}
          </Text>
        </Box>
      )}

      <Menu>
        <MenuButton
          as={Button}
          bg="transparent"
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          _focus={{ border: "none" }}
        >
          <Avatar
            w={10}
            h={10}
            name="Josmar Jr"
            src="http://github.com/Josmar-jr.png"
          />
        </MenuButton>
        <MenuList
          color="white.500"
          bgColor="gray.800"
          border="none"
          boxShadow="md"
        >
          <MenuItem _focus={{ bg: "gray.900" }} _hover={{ bg: "gray.900" }}>
            Configurações
          </MenuItem>
          <MenuItem _focus={{ bg: "gray.900" }} _hover={{ bg: "gray.900" }}>
            Idioma
          </MenuItem>
          <MenuDivider color="gray.500" />
          <MenuItem _focus={{ bg: "gray.900" }} _hover={{ bg: "gray.900" }}>
            Tema escuro
          </MenuItem>
          <MenuItem
            onClick={onSignOut}
            _focus={{ bg: "gray.900" }}
            _hover={{ bg: "gray.900" }}
          >
            Sair
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
