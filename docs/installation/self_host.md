---
title: "Self-Host Maxun in Production (Docker, NGINX, HTTPS)"
description: "Deploy self-hosted Maxun in production with Docker, a reverse proxy managed via Portainer, NGINX and HTTPS. Step-by-step production guide."
sidebar_label: "Production Setup"
sidebar_position: 3
slug: /self-host
---

# Self-Host Maxun in Production

This guide deploys Maxun on your own server with **Docker Compose**, behind an **NGINX reverse proxy** with **HTTPS**. Maxun is only exposed on `localhost`, and NGINX serves it securely on your own domain (for example `maxun.my.domain`).

For a quick local install to try Maxun, see [Docker Compose](/installation/docker) instead. For a full list of settings, see [Environment Variables](/installation/environment_variables).

## Prerequisites

- A server with **Docker** and **Docker Compose**
- A web server for the reverse proxy (this guide uses **NGINX**)
- **SSL certificates** (for example from Let's Encrypt or ZeroSSL)
- A domain or subdomain for Maxun, such as `maxun.my.domain`

## 1. Create the Folders

Create a folder for Maxun and the sub-folders used to persist data between container restarts and updates:

```bash
cd /home/$USER/Docker/
mkdir -p maxun/{db,minio,redis}
cd maxun
```

## 2. Create the `.env` File

**Option A: generate it automatically (recommended).** From the root of a cloned [Maxun repository](https://github.com/getmaxun/maxun), run the generator. It writes `.env` into the current directory, so run it from the folder your `docker-compose.yml` will live in. It needs `openssl` and bash (on Windows, use WSL or Git Bash).

```bash
bash docs/generate-env.sh
```

**Option B: write it yourself.** Generate the secrets:

```bash
openssl rand -base64 48   # JWT_SECRET
openssl rand -base64 24   # DB_PASSWORD
openssl rand -hex 32      # ENCRYPTION_KEY (must be 64 hex characters)
openssl rand -base64 48   # SESSION_SECRET
openssl rand -base64 24   # MINIO_SECRET_KEY
```

Then create `.env` and paste in the values:

```dotenv
NODE_ENV=production
JWT_SECRET=<output of first command>
DB_NAME=maxun
DB_USER=postgres
DB_PASSWORD=<output of second command>
DB_HOST=postgres
DB_PORT=5432
ENCRYPTION_KEY=<output of third command>
SESSION_SECRET=<output of fourth command>
MINIO_ENDPOINT=minio
MINIO_PORT=9000
MINIO_CONSOLE_PORT=9001
MINIO_ACCESS_KEY=minio
MINIO_SECRET_KEY=<output of fifth command>
REDIS_HOST=maxun-redis
REDIS_PORT=6379
REDIS_PASSWORD=
BACKEND_PORT=8080
FRONTEND_PORT=5173
BACKEND_URL=https://maxun.my.domain
PUBLIC_URL=https://maxun.my.domain
VITE_BACKEND_URL=https://maxun.my.domain
VITE_PUBLIC_URL=https://maxun.my.domain
MAXUN_TELEMETRY=true
```

> **Note:** Don't put a literal `$` in any value. Docker Compose reads it as a variable and silently drops it, leaving you with a shorter secret. Double it (`$$`) to escape it.

Whichever option you use, check the file and set `BACKEND_URL`, `PUBLIC_URL`, `VITE_BACKEND_URL` and `VITE_PUBLIC_URL` to your domain, and change any ports you need.

## 3. Create `docker-compose.yml`

Use the production compose file from the [full self-hosting guide](https://github.com/getmaxun/maxun/blob/develop/docs/self-hosting-docker.md). It runs five services:

| Service | Image | Purpose |
|---|---|---|
| `postgres` | `postgres:17` | Database for robots, runs and users |
| `redis` | `redis:7` | In-memory data store used by the backend |
| `minio` | `minio/minio` | Storage for screenshots and files |
| `backend` | `getmaxun/maxun-backend:latest` | API, robots and browser automation, bound to `127.0.0.1:8080` |
| `frontend` | `getmaxun/maxun-frontend:latest` | Web app, bound to `127.0.0.1:5173` |

The backend and frontend only listen on `127.0.0.1`, so Maxun is not reachable from the internet until you configure the reverse proxy.

## 4. Start Maxun

```bash
sudo docker compose up -d
```

Wait about 30 seconds for all services to start. Maxun is now available locally at `http://localhost:5173`.

## 5. Configure NGINX and HTTPS

Point your domain at the server and configure NGINX to:

- Redirect HTTP to HTTPS and serve your SSL certificate
- Proxy backend paths (`/auth`, `/storage`, `/record`, `/workflow`, `/robot`, `/proxy`, `/api-docs`, `/api`, `/webhook`, `/socket.io`) to the backend port (`8080`), with WebSocket upgrade headers
- Proxy everything else (`/`) to the frontend port (`5173`)
- Add security headers and gzip compression

A complete, ready-to-edit configuration is available in the Maxun repository: [nginx.conf](https://github.com/getmaxun/maxun/blob/develop/docs/nginx.conf). Replace `maxun.my.domain` and the certificate paths with your own, then reload NGINX.

## Next Steps

- [Environment Variables](/installation/environment_variables): all available settings
- [Upgrading](/installation/upgrade): update to the latest version
- [BYOP](/byop): add your own proxies to reduce blocking
- [Cloud vs Open Source](/cloud-vs-oss): what Maxun Cloud adds on top of the self-hosted edition

The full guide is available on GitHub: [Self-Hosting Maxun with Docker](https://github.com/getmaxun/maxun/blob/develop/docs/self-hosting-docker.md).
