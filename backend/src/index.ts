import Fastify from "fastify";
import { google } from "googleapis";
import "dotenv/config";

const fastify = Fastify({ logger: true });

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS as string);
let accessToken: string;

// Auth google service account
const googleJWTClient = new google.auth.JWT(
  CREDENTIALS.client_email,
  "",
  CREDENTIALS.private_key,
  [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ]
);

googleJWTClient.authorize((error: Error | null, token) => {
  if (error) {
    return console.error("Couldn't get access token", error);
  }
  if (token?.access_token) accessToken = token?.access_token;
});

fastify.get("/access-token", async (request, reply) => {
  reply.send([accessToken]);
});

fastify.get("/add", async (request, reply) => {
  const startEvent = new Date();
  const endEvent = new Date(startEvent);
  endEvent.setHours(endEvent.getHours() + 1);

  const event = {
    summary: "nameEvent",
    description: "descEvent",
    start: {
      dateTime: startEvent.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: endEvent.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    attendees: [{ email: "mibru2016@gmail.com" }],
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
      "https://www.googleapis.com/calendar/v3/calendars/dbae957512da60cdf153a68682e64c2224b31a33bddd3ff9b6c12456a7ca92c3@group.calendar.google.com/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(event),
      }
    );

    if (!response.ok) {
      throw new Error("Bad response");
    }
    const json = await response.json();
    reply.send(json);
  } catch (err) {
    reply.send(err);
  }
});

// --------------------------------

§


// --------------------------------

// Listen port 3000
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Started server at ${address}`);
});
