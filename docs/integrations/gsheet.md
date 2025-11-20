---
sidebar_position: 1
description: Sync the data extracted by your robot directly into a Google Sheet.
---

# Google Sheet
> Google Sheet integration is available only for extract robots.

## Overview

Google Sheets integration allows you to automatically sync the data extracted by your robot directly into a Google Sheet. Whenever the robot completes a successful run, the captured data is appended to your designated Google Sheet, enabling seamless and real-time data management.

## Key Features

1. Automatic Data Syncing: Every successful robot run appends the captured data directly to your Google Sheet.
2. Effortless Data Management: Keep all your extracted data organized in a single Google Sheet for easy access and sharing.
3. Real-Time Updates: As soon as a run is complete, the data appears in your Google Sheet.

## Important Note

The data extracted before integrating with Google Sheets will not be synced in the Google Sheet. Only the data extracted after the integration will be synced.

## Setting Up Google Sheets Integration

### Maxun Cloud
#### 1. No Setup Needed
Skip the hassle of creating API keys or Google Cloud projects. Everything is pre-configured for you.

#### 2. One-Click Google Authentication
Simply sign in with your Google account. Maxun Cloud handles the OAuth flow securely in the background.

![Maxun GSheet Integration](gsheet_integration.png)

#### 3. Select a Spreadsheet from Google Drive
Once authenticated, choose any spreadsheet from your Google Drive where you want to store your data.

![Maxun GSheet Sheets](gsheet_sheets.png)

#### 4. Automatic Data Sync
After each successful robot run, your data is automatically appended to the selected sheet. You can disconnect or change the integration at any time.

![Maxun GSheet Integrated](gsheet_integrated.png)

### Maxun Open Source

#### 1. Bring Your Own Google OAuth Keys
Obtain Google OAuth keys by setting up a project in the [Google Cloud Console](https://console.cloud.google.com/).
Ensure the necessary API permissions (Google Sheets and Google Drive APIs) are enabled for the project.

#### 2. Authenticate With Google
Set up the OAuth Keys in the `.env` file and authenticate the robot with google **using the same account that was used to create the Client ID and Client Secret**.

![Maxun GSheet Integration](gsheet_integration.png)

#### 3. Select Spread Sheet From Google Drive
On successful authentication with google, the robot will be granted access to Google Drive. A spreadsheet can be selected from the Drive to store data from the run.

![Maxun GSheet Sheets](gsheet_sheets.png)

After selecting the Google Sheet, the robot will automatically append data to it after each successful run. If needed, the user can remove the integration at any time.

![Maxun GSheet Integrated](gsheet_integrated.png)

## Demo Tutorial
<iframe width="560" height="315" src="https://www.youtube.com/embed/3EF66DsIze8?si=wuYdtpAhypDLELXU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
