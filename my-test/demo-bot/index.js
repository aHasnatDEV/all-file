require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on('messageCreate', async interaction => {
//   console.log('Interaction received:', interaction);
//   try {
//     if (!interaction.isChatInputCommand()) return;

//     if (interaction.commandName === 'ping') {
//       await interaction.reply('Pong!');
//     }
//   } catch (error) {
//     console.error('Error handling interaction:', error);
//   }
// });

// const { Client, Intents } = require("discord.js")
// const client = new Client({
//   intents: [
//     Intents.FLAGS.GUILDS,
//     Intents.FLAGS.GUILD_MESSAGES
//   ]
// });


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async interaction => {
  // if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});



client.login(process.env.Bot_Token);
// console.log(process.env.Bot_Token);
