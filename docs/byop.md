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
<td width="30%" height="100">
<a href="www.novada.com/?github-maxun">
  <img src="https://github.com/user-attachments/assets/68262e31-639a-4d36-a281-e50b68fcdc92" alt="Novada" width="300" height="150" />
</a>
</td>
<td width="70%">

#### <a href="www.novada.com/?github-maxun">Novada</a>

Novada provides high-quality residential proxies and a powerful Scraper API for reliable web data collection at scale. Access real residential IPs worldwide, reduce blocks, and collect the data your scraping workflows need.
<br />
<b>Discount Code: `GitNOVADA` - Get 20% off Rotating Residential Proxies and Scraping solutions.</b>
</td>
</tr>
</table>