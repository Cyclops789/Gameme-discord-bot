const fetch = require('node-fetch');
const Converter = require('timestamp-conv');
const { flag } = require('country-emoji');
const config = require("../../../config");
const logger = require("../../utils/logger");
const Discord = require('discord.js');
const geoip = require('geoip-country');
const country = require('countryjs');
const ServersList = [];

for(let i = 0; i < config.servers.length; i++)
{
    ServersList.push({ name: config.servers[i][0], value: config.servers[i][1] });
}

module.exports = {
    name: 'sinfo',
    description: 'Returns server information info',
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
        }
    ],
    
    run: async (client, interaction) => {

        const server = interaction.options.getString('server')

        let query;
        for(let i = 0; i < config.servers.length; i++)
        {
            switch (server){
                case config.servers[i][1]:
                    query = `${config.apilink}${config.gamemelink}${config.serverlist}${config.servers[i][3]}`
                    break;
                default:
                    continue;
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
            const server = obj.gameME.serverlist.server
            const geo = geoip.lookup(server.addr);
            const server_cc = geo.country
            const server_cn = country.info(server_cc, 'name').name
            const totalTime = server.uptime
            const timer = new Converter.date(server.time);
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
            const players = config.countbots ? `${server.act}(${server.bots})/${server.max}` : `${parseInt(server.act) + parseInt(server.bots)}/${server.max}`
            const embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .addFields(
                { name: `Server:`, value: `[${server.name}](${config.gamemelink})`},
                { name: `ID:`, value: `${server.id}`, inline: true},
                { name: `IP:`, value: `steam://connect/${server.addr}:${server.port}`, inline: true},
                { name: `Country:`, value: `${flag(server_cc)} ${server_cn}`},
                { name: `Map started at:`, value: `${timer.getDay()}/${timer.getMonth()}/${timer.getYear()}, ${timer.getHour()}:${timer.getMinute()}`, inline: true},
                { name: `Uptime:`, value: `${secondsToHms(totalTime)}`, inline: true},
                { name: `Map:`, value: `${server.map}`, inline: true},
                { name: `Players:`, value: players, inline: true}
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
            interaction.reply({ content: "Server is probably offline!", ephemeral: true})
        });
    }
}
