import Fastify from "fastify";
import { google } from "googleapis";
import "dotenv/config";
import fastifyStatic from "@fastify/static";
import * as path from "path";
import { fileURLToPath } from "url";
// Configuring the path to a root folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Configuration and authorization
const fastify = Fastify({ logger: true });
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.SECRET_KEY);
const calendar = google.calendar({
    version: "v3",
});
// Static website
fastify.register(fastifyStatic, {
    root: path.join(__dirname, "dist"),
});
// Insert event in Google calendar
const postEventOpts = {
    schema: {
        body: {
            type: "object",
            properties: {
                accessToken: { type: "string" },
                name: { type: "string" },
                surname: { type: "string" },
                description: { type: "string" },
                startTime: { type: "string" },
                duration: { type: "number" },
            },
            required: [
                "accessToken",
                "name",
                "surname",
                "description",
                "startTime",
                "duration",
            ],
        },
    },
};
fastify.post("/insert-event/:uuid", postEventOpts, async (request, reply) => {
    const { accessToken, name, surname, description, startTime, duration } = request.body;
    oauth2Client.setCredentials({
        access_token: accessToken,
    });
    const startEvent = new Date(startTime);
    const endEvent = new Date(startTime);
    endEvent.setMinutes(endEvent.getMinutes() + duration);
    calendar.events.insert({
        calendarId: "primary",
        sendUpdates: "all",
        auth: oauth2Client,
        requestBody: {
            summary: "Konsultacja | " + name + " " + surname,
            description: description + "\n\n#consultation",
            locked: true,
            start: {
                dateTime: startEvent.toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            end: {
                dateTime: endEvent.toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            attendees: [{ email: "mily.deuce@gmail.com" }],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: "email", minutes: 24 * 60 },
                    { method: "popup", minutes: 10 },
                ],
            },
        },
    }, (err) => {
        fastify.log.error(err);
    });
});
// Get events from Google calendar
const getEventsOpts = {
    schema: {
        body: {
            type: "object",
            properties: {
                accessToken: { type: "string" },
            },
            required: ["accessToken"],
        },
    },
};
fastify.put("/list-events/:uuid", (request, reply) => {
    const { accessToken } = request.body;
    oauth2Client.setCredentials({
        access_token: accessToken,
    });
    calendar.events.list({
        calendarId: "primary",
        auth: oauth2Client,
    }, (err, result) => {
        if (err) {
            fastify.log.error(err);
        }
        else {
            const events = result?.data.items?.filter((e) => e.description?.includes("#consultation"));
            reply.send(events);
        }
    });
});
// Listen port 3000
fastify.listen({ port: parseInt(process.env.PORT) || 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Started server at ${address}`);
});
