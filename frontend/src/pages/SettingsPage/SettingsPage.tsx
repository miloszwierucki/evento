import {
  Button,
  Center,
  Stack,
  TextInput,
  Text,
  Code,
  px,
} from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { isAdmin, supabase } from "../../config/supabase-client";
import { showNotification } from "@mantine/notifications";
import { INotification } from "../../components/Notifications/Notification.types";

const notiProps: INotification = {
  title: "settings.title",
  message: "settings.message",
  successTitle: "settings.successTitle",
  successMessage: "settings.successMessage",
  errTitle: "settings.errTitle",
  errMessage: "settings.errMessage",
};

export const SettingsPage = () => {
  const { t } = useTranslation();
  let failed = false;
  const form = useForm({
    initialValues: {
      title: "",
      email: "",
    },

    validate: {
      title: (value) => (value.length <= 2 ? "Invalid date" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <>
      <Center sx={{ width: "100%", height: "80%", flexDirection: "column" }}>
        <Text mb={px("2rem")}>
          <p style={{ margin: "0" }}>{t("settings.guide")}</p>
          <p style={{ margin: "0" }}>
            {t("settings.guideMore")}
            <Code>$&#x7B;name&#x7D;</Code> , <Code>$&#x7B;surname&#x7D;</Code>
          </p>
        </Text>
        <form
          onSubmit={form.onSubmit(async (values) => {
            if (isAdmin) {
              const { error } = await supabase
                .from("settings")
                .update(values)
                .eq("id", 0);
              if (error) {
                console.log(error);
                failed = !failed;
              }

              showNotification({ failed, ...notiProps });
            }
          })}
          style={{ width: "75%" }}
        >
          <Stack spacing="lg">
            <TextInput
              placeholder="... | ${name} ${surname}"
              withAsterisk
              label={t("settings.titleInput")}
              {...form.getInputProps("title")}
            />
            <TextInput
              icon={<IconMail />}
              label={t("settings.emailInput")}
              placeholder="address@email.com"
              withAsterisk
              mb={px("1rem")}
              {...form.getInputProps("email")}
            />
            <Button type="submit" w="40%" mx="auto" variant="light" size="md">
              {t("settings.submitButton")}
            </Button>
          </Stack>
        </form>
      </Center>
    </>
  );
};
