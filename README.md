# Gameme Discord Bot
# Install
```
npm i
```
# Configuration
- rename config.example.js to config.js and edit it
- rename example.env to .env and edit it with the bot token.
# Adding more servers
- In config.js add new element to the servers with format ["Server Name", "symbol", id, "ip:port"], examples:
```javascript
......
servers: [
        ["Zombie Revival", "zr", 2, "54.36.126.223:27015"],
        ["Deathmatch", "dm", 3, "54.36.126.223:27019"],
        ["Zombie Escape", "ze", 1, "54.36.126.223:27016"],
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

