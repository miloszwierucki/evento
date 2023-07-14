import { useState } from "react";
import { AppShell, Center, Navbar } from "@mantine/core";
import { CustomHeader } from "../components/Header/CustomHeader";
import { CustomFooter } from "../components/Footer/CustomFooter";
import { Outlet } from "react-router-dom";
import { NavLinks } from "../components/NavLinks/NavLinks";
import { useSession } from "@supabase/auth-helpers-react";

function AppShellLayout() {
  const session = useSession();
  const [openedNav, setOpenedNav] = useState(false);

  return (
    <AppShell
      asideOffsetBreakpoint="sm"
      navbarOffsetBreakpoint="sm"
      header={<CustomHeader isOpened={openedNav} setOpen={setOpenedNav} />}
      footer={<CustomFooter />}
      navbar={
        session ? (
          <Navbar
            hidden={!openedNav}
            hiddenBreakpoint="sm"
            width={{ sm: 280 }}
            p="xs"
          >
            <NavLinks />
          </Navbar>
        ) : (
          <></>
        )
      }
    >
      <Center sx={{ width: "100%", minHeight: "80%" }}>
        <Outlet />
      </Center>
    </AppShell>
  );
}

export default AppShellLayout;
