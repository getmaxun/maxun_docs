---
sidebar_position: 1
---

# Docker Compose

This guide will help you install and run Maxun with Docker Compose. Docker Compose is a tool that helps you define and share multi-container applications. You don't need to install each dependency used by Maxun separately as Docker Compose will automatically do it for you.

## Prerequisites

| Software    | Download Link                                                                 |
|-------------|-------------------------------------------------------------------------------|
| Docker Desktop | [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)                           |



## Installation Steps
1. Create a root folder for your project (e.g. 'maxun')

2. Generate secure secrets by running these commands and saving the output:

```bash
openssl rand -base64 48  # For JWT_SECRET
openssl rand -base64 48  # For SESSION_SECRET
openssl rand -hex 32     # For ENCRYPTION_KEY
```

3. Create a file named `.env` in the root folder of the project

4. Copy all content of <a href="https://github.com/getmaxun/maxun/blob/master/ENVEXAMPLE">example env file</a> to your `.env` file.

5. Replace the placeholder values for `JWT_SECRET`, `SESSION_SECRET`, and `ENCRYPTION_KEY` with the secrets you generated in step 2.

6. Create a file named `docker-compose.yml` in the root folder of the project

7. Copy all content from <a href="https://github.com/getmaxun/maxun/blob/develop/docker-compose.yml">project's docker-compose.yml</a> to your `docker-compose.yml` file.

8. Run

```
docker-compose up -d
```

![Docker Compose successful start](docker.png)

You can access the frontend at `PUBLIC_URL` (eg: http://localhost:5173/) and backend at `BACKEND_URL` (eg: http://localhost:8080/)

To set the `PUBLIC_URL` & `BACKEND_URL` environment variables, refer <a href="/installation/environment_variables">Environment Variables</a> section.