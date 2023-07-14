import { Stack, Space, Button, TextInput, Textarea } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { addCalendarEvent } from "../../eventFunction/addCalendarEvent";
import { useSession } from "@supabase/auth-helpers-react";

export const AddEventPage = () => {
  const session = useSession();
  const creatorEmail = session?.user.email as string;

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
    <form
      onSubmit={form.onSubmit((values) =>
        addCalendarEvent({ creatorEmail, ...values })
      )}
      style={{ width: "80%" }}
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
        <Space h="lg" />
        <Button type="submit">Create event</Button>
      </Stack>
    </form>
  );
};
