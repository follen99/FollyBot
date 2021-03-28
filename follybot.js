const Discord = require('discord.js');
const client = new Discord.Client();

//TOKEN da nascondere
client.login('ODI1Nzk3MTE3NzY2NjY0MjAy.YGDJfw.KY9UK6Y_O9C4sRK0BRNcxMs5DAc');

client.on('ready',readyDiscord);

function readyDiscord(){
    console.log("Il bot è online!");
}