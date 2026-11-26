---
title: "Upgrade Self-Hosted Maxun (Docker & Local)"
description: "Upgrade self-hosted Maxun to the latest version with Docker Compose or a local setup. Pull new images or code and restart in a few commands."
sidebar_label: "Upgrading"
sidebar_position: 4
---

# Upgrading

Upgrading Maxun is straightforward, whether you're running it locally or using Docker Compose. Follow the instructions below based on your setup.

:::warning Upgrading to v0.1.1 or later from an earlier version
v0.1.1 moves to PostgreSQL 18 and replaces the MinIO image. Your database does **not** move across on its own. Read [Upgrading to v0.1.1](#upgrading-to-v011) before you start.
:::


## Upgrading with Docker Compose

1.  **Navigate to your Project Directory**

    Open your terminal or command prompt and change your current directory to your Maxun project folder (e.g., `maxun`).

    ```bash
    cd maxun
    ```

2.  **Stop Running Containers**

    First, stop any currently running Maxun containers.

    ```bash
    docker-compose down
    ```

3.  **Remove Old Docker Images (Optional but Recommended)**

    To free up disk space and ensure you're using the freshest images without any caching issues, remove your old backend and frontend images.

    > **Note:** If you're on **Windows**, run these commands in **PowerShell**, **Git Bash**, or **WSL** (Windows Subsystem for Linux), not Command Prompt (CMD).

    ```bash
    docker rmi getmaxun/maxun-frontend:latest getmaxun/maxun-backend:latest getmaxun/maxun-browser:latest
    ```

4.  **Pull Latest Docker Images**

    Pull the newest Docker images for your backend, frontend and browser services.

    ```bash
    docker-compose pull backend frontend browser
    ```

    Always upgrade these three together. The backend upgrades the database when it starts, and an older backend image cannot start against an upgraded database.

5.  **Start Maxun**

    Launch Maxun using the updated Docker images.

    ```bash
    docker-compose up -d
    ```
---

## Upgrading with Local Setup

If you've set up Maxun directly on your machine, follow these steps to upgrade to the latest version.

1.  **Navigate to your Project Directory**

    Open your terminal or command prompt and change your current directory to your Maxun project folder (e.g., `maxun`).

    ```bash
    cd maxun
    ```

2.  **Pull Latest Changes**

    Fetch the most recent updates from the `master` branch of the repository.

    ```bash
    git pull origin master
    ```

3.  **Install Dependencies**

    Update your project's dependencies to ensure everything is compatible with the new code.

    ```bash
    npm install
    ```

4.  **Start Maxun**

    Launch Maxun.

    ```bash
    npm run start
    ```

---

## Upgrading to v0.1.1

v0.1.1 changes the services Maxun runs on. If you use Docker Compose, replace your `docker-compose.yml` with the [new one](https://github.com/getmaxun/maxun/blob/develop/docker-compose.yml) and follow the steps below. Fresh installs need none of this.

| Component | Before v0.1.1 | From v0.1.1 | What you need to do |
|---|---|---|---|
| PostgreSQL | `postgres:13` (or `17` in the production guide) | `postgres:18`, new volume `postgres18_data` | Move your data with a dump and restore (below) |
| MinIO | `minio/minio` | `pgsty/silo` (a maintained MinIO fork; `minio/minio` was removed from Docker Hub) | Nothing. It keeps using the `minio_data` volume and the same `MINIO_*` variables |
| Node.js | 22 in the images | 26 in the images | Nothing for Docker. A [local setup](/installation/local) now needs Node.js 22.18 or later (Node 18 and 20 no longer work) |
| Browser service ports | published on all interfaces | published on `127.0.0.1` only | Nothing, unless another machine connected to them directly |
| Background job queue | older schema | upgraded on first start | Nothing, but see [Rolling back](#rolling-back) |

New optional environment variables: `BROWSER_SERVICE_TOKEN` (recommended), `ALLOW_PRIVATE_NAVIGATION_URLS` and `BROWSER_LISTEN_HOST`. See [Environment Variables](/installation/environment_variables).

### 1. Back up and move your PostgreSQL data

A new PostgreSQL major version cannot read an older version's data files, and from version 18 the image also keeps its data in a different folder. So PostgreSQL 18 starts on a new, empty volume (`postgres18_data`). Your old volume is left untouched.

1. With your **old** `docker-compose.yml` still in place, stop the app and dump the Maxun database. The backup holds all your data, so it is created readable only by you. Each command only runs if the previous one succeeded; if any fails, your old setup keeps running and you can retry:

    ```bash
    docker compose stop backend frontend &&
      touch maxun-backup.sql && chmod 600 maxun-backup.sql &&
      docker compose exec -T postgres sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB"' > maxun-backup.sql &&
      docker compose down
    ```

2. Replace `docker-compose.yml` with the new one. Keep the same `DB_USER`, `DB_PASSWORD` and `DB_NAME` in your `.env`. Then start only the database:

    ```bash
    docker compose up -d postgres
    ```

3. Once `docker compose ps` shows `postgres` as healthy, restore the dump. It runs as one transaction and stops at the first error, so it restores everything or nothing:

    ```bash
    docker compose exec -T postgres sh -c 'psql -v ON_ERROR_STOP=1 --single-transaction -U "$POSTGRES_USER" -d "$POSTGRES_DB"' < maxun-backup.sql
    ```

    If it reports an error, nothing was restored: fix the cause and run the same command again.

4. Check that password login works. It should print `1`:

    ```bash
    docker compose exec -T postgres sh -c 'PGPASSWORD="$POSTGRES_PASSWORD" psql -h 127.0.0.1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tAc "select 1"'
    ```

### 2. Set a browser service token (recommended)

Generate a token and add it to your `.env`. The Compose file passes it to both the backend and the browser service:

```bash
echo "BROWSER_SERVICE_TOKEN=$(openssl rand -hex 32)" >> .env
```

### 3. Pull the new images and start Maxun

```bash
docker compose pull
```

```bash
docker compose up -d
```

Open Maxun and check that your robots and past runs are there. Then delete `maxun-backup.sql` (or move it somewhere safe) and remove the old database volume:

```bash
docker volume rm <project>_postgres_data
```

Replace `<project>` with your Compose project name; `docker volume ls` lists it. If you used the [production setup](/self-host), remove the old `db` folder instead.

### Rolling back

When the v0.1.1 backend starts, it upgrades the background job queue tables in the database. An older backend refuses to start against the upgraded database, with an error like `Database is using Graphile Worker schema revision 20 ... the currently running worker only supports up to revision 18`.

So to go back to an earlier version, restore a database backup taken before the upgrade. Keep `maxun-backup.sql` and your old `postgres_data` volume until you're sure you're staying on v0.1.1.

If you see that error **without** having rolled back, Docker is running an old cached backend image. Pull or rebuild the images:

```bash
docker compose pull backend frontend browser
```
