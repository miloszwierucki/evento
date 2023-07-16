export interface IEventCard {
  summary: string;
  creatorEmail: string;
  startTime: string;
  endTime: string;
  description: string;
  link: string;
  status?: { responseStatus: string }[];
  bgColor: string;
}

export interface IStatusColor {
  [key: string]: { color: string; icon: JSX.Element };
}
