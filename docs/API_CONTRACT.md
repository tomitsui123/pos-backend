# POS API Contract

This contract is shared by the Android POS app and backend.

## Authentication

Write endpoints require:

```http
Authorization: Bearer <token>
```

The backend accepts either a signed JWT from `/api/user/verify` or the configured `API_DEVICE_TOKEN`.

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

`POST /api/order`

Creates or updates an order by `clientOrderId`. Retrying the same request with the same `clientOrderId` must not duplicate an order.

Request body includes the mobile order payload plus:

```json
{
  "clientOrderId": "mobile-order-uuid",
  "itemList": []
}
```

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

`DELETE /api/order/:serverOrderId`

Soft-deletes an order.
