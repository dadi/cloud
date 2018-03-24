<img src="/web/workspace/public/assets/img/dadi-logo-colour.svg" width="200">

As a demonstration of **DADI** web services, we made our website open source.

## Installation

### API

```
cd ./api && npm install
```

### Web

```
cd ./web && npm install
```

### Scripts

```
cd ./scripts && npm install
```

**/etc/cron.d/update-token-data**

Run at 0 minutes past every hour 
```
0 */1 * * *   ubuntu    /dadi/cloud/scripts/qa/update_token_data.sh 2>&1 | logger -t dadi-cloud
```
```
sudo chmod 644 /etc/cron.d/update-token-data
sudo chown root:root /etc/cron.d/update-token-data
```
