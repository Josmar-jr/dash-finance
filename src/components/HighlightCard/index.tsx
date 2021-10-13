import { Flex, Text, Box } from "@chakra-ui/react";
import { Icon } from '../Icons'

interface HighlightCardProps {
  type: "up" | "down" | "total";
  title: string;
  amount: number;
  lastTransaction: string;
}

const icon = {
  up: "currency-entries",
  down: "currency-outs",
  total: "currency-total",
};

export function HighlightCard({
  type,
  title,
  amount,
  lastTransaction,
}: HighlightCardProps) {
  return (
    <Box p="4" bg={type === 'total' ? 'blue.500' : "gray.800"} borderRadius="8" minW="33.3%">
      <Flex justify="space-between" align="center">
        <Text color="gray.200">{title}</Text>
        <Icon name={icon[type]} />
      </Flex>
      <Text fontSize="36" color="white">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(amount)}
      </Text>
      <Text color={type === 'total' ? 'gray.200' : "gray.400"} fontSize="sm" mt="-8px">
        {lastTransaction}
      </Text>
    </Box>
  );
}
