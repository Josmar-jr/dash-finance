import { Stack } from "@chakra-ui/layout";
import {
  RiCalendar2Line,
  RiGroupLine,
  RiInputMethodLine,
  RiPieChart2Line,
} from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink href="/dashboard" icon={RiPieChart2Line}>
          Analytics
        </NavLink>
        <NavLink href="/customers" icon={RiGroupLine}>
          Customers
        </NavLink>
      </NavSection>
      <NavSection title="GERAL">
        <NavLink href="/finances/register" icon={RiInputMethodLine}>
          Forms
        </NavLink>
        <NavLink href="/any" icon={RiCalendar2Line}>
          Calendar
        </NavLink>
      </NavSection>
    </Stack>
  );
}
