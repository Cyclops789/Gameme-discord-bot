const config = require("../../../config");
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Shows the help menu',
    examples: [],
    dir: "gameme",
    cooldown: 1,
    permissions: [],
    options: [],
    run: async (client, interaction) => {

    let prefix = "/"
    const embed = new Discord.MessageEmbed()

    .setTitle(`Help Menu`)
    .addFields(
        { name: `General command:`, value: `${prefix}help - Shows all the commands you can use!`},
        { name: `Players command:`, value: `${prefix}pinfo - To display information about a player`},
        { name: `Servers command:`, value: `${prefix}sinfo - To display information about a server`},
        { name: `Servers players:`, value: `${prefix}splayers - To display current in the server`},
        { name: `Top command:`, value: `${prefix}top - To display the Top 40 players on the server`},
        { name: `Servers command:`, value: `${prefix}servers - To display the list of the servers`},
    )
    .setColor(config.embedColor)
    interaction.reply({ embeds: [embed] })
    }
}