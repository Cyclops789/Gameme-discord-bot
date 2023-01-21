const fetch = require('node-fetch');
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
    name: 'splayers',
    description: 'Returns server players info',
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
                    query = `${config.apilink}${config.gamemelink}${config.serverinfo}${config.servers[i][3]}/players`
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
            const server = obj.gameME.serverinfo.server;
            const embed = new Discord.MessageEmbed();
            embed.setColor(config.embedColor)
            embed.setTitle(`steam://connect/${server.addr}:${server.port}`)
            
            for(let i = 0, l = server.players.player.length; i < l; i++) {
                
                const player_rteam  = server.players.player[i].team
                const player_name   = server.players.player[i].name
                const player_kill   = server.players.player[i].kills
                const player_deaths = server.players.player[i].deaths
                const player_skill  = server.players.player[i].skill
                const player_cc     = server.players.player[i].cc

                let player_cflag;
                let player_team;

                switch(player_cc)
                {
                    case "uk":
                        player_cflag = ":flag_gb:"
                        break;

                    default:
                        player_cflag = flag(player_cc) ? flag(player_cc) : ":flag_eu:"
                        break;
                }

                switch(player_rteam)
                {
                    case "None":
                        player_team = "SPECTATE"
                        break;
                    default:
                        player_team = player_rteam
                }

                switch(config.countbots)
                {
                    case 1:
                        embed.addFields({ name: `${player_cflag} - ${player_name}`, value: `**Team:** ${player_team} | **Points:** ${player_skill} | **Kills:** ${player_kill} | **Deaths:** ${player_deaths}`});
                        break;
                    
                    case 0:
                        if(player_skill > 0)
                        {
                            embed.addFields({ name: `${player_cflag} - ${player_name}`, value: `**Team:** ${player_team} | **Points:** ${player_skill} | **Kills:** ${player_kill} | **Deaths:** ${player_deaths}`});
                        }
                        break;
                }

            }
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
