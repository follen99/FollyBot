const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config();         //use the module with "npm install dotenv"

//TOKEN da nascondere
client.login(process.env.BOT_TOKEN);

client.on('ready',readyDiscord);

function readyDiscord(){
    console.log("Il bot è online!");
}