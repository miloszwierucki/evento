import { calendar_v3 } from "googleapis";

export interface IAccessToken {
  accessToken: string;
}

export interface IEvent extends IAccessToken {
  titleSchema: string;
  name: string;
  surname: string;
  description: string;
  guestEmail: string;
  startTime: number;
  duration: number;
}

export interface ISchema$Event extends calendar_v3.Schema$Event {
  bgColor: string;
}
