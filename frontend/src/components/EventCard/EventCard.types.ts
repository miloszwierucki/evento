export interface IEventCard {
  summary: string;
  creatorEmail: string;
  startTime: string;
  endTime: string;
  description: string;
  link: string;
  status?: any;
  bgColor: string;
}

export interface IStatusColor {
  [key: string]: { color: string; icon: JSX.Element };
}
