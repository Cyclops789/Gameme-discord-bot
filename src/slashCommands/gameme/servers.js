const config = require("../../../config");
const Servers = [];

module.exports = {
    name: 'servers',
    description: 'Shows the servers menu',
    examples: [],
    dir: "gameme",
    cooldown: 1,
    permissions: [],
    options: [],
    run: async (client, interaction) => {
    for(let i = 0; i < config.servers.length; i++)
    {
        Servers.push({ name: config.servers[i][0], value: `steam://connect/${config.servers[i][3]}`, inline: false });
    }

    const embed = {
        color: config.embedColor,
        title: 'Servers list:',
        fields: Servers,
        timestamp: new Date().toISOString(),
        footer: {
            text: 'By Cyclops#1952'
        },
    };
    await interaction.reply({ embeds: [embed] })
    }
}