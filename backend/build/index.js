import Fastify from "fastify";
// import cors from "@fastify/cors";
import { google } from "googleapis";
import "dotenv/config";
const fastify = Fastify({ logger: true });
// await fastify.register(cors, { origin: true });
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;
const calendar = google.calendar({ version: "v3" });
let token;
// Auth google service account
const googleJWTClient = new google.auth.JWT(CREDENTIALS.client_email, "", CREDENTIALS.private_key, ["https://www.googleapis.com/auth/calendar"], // You may need to specify scopes other than analytics
"");
googleJWTClient.authorize((error, access_token) => {
    if (error) {
        return console.error("Couldn't get access token", error);
    }
    token = access_token?.access_token;
});
fastify.get("/cos", async (request, reply) => {
    reply.send("Placki1");
});
fastify.get("/users", async (request, reply) => {
    reply.send([{ id: 1, name: "Wacek" }]);
});
// get list event from calendar
fastify.get("/events", async (request, reply) => {
    try {
        const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/dbae957512da60cdf153a68682e64c2224b31a33bddd3ff9b6c12456a7ca92c3@group.calendar.google.com/events", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        if (!response.ok) {
            throw new Error("Bad response");
        }
        const json = await response.json();
        reply.send(json);
    }
    catch (err) {
        console.log("Kurwa błąd", err);
    }
});
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Started server at ${address}`);
});
