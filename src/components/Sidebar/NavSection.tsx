import { Box, Stack, Text } from "@chakra-ui/layout";
import { ReactNode } from "react";
import { RiGroupLine, RiPieChart2Line } from "react-icons/ri";
import { NavLink } from "./NavLink";

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <Box>
      <Text fontWeight="bold" color="gray.400" fontSize="small">
        {title}
      </Text>
      <Stack spacing="4" mt="8">
        {children}
      </Stack>
    </Box>
  );
}
