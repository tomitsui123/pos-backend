# POS Mobile + Backend Reliability Plan

## Current Goal

Make the in-house restaurant POS dependable during service:

- Mobile must save orders locally, print clearly, retry sync safely, and show failure states.
- Backend must provide authenticated, idempotent, predictable menu/order APIs.
- Both projects must share one API contract and have tests proving core behavior.

## Current Rating Snapshot

- Mobile app: 6.5/10 before this branch.
- Backend: 5/10 before this branch.

## Completed In These Branches

### Backend

- Repaired the test command so `npm test` runs once without watch mode.
- Removed stale/invalid tests and added API/order controller coverage.
- Added `GET /api/health`.
- Added shared API contract documentation.
- Hardened auth middleware for missing/invalid `Authorization` headers.
- Protected write endpoints for orders and recipe creation.
- Added device-token support through `API_DEVICE_TOKEN`.
- Added environment validation and safer production error handling.
- Added `helmet`, explicit CORS configuration, and auth rate limiting.
- Standardized order response fields.
- Added `clientOrderId` and idempotent `POST /api/order` upsert behavior.
- Fixed stale order route/controller bugs, including delete success behavior.
- Documented backend setup, env vars, tests, Docker, auth, and deployment notes.

### Mobile

- Moved hardcoded backend URLs into `BuildConfig.API_BASE_URL`.
- Added `BuildConfig.API_DEVICE_TOKEN` and API auth header support.
- Set debug/release API configuration and release cleartext policy.
- Set `allowBackup=false` through manifest placeholders.
- Added `clientOrderId`, `serverOrderId`, `syncVersion`, sync state, retry time, and sync error fields.
- Added Room migration for sync metadata.
- Marked checkout orders as pending create.
- Made backend upload retryable and idempotent through `clientOrderId`.
- Added WorkManager retry when network is available.
- Wrapped printer calls with result objects and visible failure dialogs.
- Added visible order sync status labels for pending/failed edits.
- Added focused unit tests for API config, sync state, printer result, and sync scheduling.

## Remaining Work

### Backend Security And Correctness

- Add structured request validation for every order and recipe write payload.
- Add stronger control-panel authentication and move away from password prompt/localStorage JWT handling.
- Apply rate limiting to all sensitive auth/control-panel write flows.
- Audit all controllers for consistent service/repository boundaries.
- Align order schema names such as `total` versus `totalAmount`.
- Store telephone consistently as a string.

### Mobile Reliability And UX

- Show global offline/server unavailable status outside the record list.
- Add a manual retry action for failed sync orders.
- Add more checkout input validation, especially numeric previous-order fields.
- Add reprint state/history so cashiers can tell whether save, print, and sync all succeeded.
- Add tests for checkout mutation, totals, discounts, order numbering, and item edits.

### Business Logic Cleanup

- Extract discount calculation, item sorting, checkout mutation, and receipt formatting from UI classes.
- Centralize category/item ordering rules.
- Keep printer-specific code behind a small service interface.

### Modernization

- Remove `kotlin-android-extensions`.
- Replace synthetic views with ViewBinding.
- Replace deprecated `ViewModelProviders`.
- Replace deprecated `startActivityForResult`.
- Clean duplicated Gradle dependencies.
- Add CI commands for backend tests and mobile unit/build verification.

## Verification Commands

Backend:

```console
npm test
```

Mobile:

```console
./gradlew testDebugUnitTest
./gradlew assembleDebug
```

## Branches

- Mobile: `codex/pos-reliability-mobile`
- Backend: `codex/pos-reliability-backend`
