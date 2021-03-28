const Discord = require('discord.js');
const client = new Discord.Client();

//TOKEN da nascondere
client.login('TOKEN HERE');

client.on('ready',readyDiscord);

function readyDiscord(){
    console.log("Il bot è online!");
}