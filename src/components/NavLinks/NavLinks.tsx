import { Anchor, Navbar, Text } from "@mantine/core";
import { useSession } from "@supabase/auth-helpers-react";
import { Link } from "react-router-dom";

export function NavLinks() {
  const session = useSession();

  return (
    <>
      <Navbar.Section mt="xs">
        <Anchor component={Link} to="/add-event">
          Add event
        </Anchor>
      </Navbar.Section>
      <Navbar.Section grow mt="md">
        <Anchor component={Link} to="/view-events">
          View events
        </Anchor>
      </Navbar.Section>
      <Navbar.Section>
        <Text>{session?.user.email}</Text>
      </Navbar.Section>
    </>
  );
}

// import React from "react";
// import {
//   IconHome2,
//   IconUsers,
//   IconUserCheck,
//   IconShieldCheck,
//   IconLanguage,
// } from "@tabler/icons-react";
// import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";

// interface LinkProps {
//   icon: React.ReactNode;
//   color: string;
//   label: string;
// }

// function Link({ icon, color, label }: LinkProps) {
//   return (
//     <UnstyledButton
//       sx={{
//         display: "block",
//         width: "200px",
//         height: "auto",
//         padding: "10px",
//         borderRadius: "6px",

//         "&:hover": {
//           backgroundColor: "#f3f4f6",
//         },
//       }}
//     >
//       <Group>
//         <ThemeIcon color={color} variant="light" size={40}>
//           {icon}
//         </ThemeIcon>

//         <Text size="lg">{label}</Text>
//       </Group>
//     </UnstyledButton>
//   );
// }

// const data = [
//   {
//     icon: <IconHome2 size={20} />,
//     color: "blue",
//     label: "Home",
//   },
//   { icon: <IconUsers size={20} />, color: "blue", label: "Nutzer" },
//   { icon: <IconUserCheck size={20} />, color: "blue", label: "Rollen" },
//   { icon: <IconShieldCheck size={20} />, color: "blue", label: "Rechte" },
//   { icon: <IconLanguage size={20} />, color: "blue", label: "Übersetzungen" },
// ];

// export function NavLinks() {
//   const links = data.map((link) => <Link {...link} key={link.label} />);
//   return <div>{links}</div>;
// }
