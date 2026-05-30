# POS Backend

Express and MongoDB API for the in-house restaurant POS system. The backend stores
menu recipes and orders, accepts idempotent mobile order sync, and provides a small
control panel surface.

## Requirements

- Node.js 18+
- npm 9+
- MongoDB 6+, or Docker Compose

## Setup

```console
npm install
cp example.env .env
npm start
```

For local development, set `DEV_PORT=8080` and point the mobile app at
`http://10.0.2.2:8080/api/` for Android emulator testing.

## Environment

| Variable | Required | Notes |
| --- | --- | --- |
| `DEV_PORT` | Yes | HTTP port for the Express server. |
| `MONGODB_ROOT_USERNAME` | Yes | MongoDB username. |
| `MONGODB_ROOT_PASSWORD` | Yes | MongoDB password. |
| `MONGODB_HOST` | Yes | MongoDB host or service name. |
| `MONGODB_PORT` | Yes | MongoDB port. |
| `MONGODB_DB` | Yes | Database name. |
| `VERSION` | No | Build/version label returned by health metadata. |
| `UPDATED_AT` | No | Build timestamp label returned by health metadata. |
| `NODE_ENV` | Yes | Use `development`, `test`, or `production`. |
| `CONTROL_PANEL_PASSWORD` | Yes | Password used by the control panel login flow. |
| `JWT_SECRET` | Yes | Secret used to sign and verify JWTs. |
| `API_DEVICE_TOKEN` | Yes | Shared device token accepted as `Authorization: Bearer <token>` for POS devices. |
| `CORS_ORIGIN` | Yes | Comma-separated allowed origins, or `*` for local development only. |
| `TZ` | Yes | Runtime timezone, for example `America/Vancouver`. |

## Tests

```console
npm test
```

The test script runs Jest once with `--runInBand`, so it is suitable for local use
and CI without watch mode.

## Docker

```console
docker compose up -d
```

Use `example.env` as the starting point for the Compose environment. Production
deployments should use real secrets from the host or deployment platform rather
than committing `.env`.

## API Contract

The shared mobile/backend contract is documented in
[`docs/API_CONTRACT.md`](docs/API_CONTRACT.md).

Primary endpoints:

- `GET /api/health`
- `GET /api/recipe`
- `POST /api/order`
- `PUT /api/order/:serverOrderId`
- `GET /api/order?date=YYYY-MM-DD`
- `DELETE /api/order/:serverOrderId`

Write endpoints require an `Authorization: Bearer <token>` header. The token can
be a signed JWT or the configured `API_DEVICE_TOKEN` for POS devices.

`POST /api/order` is idempotent by `clientOrderId`, allowing the mobile app to
retry failed uploads without creating duplicate server orders.

## Deployment Notes

Run the Node process behind an HTTPS reverse proxy such as Nginx, Caddy, Traefik,
or a managed load balancer. Terminate TLS at the proxy, forward the original
client IP headers, and keep plain HTTP limited to private infrastructure.

Recommended production controls:

- Set `NODE_ENV=production`.
- Use HTTPS-only public URLs.
- Set a narrow `CORS_ORIGIN` list instead of `*`.
- Rotate `JWT_SECRET`, `API_DEVICE_TOKEN`, and `CONTROL_PANEL_PASSWORD` through a
  secret manager.
- Keep MongoDB off the public internet.
- Ship logs to a central sink and alert on repeated `401`, `400`, and `5xx`
  responses.
