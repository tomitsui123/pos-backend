# Deploy Backend v2

This deployment runs v2 beside the existing backend so it can be tested before
POS devices are switched over.

## Files

- Compose file: `docker-compose.v2.yml`
- Env template: `example.v2.env`
- Runtime env file: `.env.v2`
- Backend container: `shop-pos-backend-v2`
- Mongo container: `shop-mongo-v2`
- Backend host port: `8082`
- Mongo host port: `127.0.0.1:27018`
- Mongo data directory: `data-v2`

The backend container does not bind-mount the source directory in v2. Dependencies
are installed into the Docker image during `docker compose ... up --build`; this
prevents host files from hiding image `node_modules`.

## Prepare Env

```console
cp example.v2.env .env.v2
```

Edit `.env.v2` and replace every `replace-with-*` value. Use a new
`API_DEVICE_TOKEN` if you want v2 devices to authenticate separately from v1.

`docker-compose.v2.yml` uses `example.v2.env` as a safe default `env_file` so
Compose can be validated before secrets exist. Runtime values are supplied by
`--env-file .env.v2` in the commands below.

The backend container is forced by Compose to use:

```env
PORT=80
MONGODB_HOST=shop-mongo-v2
MONGODB_PORT=27017
```

## Start v2

```console
docker compose --env-file .env.v2 -f docker-compose.v2.yml -p pos-v2 up -d --build
```

## Verify v2

```console
docker compose --env-file .env.v2 -f docker-compose.v2.yml -p pos-v2 ps
curl http://localhost:8082/api/health
```

Expected health response includes:

```json
{
  "status": "ok",
  "currentVersion": "v2"
}
```

## Switch Mobile To v2

Build the mobile release with the v2 backend URL and v2 device token:

```console
POS_RELEASE_API_BASE_URL=https://your-v2-domain.example.com/api/ \
POS_API_DEVICE_TOKEN=replace-with-v2-device-token \
./gradlew verifyReleaseSecurityConfig assembleRelease
```

## Stop v2

```console
docker compose --env-file .env.v2 -f docker-compose.v2.yml -p pos-v2 down
```

This does not delete `data-v2`. To remove v2 data, stop the stack first and then
delete the `data-v2` directory intentionally.
