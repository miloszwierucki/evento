import { getAccessToken } from "../config/getAccessToken";
const token = await getAccessToken();

export async function getCalendarEvents(
  adminAccount: boolean,
  creatorEmail: string
) {
  // const token =
  //   "ya29.a0AbVbY6NDwzxc2u0RHBI-zhq30csOaL8tyy3ISQ4f4Xr7_2aC774ZqIRzKoFYXyf5uXCJ9lDHeh2rlDNDhGlMKzVkhFfDC1tYOOMd_RKpjzvgV-umUxw-Oyxw0yFYvn0gpdR4A-EqRD-jM_ybUh2Xm2CNAnZQkgaCgYKAfISARASFQFWKvPlXFe7IWiA8X0C2vjV9uboDw0165";

  try {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/dbae957512da60cdf153a68682e64c2224b31a33bddd3ff9b6c12456a7ca92c3@group.calendar.google.com/events",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Bad response");
    }

    const json = await response.json();

    if (adminAccount) {
      // console.log(json.items);
      return json.items;
    } else {
      // console.log(
      //   json.items.filter(
      //     (e: any) =>
      //       e.attendees && e.attendees.map((e: any) => e.email === creatorEmail)
      //   )
      // );
      const data = json.items.filter(
        (e: any) =>
          e.attendees && e.attendees.map((e: any) => e.email === creatorEmail)
      );

      // console.log(data);
      return data;
    }
  } catch (err) {
    console.log("K*rwa błąd", err);
  }
}
