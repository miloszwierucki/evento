import {
  Navbar,
  Text,
  NavLink,
  Box,
  ThemeIcon,
  Group,
  Avatar,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useSession } from "@supabase/auth-helpers-react";
import {
  IconTimelineEvent,
  IconSwipe,
  IconSettings,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { MainLinkProps } from "./NavLinks.types";
import { useTranslation } from "react-i18next";
import { isAdmin } from "./../../config/supabase-client";

function MainLink({ icon, color, label, to }: MainLinkProps) {
  const { t } = useTranslation();

  return (
    <NavLink
      label={<Text size="md">{t(`nav.${label}`)}</Text>}
      icon={
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
      }
      childrenOffset={28}
      component={Link}
      to={to}
      sx={{ borderRadius: "0.1rem" }}
    />
  );
}

const data: MainLinkProps[] = [
  {
    icon: <IconTimelineEvent size="1rem" />,
    color: "blue",
    label: "add-event",
    to: "/add-event",
  },
  {
    icon: <IconSwipe size="1rem" />,
    color: "violet",
    label: "view-events",
    to: "/view-events",
  },
];

const adminData: MainLinkProps[] = [
  {
    icon: <IconSettings size="1rem" />,
    color: "gray",
    label: "settings",
    to: "/settings",
  },
];

export function NavLinks() {
  const session = useSession();
  const theme = useMantineTheme();

  return (
    <>
      <Navbar.Section grow mt="xs">
        {data.map((link) => (
          <MainLink {...link} key={link.label} />
        ))}
        {isAdmin &&
          adminData.map((link) => <MainLink {...link} key={link.label} />)}
      </Navbar.Section>
      <Navbar.Section
        sx={{
          paddingTop: theme.spacing.sm,
          borderTop: `${rem(1)} solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        }}
      >
        <Group>
          <Avatar src={session?.user.user_metadata.avatar_url} radius="xl" />
          <Box sx={{ flex: 1, overflow: "hidden" }}>
            <Text size="sm" weight={500}>
              {session?.user.user_metadata.full_name}
            </Text>
            <Text color="dimmed" size="xs">
              {session?.user.email}
            </Text>
          </Box>
        </Group>
      </Navbar.Section>
    </>
  );
}
