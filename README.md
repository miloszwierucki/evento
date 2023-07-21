# Evento ( Google Calendar API )

Application for arranging meetings via the Google Calendar _(e.g. for personal trainers)_.
It has an interface for displaying created events and an admin panel.

## Setup

1. Run `npm install` to install all the node dependencies
2. Create **.env** in backend directory, add "CLIENT_ID" and "SECRET_KEY" of created google app, you can optionally add "PORT" _(default 3000)_, "STATIC_FOLDER" _(default dist)_
3. Create **.env** in frontend directory, add "VITE_SUPABASE_URL" and "VITE_SUPABASE_KEY" of created supabase

## Running Tests

To run tests, run the following command

Backend: _(ts-node)_

```bash
  npm start-ts
```

Frontend:

```bash
  npm run dev
```
