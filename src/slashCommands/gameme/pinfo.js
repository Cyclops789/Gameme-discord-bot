const fetch = require('node-fetch');
const Converter = require('timestamp-conv');
const { flag } = require('country-emoji');
const config = require("../../../config");
const Discord = require('discord.js');
const logger = require("../../utils/logger");
const ServersList = [];

for(let i = 0; i < config.servers.length; i++)
{
    ServersList.push({ name: config.servers[i][0], value: config.servers[i][1] });
}

module.exports = {
    name: 'pinfo',
    description: 'Returns the player info',
    examples: [],
    dir: "gameme",
    cooldown: 1,
    permissions: [],
    options: [
        {
            name: 'server',
            description: "Which server?",
            type: 3, 
            required: true,
            choices: ServersList
        },
        {
            name: 'steamid',
            description: "Your SteamID",
            type: 3, 
            required: true
        }
    ],
    run: async (client, interaction) => {

        const server = interaction.options.getString('server')
        const steamid = interaction.options.getString('steamid')

        let query;
        for(let i = 0; i < config.servers.length; i++)
        {
            switch (server){
                case config.servers[i][1]:
                    query = `${config.apilink}${config.gamemelink}${config.playerinfo}${config.servers[i][4]}${config.servers[i][2]}/${steamid}`
                    break;
                default:
                    continue;
            }
        }

        function GetServername(srv)
        {
            for(let i = 0; i < config.servers.length; i++)
            {
                if(srv == config.servers[i][1])
                {
                    return config.servers[i][0];
                }
            }
        }
        
        fetch(query, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': '*',
            },
        })
        .then(function(response){ return response.text(); })
        .then(async function(json_result){
            const obj = JSON.parse(json_result);
            const player = obj.gameME.playerinfo.player
            const FirstDate = new Converter.date(player.firstconnect);
            const LastDate = new Converter.date(player.lastconnect);
            const time = player.time

            function secondsToHms(totalTime) {
                totalTime = Number(totalTime);
                let h = Math.floor(totalTime / 3600);
                let m = Math.floor(totalTime % 3600 / 60);
                let s = Math.floor(totalTime % 3600 % 60);
            
                let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
                let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
                let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
                return hDisplay + mDisplay + sDisplay; 
            }
            
            let playerclantag;
            let player_cc_emoji;
            
            switch(player.clantag.length)
            {
                case 0:
                    playerclantag = "No Tag"
                    break;

                default:
                    playerclantag = player.clantag
                    break;
            }
            
            switch(player.cc)
            {
                case "uk":
                    player_cc_emoji = ":flag_gb:"
                    break;
                default:
                    player_cc_emoji = flag(player.cc) ? flag(player.cc) : ":flag_eu:"
                    break;
            }

            const embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setThumbnail(`${player.avatar}`, true)
            .addFields(
                { name: `Name:`, value: `[${player.name}](${config.gamemelink}/playerinfo/${player.id})`},
                { name: `ID:`, value: `${player.id}`, inline: true},
                { name: `Country:`, value: `${player_cc_emoji} ${player.cn}`, inline: true},
                { name: `Clan tag:`, value: `${playerclantag}`},
                { name: `activity:`, value: `${player.activity}`, inline: true},
                { name: `Rank:`, value: `${player.rank}`, inline: true},
                { name: `Skill:`, value: `${player.skill}`, inline: true},
                { name: `Kills:`, value: `${player.kills}`, inline: true},
                { name: `Deaths:`, value: `${player.deaths}`, inline: true},
                { name: `Headshots:`, value: `${player.hs}`, inline: true},
                { name: `Suicides:`, value: `${player.suicides}`, inline: true},
                { name: `Shots:`, value: `${player.shots}`, inline: true},
                { name: `Hits:`, value: `${player.hits}`, inline: true},
                { name: `First connect:`, value: `${FirstDate.getDay()}/${FirstDate.getMonth()}/${FirstDate.getYear()}, ${FirstDate.getHour()}:${FirstDate.getMinute()}`, inline: true},
                { name: `Last connect:`, value: `${LastDate.getDay()}/${LastDate.getMonth()}/${LastDate.getYear()}, ${LastDate.getHour()}:${LastDate.getMinute()}`, inline: true},
                { name: `Total time:`, value: `${secondsToHms(time)}`},
                { name: `Total connects:`, value: `${player.totalconnects}`, inline: true}
            )
            await interaction.reply({ embeds: [embed] })
        }).catch(e => { 
            switch(config.debug){
                case 0:
                    logger.warn(e);
                    break;
                case 1:
                    console.log(e); // log the full error
                    break;
            }
            interaction.reply({ content: `Player doesn't have rank in **${GetServername(server)}**, or invalid SteamID`, ephemeral: true})
        });
    }
}
