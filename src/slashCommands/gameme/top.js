const fetch = require('node-fetch');
const { flag } = require('country-emoji');
const config = require("../../../config");
const { MessageEmbed } = require('discord.js');
const logger = require("../../utils/logger");
const ServersList = [];

for(let i = 0; i < config.servers.length; i++)
{
    ServersList.push({ name: config.servers[i][0], value: config.servers[i][1] });
}

module.exports = {
    name: 'top',
    description: 'Returns top players of a server',
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
            name: 'page',
            description: 'Which page?',
            type: 4, 
            required: true
        }
    ],
    
    run: async (client, interaction) => {

        const server = interaction.options.getString('server');
        const page = interaction.options.getInteger('page');

        let query;
        for(let i = 0; i < config.servers.length; i++)
        {
            switch(server){
                case config.servers[i][1]:
                    query = `${config.apilink}${config.gamemelink}${config.playerlist}${config.servers[i][4]}${config.servers[i][2]}?limit=10%26page=${page}`
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
            const playerlist = obj.gameME.playerlist;
            const embed = new MessageEmbed()
            embed.setColor(config.embedColor)
            embed.setTitle(`Page: ${page}`)

            for(let i = 0, l = playerlist.player.length; i < playerlist.player.length; i++) {
                
                const player_name       = playerlist.player[i].name
                const player_skill      = playerlist.player[i].skill
                const player_steamid    = playerlist.player[i].uniqueid
                const player_cc         = playerlist.player[i].cc
                const count             = (10 * page) + i - 9
                
                let player_cc_emoji;
                if(player_cc == "uk"){
                    player_cc_emoji = ":flag_gb:"
                } else {
                    player_cc_emoji = flag(player_cc)
                }
                if(i <= 9) {
                    embed.addFields({ name: `${count} - ${player_cc_emoji} ${player_name} (${player_steamid})`, value: `Points: ${player_skill}`})
                }
            }
            await interaction.reply({ embeds: [embed]})
        }).catch(e => {
            switch(config.debug){
                case 0:
                    logger.warn(e);
                    break;
                case 1:
                    console.log(e); // log the full error
                    break;
            } 
            interaction.reply({ content: "Page doesn't exist or invalid server!", ephemeral: true})
        });
    }
}
