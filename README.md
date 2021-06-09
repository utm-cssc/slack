# 💡🤖 CSSC Slack Bot

The CSSC Slack Bot is a very simple Slack bot that enables users to send anonymous ideas enabling discussion amongst the team. It is built with NodeJS using Slack's Bolt API (https://slack.dev/bolt-js/concepts)

## 🚀 Getting Started

Requires: <a href="https://nodejs.org/en/">Node.js</a>

This guide was used for getting started: https://blog.logrocket.com/build-a-slackbot-in-node-js-with-slacks-bolt-api/

1. <a href="https://discordpy.readthedocs.io/en/latest/discord.html">Create a Slack Bot Account</a>
2. `yarn`
3. Create a .env file with the following contents:

```
TOKEN=
SIGNING_SECRET=
APP_TOKEN=
```

4. Use `node index.js` to run the bot!

## 📦 Deployment

The bot is deployed on a Heroku Hobby Dyno.

1. Create a heroku app or set an existing one as the remote for this git repo
2. `git push heroku main`
3. `heroku logs --tail` to debug issues

## ✨ Authors

- <a href="https://github.com/jcserv">Jarrod Servilla</a>
