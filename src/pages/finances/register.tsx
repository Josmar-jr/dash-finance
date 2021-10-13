import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import {
  Flex,
  Box,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
} from "@chakra-ui/layout";
import { RiCheckLine } from "react-icons/ri";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { setupAPIClient } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function RegisterFinances() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="full" mt="12" maxW={1480} mx="auto" px="4">
        <Sidebar />

        <Box flex="1" p="8" bg="gray.800" borderRadius={8}>
          <Heading size="xl" fontWeight="normal">
            Cadastre uma transação
          </Heading>

          <Divider my="6" borderColor="gray.500" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" w="full">
              <Input name="transaction" label="Transação" />
              <Input name="number" type="number" label="Valor" />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="full">
              <Input name="date" label="Data" type="date" />
              <Input
                name="description"
                type="text"
                label="Comprovante"
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button colorScheme="whiteAlpha">Cancelar</Button>
              <Button colorScheme="blue" rightIcon={<Icon as={RiCheckLine} fontSize="20" />}>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");

    return {
      props: {},
    };
  },
  {
    permissions: ["metrics.list"],
    roles: ["administrator"],
  }
);
