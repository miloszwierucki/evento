import { notifications } from "@mantine/notifications";
import { INotification } from "./Notification.types";
import { IconCheck, IconX } from "@tabler/icons-react";
import i18n from "i18next";

export const showNotification = ({
  failed,
  title,
  message,
  successTitle,
  successMessage,
  errTitle,
  errMessage,
}: INotification) => {
  notifications.show({
    id: "system-notification",
    loading: true,
    title: `${i18n.t(title)}`,
    message: `${i18n.t(message)}`,
    autoClose: false,
    withCloseButton: false,
  });

  if (failed) {
    setTimeout(() => {
      notifications.update({
        id: "system-notification",
        color: "red",
        title: `${i18n.t(errTitle)}`,
        message: `${i18n.t(errMessage)}`,
        autoClose: 2000,
        icon: <IconX size="1rem" />,
      });
    }, 2000);
  } else {
    setTimeout(() => {
      notifications.update({
        id: "system-notification",
        color: "teal",
        title: `${i18n.t(successTitle)}`,
        message: `${i18n.t(successMessage)}`,
        autoClose: 2000,
        icon: <IconCheck size="1rem" />,
      });
    }, 2000);
  }
};
