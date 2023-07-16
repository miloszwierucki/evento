import {
  Box,
  Card,
  Divider,
  Group,
  Spoiler,
  Text,
  ThemeIcon,
  px,
  useMantineTheme,
} from "@mantine/core";
import { IEventCard, IStatusColor } from "./EventCard.types";
import { useTranslation } from "react-i18next";
import { IconQuestionMark, IconCheck, IconX } from "@tabler/icons-react";

// Status color
const statusColor: IStatusColor = {
  needsAction: { color: "gray", icon: <IconQuestionMark /> },
  declined: { color: "red", icon: <IconX /> },
  tentative: { color: "lime", icon: <IconQuestionMark /> },
  accepted: { color: "green", icon: <IconCheck /> },
};

export function EventCard({
  summary,
  creatorEmail,
  startTime,
  endTime,
  description,
  link,
  status,
  bgColor,
}: IEventCard) {
  const { t } = useTranslation();
  const theme = useMantineTheme();

  const start = new Date(startTime);
  const end = new Date(endTime);

  const state =
    (status && status.reduce((_acc, cur) => cur.responseStatus, "")) ||
    "needsAction";

  return (
    <Card
      shadow="md"
      padding="lg"
      bg={
        theme.colorScheme === "light"
          ? theme.fn.rgba(theme.colors[bgColor][1], 1)
          : theme.fn.rgba(theme.colors[bgColor][6], 0.4)
      }
    >
      <Group>
        <ThemeIcon
          radius="md"
          size="lg"
          color={theme.fn.rgba(theme.colors[statusColor[state].color][4], 0.8)}
        >
          {statusColor[state].icon}
        </ThemeIcon>
        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <Text
            weight="600"
            size="xl"
            component="a"
            href={link}
            target="_blank"
          >
            {`${summary}`}
          </Text>
          <Text size="sm" mt={-2} mb={2}>
            {String(start.toLocaleTimeString().substring(0, 5)) +
              "-" +
              String(end.toLocaleTimeString().substring(0, 5)) +
              " | " +
              String(start.toLocaleDateString())}
          </Text>
        </Box>
      </Group>

      <Divider variant="dashed" my="sm" />

      <Spoiler
        maxHeight={px("3rem")}
        showLabel={t("view-events.showButton")}
        hideLabel={t("view-events.hideButton")}
      >
        {description}
      </Spoiler>
      <Text
        size="xs"
        color="dimmed"
        align="end"
        mb={px("-0.75rem")}
        mt={px("0.5rem")}
      >
        {creatorEmail}
      </Text>
    </Card>
  );
}
