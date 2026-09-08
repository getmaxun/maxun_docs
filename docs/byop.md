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
<td width="30%" align="center" valign="middle">
<a href="https://www.webshare.io/?referral_code=wwhk524ynls2">
<img src="https://github.com/user-attachments/assets/c3a60969-a8f8-4d2c-acef-22bee80c2484" alt="Webshare" width="300" />
</a>
</td>
<td width="70%" valign="middle">
<a href="https://www.webshare.io/?referral_code=wwhk524ynls2"><strong>Webshare</strong></a><br/>
Webshare gives you instant access to a proxy pool of 80M+ ethically-sourced IPs across 195+ countries, with rotating residential, static ISP, and datacenter options plus a full API. It includes a 100+ Gbps backbone, country/city/state/ZIP/ASN-level targeting, and requires no credit card to start.<br/>
<strong>Free tier:</strong> 10 proxies with 1GB/month - enough to test-drive the service before you commit.<br/>
<strong>Discount Code:</strong> <code>MAXUN20</code> - Get 20% off your first purchase.
</td>
</tr>

<tr>
<td width="30%" align="center" valign="middle">
<a href="https://mangoproxy.com/?utm_source=github&utm_medium=partner&utm_campaign=getmaxun">
<img src="https://github.com/user-attachments/assets/326b5b8f-6a2c-4aa2-94c8-6a29ae23f2ac" alt="MangoProxy" width="300" />
</a>
</td>
<td width="70%" valign="middle">
<a href="https://mangoproxy.com/?utm_source=github&utm_medium=partner&utm_campaign=getmaxun"><strong>MangoProxy</strong></a><br/>
MangoProxy offers Residential, ISP, Datacenter, and Mobile Proxies in 200+ countries with HTTP(S)/SOCKS5 support and flexible IP management.<br/>
<strong>Discount Code:</strong> <code>MAXUN</code> 8% off Static ISP Proxies.
</td>
</tr>

<tr>
<td width="30%" align="center" valign="middle">
<a href="https://go.nodemaven.com/maxunbyopaugust">
<img src="https://github.com/user-attachments/assets/348c011f-8c73-4845-85b9-8dd85f6e85ec" alt="Nodemaven" width="300" />
</a>
</td>
<td width="70%" valign="middle">
<a href="https://go.nodemaven.com/maxunbyopaugust"><strong>Nodemaven</strong></a><br/>
The most efficient proxy provider for Web Scraping and Automation with the Highest Quality IP on the market.<br/>
Why <a href="https://go.nodemaven.com/maxunbyopaugust">Nodemaven</a>?


· ZIP targeting · 99.9% uptime · IP filtering: all proxies have fraud score &lt;97% 
· No KYC required · Free tools including Proxy Bandwidth Checker, Meta Tag Checker, and IP Lookup.<br/>
<strong>Discount Codes:</strong> <code>MAXUN35</code> - 35% off Mobile and Residential Proxies. <code>MAXUN40</code> - 40% off ISP (Static) Proxies.
</td>
</tr>
</table>