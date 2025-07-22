---
sidebar_position: 4
---

# Upgrading

Upgrading Maxun is straightforward, whether you're running it locally or using Docker Compose. Follow the instructions below based on your setup.


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
    docker rmi getmaxun/maxun-frontend:latest getmaxun/maxun-backend:latest
    ```

4.  **Pull Latest Docker Images**

    Pull the newest Docker images for your backend and frontend services.

    ```bash
    docker-compose pull backend frontend
    ```

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
