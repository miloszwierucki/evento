import {
  Stack,
  Button,
  Textarea,
  SegmentedControl,
  Center,
  px,
  Text,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { addCalendarEvent } from "../../eventFunction/addCalendarEvent";
import { useSession } from "@supabase/auth-helpers-react";
import { useTranslation } from "react-i18next";

export const AddEventPage = () => {
  const session = useSession();
  const { t } = useTranslation();
  const form = useForm({
    initialValues: {
      descEvent: "",
      duration: "30",
      startEvent: null,
    },

    validate: {
      startEvent: (value: Date) =>
        value < new Date() ? `${t("add-event.formDateErr")}` : null,
    },
  });

  return (
    <Center sx={{ width: "100%", height: "80%" }}>
      <form
        onSubmit={form.onSubmit(
          (values) => session && addCalendarEvent({ session, ...values })
        )}
        style={{ width: "75%" }}
      >
        <Stack spacing="lg">
          <DateTimePicker
            clearable
            label={t("add-event.startTime")}
            placeholder={t("add-event.placeholderTime")}
            withAsterisk
            {...form.getInputProps("startEvent")}
          />
          <div>
            <Text size="sm" weight="500">
              {t("add-event.durationTime")}
            </Text>
            <SegmentedControl
              w="100%"
              radius="sm"
              data={[
                { label: "20 min", value: "20" },
                { label: "30 min", value: "30" },
                { label: "45 min", value: "45" },
                { label: "60 min", value: "60" },
              ]}
              {...form.getInputProps("duration")}
            />
          </div>
          <Textarea
            placeholder="..."
            label={t("add-event.description")}
            {...form.getInputProps("descEvent")}
            mb={px("1rem")}
          />
          <Button type="submit" w="40%" mx="auto" variant="light" size="md">
            {t("add-event.submitButton")}
          </Button>
        </Stack>
      </form>
    </Center>
  );
};
