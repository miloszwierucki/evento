import { v4 as uuidv4 } from "uuid";

export async function getCalendarEvents(provider_token: string) {
  const uuid = uuidv4();

  try {
    const response = await fetch(`/list-events/${uuid}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ accessToken: provider_token }),
    });
    if (!response.ok) {
      throw new Error("Bad response");
    }

    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}
