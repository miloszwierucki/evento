import { Container, Space, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { EventCard } from "../../components/EventCard/EventCard";
import { IEvents } from "./ViewEventsPage.types";
import { useSession } from "@supabase/auth-helpers-react";
import { getCalendarEvents } from "../../eventFunction/getCalendarEvents";
import { useTranslation } from "react-i18next";
import Masonry from "react-masonry-css";
import { settings } from "../../config/supabase-client";

export const ViewEventsPage = () => {
  const [events, setEvents] = useState<IEvents[]>([]);
  const { t } = useTranslation();
  const provider_token = useSession()?.provider_token as string;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCalendarEvents(provider_token);
      setEvents(data);
    };

    fetchData().catch(console.error);
  }, [provider_token]);

  return (
    <Container mih={"100%"} p="md" fluid>
      {" "}
      <Title order={1} align="center">
        {t("view-events.title")}
      </Title>
      <Space h="xl" />
      <Masonry
        breakpointCols={{ default: 3, 1100: 2, 550: 1 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {events &&
          events.map((event) => (
            <EventCard
              summary={event.summary}
              creatorEmail={event.creator.email}
              startTime={event.start.dateTime}
              endTime={event.end.dateTime}
              description={event.description.replace("#consultation", "")}
              link={event.htmlLink}
              status={event.attendees?.filter(
                (e) => e.email === settings?.email
              )}
              bgColor={event.bgColor}
              key={event.created}
            />
          ))}
      </Masonry>
    </Container>
  );
};
