---
sidebar_position: 5
slug: /self-host/neon
---

# Self Host With Neon

[Neon](https://neon.tech) is a serverless PostgreSQL platform that lets you run a fully managed Postgres database without provisioning or maintaining your own database server. It's a great choice for self-hosting Maxun when you want to skip the overhead of running a local or Docker-managed PostgreSQL instance.

This guide walks you through connecting Maxun to a Neon database — whether you're running Maxun locally or via Docker Compose.

## Prerequisites

| Requirement | Details |
|---|---|
| Neon account | <a href="https://neon.tech" target="_blank">Sign up at neon.tech</a> |
| Maxun installed | Follow the <a href="/installation/docker">Docker Compose</a> or <a href="/installation/local">Local Setup</a> guide first |

## Step 1: Create a Neon Project

1. Log in to the <a href="https://console.neon.tech" target="_blank">Neon Console</a>
2. Click **New Project**
3. Give your project a name (e.g. `maxun`)
4. Select your preferred **region** — choose one closest to where your Maxun instance will run
5. Leave the **Postgres version** at the default (Postgres 16 or later)
6. Click **Create Project**

Once the project is created, Neon will display a connection string. **Copy it** — you'll need it in the next step.

## Step 2: Get Your Connection Details

Your Neon connection string looks like this:

```
postgresql://<user>:<password>@<host>/<dbname>?sslmode=require&channel_binding=require
```

Break it down into the individual parts that Maxun expects:

| Environment Variable | Where to find it | Example |
|---|---|---|
| `DB_USER` | The username before `:` in the connection string | `neondb_owner` |
| `DB_PASSWORD` | The value between `:` and `@` | `your_password` |
| `DB_HOST` | The hostname after `@` | `ep-xxx-yyy.region.aws.neon.tech` |
| `DB_PORT` | Always `5432` for Neon | `5432` |
| `DB_NAME` | The path segment after the last `/` (before `?`) | `neondb` |

## Step 3: Configure Your `.env` File

Open your Maxun `.env` file and update the database section with your Neon credentials:

```bash
DB_NAME=neondb
DB_USER=neondb_owner
DB_PASSWORD=your_password
DB_HOST=ep-xxx-yyy.region.aws.neon.tech
DB_PORT=5432
DB_SSL=true
```

> ⚠️ **`DB_SSL=true` is required for Neon.** Neon enforces SSL on all connections. Without this, the server will fail to start with a `connection is insecure` error.

For a full reference of all environment variables, see the <a href="/installation/environment_variables">Environment Variables</a> section.

> ℹ️ **If you are running Maxun with Docker Compose**, ensure these values are set in your `.env` file at the project root, alongside your `docker-compose.yml`. Docker Compose reads from this file automatically.

## Step 4: Run Database Migrations

Before starting Maxun for the first time, run the database migrations to create all the required tables in your Neon database.

**For local setup:**

```bash
cd server
npx sequelize-cli db:migrate
```

**For Docker Compose setup:**

```bash
docker-compose run --rm backend npx sequelize-cli db:migrate
```

A successful migration will output each migration file applied, ending with a line indicating all migrations have been executed.

> ⚠️ **Run migrations before starting Maxun for the first time**, and again after every upgrade. See the <a href="/installation/upgrade">Upgrading</a> guide for more details.

## Step 5: Start Maxun

Once migrations are complete, start Maxun as normal.

**Local setup:**

```bash
npm run start
```

**Docker Compose setup:**

Since Neon replaces the local PostgreSQL container, start all services **except** `postgres`:

```bash
docker-compose up -d minio browser backend frontend
```

> ℹ️ Running `docker-compose up -d` without excluding `postgres` will start the local PostgreSQL container unnecessarily. It won't conflict with Neon, but there's no reason to run it.

Maxun will connect to your Neon database on startup. You can verify the connection is working by checking the server logs for:

```
Database connected successfully
```

## Troubleshooting

### `connection is insecure (try using sslmode=require)`

You have not set `DB_SSL=true` in your `.env` file. Neon enforces SSL on all connections — add `DB_SSL=true` and restart Maxun.

### `getaddrinfo ENOTFOUND <hostname>`

The `DB_HOST` value is incorrect or unreachable. Double-check that you copied the full hostname from the Neon Console, including the region suffix (e.g. `ep-xxx-yyy.us-east-1.aws.neon.tech`).

### `password authentication failed for user`

The `DB_USER` or `DB_PASSWORD` value in your `.env` file does not match your Neon credentials. Return to the Neon Console, navigate to **Connection Details**, and copy the credentials again.

### Neon compute suspends after inactivity

Neon's free tier automatically suspends the compute after a period of inactivity. The first request after a suspension may take a few extra seconds while the compute wakes up. This is expected behavior and does not affect data integrity.
