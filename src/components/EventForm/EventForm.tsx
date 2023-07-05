import { Container, Button, TextInput, Textarea, Stack } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { createCalendarEvent } from "./createCalendarEvent";
import { IEventForm } from "./EventForm.types";
import { useSession } from "@supabase/auth-helpers-react";

export const EventForm = () => {
  // const supabase = useSupabaseClient();
  const session = useSession();

  const form = useForm({
    initialValues: {
      nameEvent: "",
      descEvent: "",
      startEvent: null,
    },

    validate: {
      nameEvent: (value) =>
        value.length < 5 ? "Event name must have at least 5 letters" : null,
      startEvent: (value: Date) => (value < new Date() ? "Invalid date" : null),
    },
  });

  return (
    session && (
      <Container>
        <form
          onSubmit={form.onSubmit((values: IEventForm) =>
            createCalendarEvent({
              session,
              ...values,
            })
          )}
        >
          <Stack spacing="md" h={300}>
            <TextInput
              placeholder="..."
              label="Event name"
              withAsterisk
              {...form.getInputProps("nameEvent")}
            />
            <DateTimePicker
              clearable
              label="Start of your event"
              placeholder="Pick date and time"
              withAsterisk
              {...form.getInputProps("startEvent")}
            />
            <Textarea
              placeholder="..."
              label="Event description"
              {...form.getInputProps("descEvent")}
            />
            <Button type="submit">Create event</Button>
          </Stack>
        </form>
      </Container>
    )
  );
};
