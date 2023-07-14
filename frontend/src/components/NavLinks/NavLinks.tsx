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
import { IconTimelineEvent, IconSwipe } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { MainLinkProps } from "./NavLinks.types";
import { useTranslation } from "react-i18next";

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

const data = [
  {
    icon: <IconTimelineEvent size="1rem" />,
    color: "blue",
    label: "add-event",
    to: "/add-event",
    admin: false,
  },
  {
    icon: <IconSwipe size="1rem" />,
    color: "violet",
    label: "view-events",
    to: "/view-events",
    admin: false,
  },
];

export function NavLinks() {
  const session = useSession();
  const theme = useMantineTheme();

  return (
    <>
      <Navbar.Section grow mt="xs">
        {data
          .filter((link) => link.admin === false)
          .map((link) => (
            <MainLink {...link} key={link.label} />
          ))}
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
