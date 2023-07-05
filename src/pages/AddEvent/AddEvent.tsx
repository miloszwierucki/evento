import { Stack, Title } from "@mantine/core";
import { EventForm } from "../../components/EventForm/EventForm";

export const AddEvent = () => {
  return (
    <Stack align="center">
      <Title order={1}>Evento</Title>
      <EventForm />
    </Stack>
  );
};
