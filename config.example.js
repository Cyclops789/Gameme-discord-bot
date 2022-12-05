module.exports = {
    
    // discord bot id
    botID: '',
    
    // adminstrators ids here
    administrators: [
        "604034501210800128"
    ],
    
    // embed color, it can be hex or color name
    embedColor: "black",

    // set this to your gameme page, it shouldn't end with /
    gamemelink: "http://wafgamers.gameme.com",

    // it convert xml to json, credit: "https://github.com/factmaven/xml-to-json" , you can use "https://api.factmaven.com/xml-to-json/?xml=" as well
    apilink: "http://api.wafgamers.fun/xml/?xml=",

    // api paths, dont change anything here!!
    playerinfo: "/api/playerinfo/css",
    serverlist: "/api/serverlist/address/",
    serverinfo: "/api/serverinfo/",
    playerslist: "/api/playerlist/css",
    serverinfo: "/api/serverinfo/",

    // format: ["ServerName", "symbol" (!!!!it should be lowercase!!!!), id (it should be an integer, you can get it from your server link, ex: https://wafgamers.gameme.com/css11 , the value here is 11), "ip:port"]
    // here is some examples
    servers: [
        ["Zombie Revival", "zr", 2, "54.36.126.223:27015"],
        ["Deathmatch", "dm", 3, "54.36.126.223:27019"],
    ] 
};
