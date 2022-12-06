# Gameme Discord Bot
# Install
```
npm i
```
# Configuration
- rename config.example.js to config.js and edit it
- rename example.env to .env and edit it with the bot token.
# Adding more servers
- In config.js add new element to the servers with format ["Server Name", "symbol", id, "ip:port", "type"], examples:
```javascript
......
servers: [
        ["Zombie Revival", "zr", 2, "54.36.126.223:27015", "css"],
        ["Deathmatch", "dm", 3, "54.36.126.223:27019", "css"],
        ["Zombie Escape", "ze", 1, "54.36.126.223:27016", "css"],
    ]
......
```
# Build (register (/) commands)
```
npm run build
```
# Starting the bot
```
npm start
```
# Credits:
[meliooff](https://github.com/meliooff/Structure-Discord-Bot) for the template
