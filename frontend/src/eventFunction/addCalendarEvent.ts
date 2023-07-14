import { showNotification } from "../components/Notifications/showNotification";
import { INotification } from "../components/Notifications/Notification.types";
import { getAccessToken } from "../config/getAccessToken";
const token = await getAccessToken();

const notiProps: INotification = {
  title: "add-event.title",
  message: "add-event.message",
  successTitle: "add-event.successTitle",
  successMessage: "add-event.successMessage",
  errTitle: "add-event.errTitle",
  errMessage: "add-event.errMessage",
};

export async function addCalendarEvent({
  creatorEmail,
  startEvent,
  nameEvent,
  descEvent,
}: {
  creatorEmail: string;
  startEvent: Date | null;
  nameEvent: string;
  descEvent: string;
}) {
  if (startEvent instanceof Date) {
    let failed = false;

    const endEvent = new Date(startEvent);
    endEvent.setHours(endEvent.getHours() + 1);

    // const token =
    //   "ya29.a0AbVbY6NDwzxc2u0RHBI-zhq30csOaL8tyy3ISQ4f4Xr7_2aC774ZqIRzKoFYXyf5uXCJ9lDHeh2rlDNDhGlMKzVkhFfDC1tYOOMd_RKpjzvgV-umUxw-Oyxw0yFYvn0gpdR4A-EqRD-jM_ybUh2Xm2CNAnZQkgaCgYKAfISARASFQFWKvPlXFe7IWiA8X0C2vjV9uboDw0165";

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
      attendees: [
        { email: creatorEmail },
        { email: import.meta.env.VITE_OWNER_EMAIL },
      ],
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
        "https://www.googleapis.com/calendar/v3/calendars/dbae957512da60cdf153a68682e64c2224b31a33bddd3ff9b6c12456a7ca92c3@group.calendar.google.com/events?sendUpdates=all&showHiddenInvitations=true",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(event),
        }
      );

      if (!response.ok) {
        throw new Error("Bad response");
      }

      // const json = await response.json();
      // console.log(json);
    } catch (err) {
      console.log("K*rwa błąd", err);
      failed = !failed;
    }

    showNotification({ failed, ...notiProps });
  }
}
