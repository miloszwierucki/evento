import { Avatar, Box, Card, Group, Image, Text } from "@mantine/core";
import { IEventCard } from "./EventCard.types";
import { useSession } from "@supabase/auth-helpers-react";

export function EventCard({ summary }: IEventCard) {
  const session = useSession();

  return (
    <Card
      w={"30%"}
      shadow="md"
      padding="xl"
      component="a"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
    >
      <Text weight={500} size="lg" mt="md">
        {`${summary}`}
      </Text>
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
      <Text mt="xs" color="dimmed" size="sm">
        Please click anywhere on this card to claim your reward, this is not a
        fraud, trust us
      </Text>
    </Card>
  );
}
