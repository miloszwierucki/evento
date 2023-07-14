import { Flex, Stack, Title } from "@mantine/core";
import { getCalendarEvents } from "../../eventFunction/getCalendarEvents";
import { useEffect, useState } from "react";
import { EventCard } from "../../components/EventCard/EventCard";
import { IEvents } from "./ViewEventsPage.types";
import { useSession } from "@supabase/auth-helpers-react";

export const ViewEventsPage = () => {
  const [events, setEvents] = useState<IEvents[]>([]);
  const [adminAccount, setAdminAccount] = useState(false);
  const creatorEmail = useSession()?.user.email as string; // email address of the person who created the event through this web application

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCalendarEvents(adminAccount, creatorEmail);

      setEvents(data);
    };

    fetchData().catch(console.error);
  }, [adminAccount, creatorEmail]);

  return (
    <Stack align="center">
      <Title order={1}>View Event</Title>
      <button onClick={() => setAdminAccount(!adminAccount)}>
        Switch Admin account
      </button>
      <button
        onClick={async () => {
          const data = await getCalendarEvents(adminAccount, creatorEmail);
          setEvents(data);
        }}
      >
        Reload
      </button>
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        {events &&
          events.map((event) => (
            <EventCard summary={event.summary} key={event.summary} />
          ))}
      </Flex>
    </Stack>
  );
};
