---
id: byop
title: BYOP 
sidebar_position: 9
---

# BYOP (Bring Your Own Proxy)

> **Note:** BYOP is available only in self-hosted installations.

Maxun provides a feature called BYOP (Bring Your Own Proxy), designed to give users greater control over their data extraction activities. With BYOP, you can connect your own proxies to Maxun, enabling:

1. Location-Specific Scraping: Access data specific to certain geographical regions.
2. Geo-Restricted Data Access: Overcome restrictions on location-based content.
3. Enhanced Security: Keep all proxy configurations secure on your self-hosted platform.

### Availability

This feature is available **exclusively for the self-hosted version of Maxun**. For cloud users, Maxun manages all anti-bot infrastructure, ensuring reliable scraping without requiring additional proxy setup.

### Proxy Configuration

HTTP and SOCKS proxies are supported. Currently, proxies are configured per user rather than per robot. However, support for per robot proxy configuration is coming soon, offering even more granular control over your scraping workflows.

### Authenticated Proxies
You can connect with authenticated proxies that require a username and password. All details are encrypted and securely stored in the database.

If your proxy requires a username and password, always provide them separate from the proxy URL.

#### The right way

- Proxy URL: http://proxy.com:1337
- Username: myusername
- Password: mypassword

#### The wrong way
- Proxy URL: http://myusername:mypassword@proxy.com:1337

### Recommended Proxy Providers
Looking for a proxy provider? The following partners offer reliable proxies that work well with Maxun. Maxun users can also take advantage of exclusive discounts.

<table>
<tr>
<td width="35%" height="100">
<a href="https://www.ipcook.com/?ref=githubmaxun&utm_source=github&utm_medium=referral&utm_campaign=maxun">
  <img src="https://github.com/user-attachments/assets/b0fba023-a858-4e99-aa28-07754dce67b5" alt="IPcook" width="400" height="150" />
</a>
</td>
<td width="70%">

#### <a href="https://www.ipcook.com/?ref=githubmaxun&utm_source=github&utm_medium=referral&utm_campaign=maxun">IPcook</a>

IPcook provides 55M+ real residential IPs across 185+ countries and regions, delivering fast and reliable proxy solutions for web scraping, automation, and data collection. 99.99% uptime, average response times under 0.5s, and 100,000 concurrency at max. Start with a [FREE 100MB Trial](https://www.ipcook.com/?ref=githubmaxun&utm_source=github&utm_medium=referral&utm_campaign=maxun) to experience IPcook’s proxy service.

<b>Discount Code: `WELCOME20` - Get 20% off your first purchase.</b>
</td>
</tr>
<tr>
<td width="40%" height="100">
<a href="https://go.nodemaven.com/maxunbyop">
  <img src="https://github.com/user-attachments/assets/264331ac-d7f4-4001-bc64-1662b11577b9" alt="Nodemaven" width="500" height="150" />
</a>
</td>
<td width="70%">

#### <a href="https://go.nodemaven.com/maxunbyop">Nodemaven</a>

The most reliable proxy provider for web scrapping with the Highest Quality IP on the market. Why <a href="https://go.nodemaven.com/maxunbyop">Nodemaven</a>?

- 99.9% uptime
- Sticky sessions up to 7 days
- IP filtering: all proxies have fraud score &lt;97%
- No KYC required
- Cashback on traffic - burn GB and earn up to 10% back

<b>Discount Code: <code>MAXUN35</code> - 35% off Mobile and Residential Proxies. <code>MAXUN40</code> - 40% off ISP (Static) Proxies.</b>

</td>
</tr>

<tr>
<td width="40%" height="100">
<a href="www.novada.com/?github-maxun">
  <img src="https://github.com/user-attachments/assets/68262e31-639a-4d36-a281-e50b68fcdc92" alt="Novada" width="500" height="150" />
</a>
</td>
<td width="70%">

#### <a href="www.novada.com/?github-maxun">Novada</a>

Novada provides high-quality residential proxies and a powerful Scraper API for reliable web data collection at scale. Access real residential IPs worldwide, reduce blocks, and collect the data your scraping workflows need.

<b>Discount Code: `GitNOVADA` - Get 20% off Rotating Residential Proxies and Scraping solutions.</b>
</td>
</tr>
</table>
