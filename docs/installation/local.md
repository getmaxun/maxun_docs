---
sidebar_position: 2
---

# Local Setup

This guide will help you install and run Maxun on your local system.

## Prerequisites

| Software    | Download Link                                                                 |
|-------------|-------------------------------------------------------------------------------|
| Node.js (18 or above)     | [Download Node.js](https://nodejs.org/en/download/)                           |
| PostgreSQL  | [Download PostgreSQL](https://www.postgresql.org/download/)                   |
| MinIO       | [Download MinIO](https://min.io/download)                                     |

## Installation Steps

1. Clone the repository
```
git clone https://github.com/getmaxun/maxun
```
2. Create a `.env` file in the project root folder (maxun in this case)
3. Copy the content from the <a href="https://github.com/getmaxun/maxun/blob/master/ENVEXAMPLE">example env file</a> to your `.env`
4. Ensure you have the prerequisites installed on your system.
5. Install dependencies
```
# change directory to the project root
cd maxun

# install dependencies
npm install

# change directory to maxun-core to install dependencies
cd maxun-core 
npm install

# get back to the root directory
cd ..
```
6. Browser Setup - Choose one of the following options:

   **Option A: Use the Browser Docker Service** (Recommended)
   
   If you want to use the browser Docker service, configure these environment variables in your `.env` file:
   - `BROWSER_WS_PORT`: WebSocket port for browser connections (default: 3001)
   - `BROWSER_HEALTH_PORT`: Health check port for the browser service (default: 3002)
   - `BROWSER_WS_HOST`: Browser service host (set to `localhost` for local setup)
   
   Then run the browser service using Docker:
   ```bash
   docker-compose up -d browser
   ```

   **Option B: Install Chromium Locally**
   
   If you prefer not to use the browser Docker service, install Chromium:
   ```bash
   npx playwright install --with-deps chromium
   ```

6. Run the command below in the root directory of the project

```
# start frontend and backend together
npm run start
```

You can access the frontend at `PUBLIC_URL` (eg: http://localhost:5173/) and backend at `BACKEND_URL` (eg: http://localhost:8080/)

To set the `PUBLIC_URL` & `BACKEND_URL` environment variables, refer <a href="/installation/environment_variables">Environment Variables</a> section.