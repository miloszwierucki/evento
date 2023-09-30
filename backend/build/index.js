import Fastify from "fastify";
import { google } from "googleapis";
import fastifyStatic from "@fastify/static";
import "dotenv/config";
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
// Background color pallete
var Color;
(function (Color) {
    Color[Color["gray"] = 0] = "gray";
    Color[Color["blue"] = 1] = "blue";
    Color[Color["red"] = 2] = "red";
    Color[Color["pink"] = 3] = "pink";
    Color[Color["grape"] = 4] = "grape";
    Color[Color["violet"] = 5] = "violet";
    Color[Color["indigo"] = 6] = "indigo";
    Color[Color["cyan"] = 7] = "cyan";
    Color[Color["teal"] = 8] = "teal";
    Color[Color["green"] = 9] = "green";
    Color[Color["lime"] = 10] = "lime";
    Color[Color["yellow"] = 11] = "yellow";
    Color[Color["orange"] = 12] = "orange";
})(Color || (Color = {}));
// Static website
fastify.register(fastifyStatic, {
    root: path.join(__dirname, process.env.STATIC_FOLDER || "dist"),
});
// Insert event in Google calendar
const postEventOpts = {
    schema: {
        body: {
            type: "object",
            properties: {
                accessToken: { type: "string" },
                titleSchema: { type: "string" },
                name: { type: "string" },
                surname: { type: "string" },
                description: { type: "string" },
                guestEmail: { type: "string" },
                startTime: { type: "string" },
                duration: { type: "number" },
            },
            required: [
                "accessToken",
                "titleSchema",
                "name",
                "surname",
                "description",
                "guestEmail",
                "startTime",
                "duration",
            ],
        },
    },
};
fastify.post("/insert-event/:uuid", postEventOpts, async (request, reply) => {
    const { accessToken, titleSchema, name, surname, description, guestEmail, startTime, duration, } = request.body;
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
            summary: titleSchema
                .replace("${name}", name)
                .replace("${surname}", surname),
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
            attendees: [{ email: guestEmail }],
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
fastify.put("/list-events/:uuid", getEventsOpts, (request, reply) => {
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
            events?.map((e) => (e.bgColor =
                Color[Math.floor(Math.random() * 13)]));
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
