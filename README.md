# VERS frontend

Next.js frontend for the Vital Events Registration System. All data comes from
the [VERS backend](../vers-backend); start that first.

## Setup

```bash
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8080" > .env.local   # optional, this is the default
npm run dev
```

Open <http://localhost:3000> and log in with one of the backend's seeded users
(for example `registrar` / `registrarpass`). Each role gets its own dashboard:

- **Registrar**: register and update events.
- **Official**: review (approve/reject) events and generate reports.
- **Admin**: everything above, plus managing users.

The backend only accepts requests from `http://localhost:3000` by default. To
serve the frontend elsewhere, set `CORS_ORIGINS` on the backend.
