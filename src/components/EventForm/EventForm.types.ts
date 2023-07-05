import { Session } from "@supabase/auth-helpers-react";

export interface IEventForm {
  session?: Session;
  startEvent: Date | null;
  nameEvent: string;
  descEvent: string;
}
