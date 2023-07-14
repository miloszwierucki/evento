import {
  ActionIcon,
  Burger,
  Flex,
  Group,
  Header,
  MediaQuery,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { IconCalendarEvent, IconMoonStars, IconSun } from "@tabler/icons-react";
import { LanguagePicker } from "../LangPicker/LangPicker";
import { GoogleButton } from "../GooglButton/GoogleButton";
import { useSession } from "@supabase/auth-helpers-react";
import { IOpenedNav } from "./CustomHeader.types";

export function CustomHeader({ isOpened, setOpen }: IOpenedNav) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const session = useSession();

  return (
    <Header height={{ base: 70 }} p="md">
      <Flex
        sx={{
          height: "100%",
          marginTop: "2px",
        }}
        justify="space-between"
        align="center"
      >
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={isOpened}
            onClick={() => setOpen((o) => !o)}
            size="sm"
            color="black"
            mr="xl"
          />
        </MediaQuery>

        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Group spacing="sm" noWrap>
            <IconCalendarEvent size={42} />
            <Text size={24} mx={4}>
              Evento
            </Text>
          </Group>
        </MediaQuery>

        <Group noWrap>
          <Group noWrap>
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size="lg"
            >
              {colorScheme === "dark" ? (
                <IconSun size="1rem" />
              ) : (
                <IconMoonStars size="1rem" />
              )}
            </ActionIcon>
            <LanguagePicker />
            {session && <GoogleButton toLogin={false} />}
          </Group>
        </Group>
      </Flex>
    </Header>
  );
}
