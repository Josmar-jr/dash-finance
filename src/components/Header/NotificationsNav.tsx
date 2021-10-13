import { Tooltip, HStack, Icon, Button } from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";

export function NotificationsNav() {
  return (
    <HStack
      spacing={["4", "6", "8"]}
      mx={["4", "6", "8"]}
      pr={["4", "6", "8"]}
      py="1"
      borderRightWidth={1}
      borderColor="gray.800"
    >
      <Tooltip
        label="Notificações"
        hasArrow
        fontSize="md"
        bg="white"
        color="black"
      >
        <Button bg="transparent" _hover={{ bg: "gray.800" }} h="8" w="8">
          <Icon as={RiNotificationLine} fontSize="18" />
        </Button>
      </Tooltip>
      <Tooltip
        label="Adicionar usuário"
        hasArrow
        fontSize="md"
        bg="white"
        color="black"
      >
        <Button bg="transparent" _hover={{ bg: "gray.800" }} h="8" w="8">
          <Icon as={RiUserAddLine} fontSize="18" />
        </Button>
      </Tooltip>
    </HStack>
  );
}
