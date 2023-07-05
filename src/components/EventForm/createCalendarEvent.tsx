import { notifications } from "@mantine/notifications";
import { IEventForm } from "./EventForm.types";
import { IconCheck, IconX } from "@tabler/icons-react";

export async function createCalendarEvent({
  session,
  startEvent,
  nameEvent,
  descEvent,
}: IEventForm) {
  if (startEvent instanceof Date) {
    const endEvent = new Date(startEvent);
    endEvent.setHours(endEvent.getHours() + 1);

    const event = {
      summary: nameEvent,
      description: descEvent,
      start: {
        dateTime: startEvent.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endEvent.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      attendees: [{ email: import.meta.env.VITE_GUEST_EVENT }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };

    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all&showHiddenInvitations=true",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + session?.provider_token,
          },
          body: JSON.stringify(event),
        }
      );

      notifications.show({
        id: "create-event",
        loading: true,
        title: "Creating an event...",
        message: "Google Calendar event is being created, please wait a moment",
        autoClose: false,
        withCloseButton: false,
      });

      if (!response.ok) {
        throw new Error("Bad response");
      }

      const json = await response.json();

      setTimeout(() => {
        notifications.update({
          id: "create-event",
          color: "teal",
          title: "Event created",
          message: "Event successfully created, check your Google Calendar!",
          autoClose: 2000,
          icon: <IconCheck size="1rem" />,
        });
      }, 2000);

      console.log(json);
      // return json;
    } catch (err) {
      console.log("Kurwa błąd", err);

      setTimeout(() => {
        notifications.update({
          id: "create-event",
          color: "red",
          title: "Event not created",
          message: "Failed to create event, please try again 😕",
          autoClose: 2000,
          icon: <IconX size="1rem" />,
        });
      }, 2000);
    }
  }
}
