module.exports = {
    debug: 0,
    
    // discord bot id
    botID: '',
    
    // adminstrators ids here
    administrators: [
        "604034501210800128"
    ],
    
    // embed color, it can be hex or color name
    embedColor: "black",

    // set this to your gameme page, it shouldn't end with /
    gamemelink: "https://stats.wafgamers.fun",

    // it convert xml to json, credit: "https://github.com/factmaven/xml-to-json" , you can use "https://api.factmaven.com/xml-to-json/?xml=" as well
    apilink: "https://api.wafgamers.fun/xml/?xml=",

    // api paths, dont change anything here!!
    playerinfo: "/api/playerinfo/",
    serverlist: "/api/serverlist/address/",
    serverinfo: "/api/serverinfo/",
    playerlist: "/api/playerlist/",

    // count bots as players
    countbots: 1,

    // format: ["ServerName", "symbol" (!!!!it should be lowercase!!!!), "id" (you can get it from your server link, ex: https://wafgamers.gameme.com/css11 , the value here is "11", an other example https://wafgamers.gameme.com/css , here it has no value so it will be ""), "ip:port", "type" (css, csgo, tf2 ... etc)]
    // here is some examples
    servers: [
        ["Zombie Revival", "zr", "2", "54.36.126.223:27015", "css"],
        ["Deathmatch", "dm", "3", "54.36.126.223:27019", "css"],
    ] 
};
