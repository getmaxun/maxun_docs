---
title: "Maxun Environment Variables Reference (.env)"
description: "Every environment variable for self-hosted Maxun: URLs and ports, secrets, PostgreSQL, MinIO, browser service, Google and Airtable OAuth, and AI keys."
sidebar_label: "Environment Variables"
sidebar_position: 3
---

# Environment Variables
It is important to configure all environment variables labeled as "Mandatory" to ensure Maxun operates smoothly.

## Generating Secure Secrets

The following variables must be set to unique, randomly generated values for each deployment:

```bash
openssl rand -base64 48  # For JWT_SECRET
openssl rand -base64 48  # For SESSION_SECRET
openssl rand -hex 32     # For ENCRYPTION_KEY
openssl rand -hex 32     # For BROWSER_SERVICE_TOKEN (recommended)
```

## Variable Reference

| Variable              | Mandatory | Description                                                                                  | If Not Set                                                   |
|-----------------------|-----------|----------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| `BACKEND_PORT`            | Yes       | Port to run backend on. Needed for Docker setup                                          | Default value: 8080 |
| `FRONTEND_PORT`            | Yes       | Port to run frontend on. Needed for Docker setup                                        | Default value: 5173 |
| `BACKEND_URL`            | Yes       | URL to run backend on.                                                                    | Default value: http://localhost:8080 |
| `VITE_BACKEND_URL`            | Yes       | URL used by frontend to connect to backend                                           | Default value: http://localhost:8080 |
| `PUBLIC_URL`            | Yes       | URL to run frontend on.                                                                    | Default value: http://localhost:5173 |
| `VITE_PUBLIC_URL`            | Yes       | URL used by backend to connect to frontend                                           | Default value: http://localhost:5173 |
| `NODE_ENV`            | Yes       | Set to `production` for any real deployment, or `development` when working on Maxun itself. In `production`, session cookies are marked secure and the server exits on unhandled errors so Docker can restart it. In `development`, the database schema is altered automatically on startup. | Behaves as neither: cookies are not marked secure and the schema is not altered. |
| `JWT_SECRET`          | Yes       | Secret key for signing JWTs. Generate with `openssl rand -base64 48`               | Server will refuse to start.                            |
| `DB_NAME`             | Yes       | Name of the Postgres database to connect to.                                                 | Database connection will fail.                               |
| `DB_USER`             | Yes       | Username for Postgres database authentication.                                               | Database connection will fail.                               |
| `DB_PASSWORD`         | Yes       | Password for Postgres database authentication.                                               | Database connection will fail.                               |
| `DB_HOST`             | Yes       | Host address where the Postgres database server is running.                                  | Database connection will fail.                               |
| `DB_PORT`             | Yes       | Port number used to connect to the Postgres database server.                                 | Database connection will fail.                               |
| `DB_SSL`              | No        | Set to `true` to enable SSL for the database connection. Required when using Neon or any SSL-enforced PostgreSQL host. | Defaults to `false`. SSL will not be used. |
| `ENCRYPTION_KEY`      | Yes       | Key for encrypting sensitive data. Generate with `openssl rand -hex 32`                                | Encryption functionality will not work.                      |
| `SESSION_SECRET`      | Yes       | Secret for signing session cookies. Generate with `openssl rand -base64 48`                                         | Sessions won't persist across restarts.  |
| `MINIO_ENDPOINT`      | Yes       | Endpoint URL for MinIO, to store Robot Run Screenshots.                                      | Connection to MinIO storage will fail.                       |
| `MINIO_PORT`          | Yes       | Port number for MinIO service.                                                               | Connection to MinIO storage will fail.                       |
| `MINIO_CONSOLE_PORT`          | No       | Port number for MinIO WebUI service. Needed for Docker setup.                         | Cannot access MinIO Web UI. |
| `MINIO_ACCESS_KEY`    | Yes       | Access key for authenticating with MinIO.                                                    | MinIO authentication will fail.                              |
| `MINIO_SECRET_KEY`    | Yes       | Secret key for authenticating with MinIO. Generate with `openssl rand -base64 24`           | MinIO authentication will fail.                              |
| `MINIO_PUBLIC_URL`    | No        | Public base URL browsers use to reach stored screenshots and files, e.g. `https://storage.example.com`. Set it when MinIO is behind a reverse proxy. | Files are served from the MinIO endpoint and port. |
| `GOOGLE_CLIENT_ID`    | No       | Client ID for Google OAuth, used for Google Sheet integration authentication.                 | Google login will not work.                                  |
| `GOOGLE_CLIENT_SECRET`| No       | Client Secret for Google OAuth.                                                              | Google login will not work.                                  |
| `GOOGLE_REDIRECT_URI` | No       | Redirect URI for handling Google OAuth responses.                                            | Google login will not work.                                  |
| `AIRTABLE_CLIENT_ID` | No       | Client ID for Airtable, used for Airtable integration authentication.                         | Airtable login will not work.  |
| `AIRTABLE_REDIRECT_URI` | No    | Redirect URI for handling Airtable OAuth responses.                                           | Airtable login will not work.  |
| `BROWSER_WS_PORT`     | Yes       | Port for WebSocket connections to the browser service (used for CDP connections).            | Default value: 3001 |
| `BROWSER_HEALTH_PORT` | Yes       | Port for browser service health checks.                                                      | Default value: 3002 |
| `BROWSER_WS_HOST`     | Yes       | Host address for the browser service. Set to `browser` for Docker, `localhost` for local.   | Browser service connections will fail. |
| `BROWSER_SERVICE_TOKEN` | No (recommended) | Shared secret between the backend and the browser service. When set, the browser service only gives its control endpoint to callers presenting this token. Set the same value for both (the Docker Compose file passes it to both). Generate with `openssl rand -hex 32`. Added in v0.1.1. | Any caller that can reach the browser service's health port can control the browser. Keep the browser ports off untrusted networks. |
| `BROWSER_LISTEN_HOST` | No        | Network interface the browser service's WebSocket server listens on. Only read by the browser service. Added in v0.1.1. | Default value: `0.0.0.0` (all interfaces), so the backend container can connect. |
| `MAXUN_TELEMETRY`     | No        | Enables anonymous usage telemetry. Keeping it enabled helps us understand how the product is used and assess the impact of any new changes. Please keep it enabled. | Telemetry data will not be collected. |
| `ALLOW_PRIVATE_NAVIGATION_URLS` | No | Set to `true` to let robots open loopback, private-network (RFC1918), link-local and cloud metadata addresses, including public hostnames that resolve to them. Only enable it if you scrape intranet or `localhost` sites and trust every user of the instance. Added in v0.1.1. | Default value: `false`. Robots cannot open internal addresses. |
| `ANTHROPIC_API_KEY`   | No        | API key for Anthropic Claude. Used by AI Mode when Anthropic is the LLM provider and no key is entered in Model settings. | AI Mode with Anthropic Claude will not work without a key in Model settings. |
| `OPENAI_API_KEY`      | No        | API key for OpenAI GPT. Used by AI Mode when OpenAI is the LLM provider and no key is entered in Model settings. | AI Mode with OpenAI GPT will not work without a key in Model settings. |
| `OLLAMA_BASE_URL`     | No        | Ollama server for AI Mode. Use `http://host.docker.internal:11434` when Maxun runs in Docker and Ollama on the host, or `https://ollama.com` for Ollama Cloud. | Default value: `http://localhost:11434` |
| `OLLAMA_API_KEY`      | No        | API key sent to the Ollama server. Required for Ollama Cloud; a local Ollama ignores it. | Ollama Cloud requests are rejected. |
| `OLLAMA_MODEL`        | No        | Ollama model used by AI Mode when none is chosen in Model settings, e.g. `gpt-oss:20b` on Ollama Cloud. | Default value: `llama3.2` |