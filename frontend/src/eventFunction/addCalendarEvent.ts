import { showNotification } from "../components/Notifications/showNotification";
import { INotification } from "../components/Notifications/Notification.types";
import { Session } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../config/supabase-client";

const notiProps: INotification = {
  title: "add-event.title",
  message: "add-event.message",
  successTitle: "add-event.successTitle",
  successMessage: "add-event.successMessage",
  errTitle: "add-event.errTitle",
  errMessage: "add-event.errMessage",
};

export async function addCalendarEvent({
  session,
  startEvent,
  duration,
  descEvent,
}: {
  session: Session;
  startEvent: Date | null;
  duration: string;
  descEvent: string;
}) {
  if (startEvent instanceof Date) {
    const { data: settings } = await supabase
      .from("settings")
      .select("*")
      .single();

    let failed = false;

    const uuid = uuidv4();
    const event = {
      titleSchema: settings?.title,
      accessToken: session.provider_token as string,
      name: (session.user.user_metadata.name as string) || "",
      surname: (session.user.user_metadata.surname as string) || "",
      description: descEvent as string,
      guestEmail: settings?.email,
      startTime: startEvent,
      duration: Number(duration),
    };

    try {
      const response = await fetch(`/insert-event/${uuid}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        throw new Error("Bad response");
      }

      // const json = await response.json();
      // return json;
    } catch (err) {
      console.log(err);
      failed = !failed;
    }

    showNotification({ failed, ...notiProps });
  }
}
