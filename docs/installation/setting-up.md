---
sidebar_position: 1
---

# Setting up 

This guide will help you install and run Maxun on your system.

## Prerequisites

- Node.js (18.0 or above)
- PostgreSQL (if not using Docker)
- MinIO (if not using Docker)
- Redis (if not using Docker)

## Environment Setup

1. Create a `.env` file in the project root folder
2. Copy the content from the example env file to your `.env`

## Installation Options

### Using Docker Compose

1. Copy the `docker-compose.yml` file
2. Ensure `.env` file is configured
3. Run:
```bash
docker-compose up -d
```

### Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/getmaxun/maxun
```

2. Install dependencies:
```bash
cd maxun
npm install

cd maxun-core 
npm install
cd ..
```

3. Setup Playwright:
```bash
npx playwright install
npx playwright install-deps
```

4. Start the application:
```bash
npm run start
```

## Access the Application

- Frontend: [http://localhost:5173/](http://localhost:5173/)
- Backend: [http://localhost:8080/](http://localhost:8080/)