require("dotenv").config();
const { Client, Collection, Intents } = require("discord.js");
const client = new Client({
    allowedMentions: { parse: ['users', 'roles'] },
    fetchAllMembers: false,
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS ],
});
client.commandes = new Collection();
client.slash = new Collection();
client.aliases = new Collection();
cooldowns = new Collection();

client.logger = require('./src/utils/logger');
client.color = require('./src/utils/color.js');

["error", "slashCommands", "event"].forEach(file => { require(`./src/utils/handlers/${file}`)(client) })

client.login(process.env.TOKEN); 