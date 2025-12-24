# SID Service (Node.js + MySQL)

## Setup
1) Copy `.env.example` to `.env` and fill values.
2) Install deps: `npm install`
3) Run: `npm start` (or `npm run dev`)

## Routes
### Accesses (service registration)
- `POST /api/sid/accesses`
  - Body: `{ "allow_endpoint": "https://noti.yourdomain.com" }`
  - Response: `{ "token": "...", "global_id": "...", "allow_endpoint": "..." }`
- `POST /api/sid/accesses/validate`
  - Header: `Authorization: Bearer <SERVICE_TOKEN>`
  - Body: `{ "endpoint": "https://noti.yourdomain.com" }`

### Auth (user session)
- `POST /api/sid/login`
  - Body: `{ "global_id": "<user_global_id>" }`
  - Response: `{ "token": "...", "token_type": "Bearer" }`
- `GET /api/sid/me`
  - Header: `Authorization: Bearer <JWT>`

### Users (service token required)
- `POST /api/sid/users`
- `GET /api/sid/users`
- `GET /api/sid/users/:global_id`
- `PUT /api/sid/users/:global_id`
- `DELETE /api/sid/users/:global_id`

All `/api/sid/users` routes require `Authorization: Bearer <SERVICE_TOKEN>`.
