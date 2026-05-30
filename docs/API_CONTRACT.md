# POS API Contract

This contract is shared by the Android POS app and backend.

## Authentication

Write endpoints require:

```http
Authorization: Bearer <token>
```

The backend accepts either a signed JWT from `/api/user/verify` or the configured `API_DEVICE_TOKEN`.

Missing or invalid credentials return:

```json
{
  "message": "Unauthorized"
}
```

## Health

`GET /api/health`

Response:

```json
{
  "status": "ok",
  "currentVersion": "1.0.0",
  "updatedAt": "2026-05-30",
  "environment": "production"
}
```

## Menu

`GET /api/recipe`

Response:

```json
{
  "recipe": [],
  "options": []
}
```

## Orders

`GET /api/order?date=YYYY-MM-DD`

Response:

```json
{
  "orders": [],
  "totalSales": 0
}
```

Each order in `orders` uses Mongo `_id` as the backend order id. The Android app
maps `_id` to `serverOrderId`.

Invalid dates return `400`:

```json
{
  "message": "The date format is not correct"
}
```

`POST /api/order`

Creates or updates an order by `clientOrderId`. Retrying the same request with the same `clientOrderId` must not duplicate an order.

Request body includes the mobile order payload plus:

```json
{
  "clientOrderId": "mobile-order-uuid",
  "itemList": []
}
```

Validation rules:

- `clientOrderId` is required and must be stable across retries.
- `itemList` is required.
- Each item must include a positive numeric `amount`.
- Each item must provide a non-negative numeric `price` or `menuProperty.price`.
- `total` and `totalAmount`, when present, must be non-negative numbers.

Invalid payloads return `400` with a `message` explaining the first invalid field.

Response:

```json
{
  "message": "order created",
  "id": "backend-order-id",
  "clientOrderId": "mobile-order-uuid",
  "orderNumber": 12,
  "createdAt": "2026-05-30T10:00:00.000Z",
  "updatedAt": "2026-05-30T10:00:00.000Z",
  "syncVersion": 1
}
```

`PUT /api/order/:serverOrderId`

Updates a backend order and returns the same response shape with `message: "order updated"`.

The request body uses the same validation rules as `POST /api/order`.

`DELETE /api/order/:serverOrderId`

Soft-deletes an order.

Response:

```json
{
  "message": "deleted order(id: backend-order-id).",
  "id": "backend-order-id"
}
```
