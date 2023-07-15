export interface IEvents {
  bgColor: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  location: string;
  colorId: string;
  creator: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  organizer: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  start: {
    date: Date;
    dateTime: string; // datetime
    timeZone: string;
  };
  end: {
    date: Date;
    dateTime: string; // datetime
    timeZone: string;
  };
  attendees?: [
    {
      id: string;
      email: string;
      displayName: string;
      organizer: boolean;
      self: boolean;
      resource: boolean;
      optional: boolean;
      responseStatus: string;
      comment: string;
      additionalGuests: number;
    }
  ];
  hangoutLink?: string;
  reminders?: {
    useDefault: boolean;
    overrides: [
      {
        method: string;
        minutes: number;
      }
    ];
  };
  source?: {
    url: string;
    title: string;
  };
  attachments?: [
    {
      fileUrl: string;
      title: string;
      mimeType: string;
      iconLink: string;
      fileId: string;
    }
  ];
}
