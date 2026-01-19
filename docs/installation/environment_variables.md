---
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
| `JWT_SECRET`          | Yes       | Secret key for signing JWTs. Generate with `openssl rand -base64 48`               | Server will refuse to start.                            |
| `DB_NAME`             | Yes       | Name of the Postgres database to connect to.                                                 | Database connection will fail.                               |
| `DB_USER`             | Yes       | Username for Postgres database authentication.                                               | Database connection will fail.                               |
| `DB_PASSWORD`         | Yes       | Password for Postgres database authentication.                                               | Database connection will fail.                               |
| `DB_HOST`             | Yes       | Host address where the Postgres database server is running.                                  | Database connection will fail.                               |
| `DB_PORT`             | Yes       | Port number used to connect to the Postgres database server.                                 | Database connection will fail.                               |
| `ENCRYPTION_KEY`      | Yes       | Key for encrypting sensitive data. Generate with `openssl rand -hex 32`                                | Encryption functionality will not work.                      |
| `SESSION_SECRET`      | Yes       | Secret for signing session cookies. Generate with `openssl rand -base64 48`                                         | Sessions won't persist across restarts.  |
| `MINIO_ENDPOINT`      | Yes       | Endpoint URL for MinIO, to store Robot Run Screenshots.                                      | Connection to MinIO storage will fail.                       |
| `MINIO_PORT`          | Yes       | Port number for MinIO service.                                                               | Connection to MinIO storage will fail.                       |
| `MINIO_CONSOLE_PORT`          | No       | Port number for MinIO WebUI service. Needed for Docker setup.                         | Cannot access MinIO Web UI. |
| `MINIO_ACCESS_KEY`    | Yes       | Access key for authenticating with MinIO.                                                    | MinIO authentication will fail.                              |
| `GOOGLE_CLIENT_ID`    | No       | Client ID for Google OAuth, used for Google Sheet integration authentication.                 | Google login will not work.                                  |
| `GOOGLE_CLIENT_SECRET`| No       | Client Secret for Google OAuth.                                                              | Google login will not work.                                  |
| `GOOGLE_REDIRECT_URI` | No       | Redirect URI for handling Google OAuth responses.                                            | Google login will not work.                                  |
| `AIRTABLE_CLIENT_ID` | No       | Client ID for Airtable, used for Airtable integration authentication.                         | Airtable login will not work.  |
| `AIRTABLE_REDIRECT_URI` | No    | Redirect URI for handling Airtable OAuth responses.                                           | Airtable login will not work.  |
| `BROWSER_WS_PORT`     | Yes       | Port for WebSocket connections to the browser service (used for CDP connections).            | Default value: 3001 |
| `BROWSER_HEALTH_PORT` | Yes       | Port for browser service health checks.                                                      | Default value: 3002 |
| `BROWSER_WS_HOST`     | Yes       | Host address for the browser service. Set to `browser` for Docker, `localhost` for local.   | Browser service connections will fail. |
| `MAXUN_TELEMETRY`     | No        | Disables telemetry to stop sending anonymous usage data. Keeping it enabled helps us understand how the product is used and assess the impact of any new changes. Please keep it enabled. | Telemetry data will not be collected. |
| `ANTHROPIC_API_KEY`   | No        | API key for Anthropic Claude. Required to use AI Mode with Anthropic Claude as the LLM provider. | AI Mode with Anthropic Claude will not work. |
| `OPENAI_API_KEY`      | No        | API key for OpenAI GPT. Required to use AI Mode with OpenAI GPT as the LLM provider. | AI Mode with OpenAI GPT will not work. |