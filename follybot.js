const Discord = require('discord.js');
var request=require("request")
var cheerio=require("cheerio")
const client = new Discord.Client();
require("dotenv").config();         //use the module with "npm install dotenv"
//################################### CLASSI ###################################
class Lezione{
    /**
     * 
     * @param {String} name 
     * @param {String} url
     * @param {String} message
     * @param {String} orario
     */
    constructor(name,url,message,orario){
        this.name=name;
        this.url=url;
        this.message=message;
        this.orario=orario;
    }
    
    getName(){
        return this.name;
    }
    getUrl(){
        return this.url;
    }
    getMessage(){
        return this.message;
    }
    getOrario(){
        return this.orario;
    }

    setName(name){
        this.name=name;
    }
    setUrl(url){
        this.url=url;
    }
    setMessage(message){
        this.message=message;
    }
    setOrario(orario){
        this.orario=orario;
    }


}

class Giorno{
    /**
     * 
     * @param {String} giornoCorrente 
     * @param {Array[] Lezioni} lezioni 
     */
    constructor(giornoCorrente,lezioni){
        this.lezioni=lezioni;       //inizializzo le lezioni contenute in un giorno
        this.giorno=giornoCorrente;
    }

    getLezioni(){
        return this.lezioni;
    }
    getGiorno(){
        return this.giorno;
    }

    setLezioni(lezioni){
        this.lezioni=lezioni;
    }
    setGiorno(giorno){
        this.giorno=giorno;
    }

    addLezione(lezione) {
        this.lezioni.push(lezione);
    }
    /**
     * 
     * @param {Lezione} lezione 
     * @returns 0 se c'e' un errore
     * 1 se l'operazione e' andata a buon fine.
     */
    removeLezione(lezione){
        try{
            this.lezioni.pop(lezione);
        }catch(error){
            return 0;
        }
        return 1;
    }
}

//################################### COSTANTI ###################################
/**
 * 0 = lunedi
 * 1 = martedi
 * 2 = mercoledi
 * 3 = giovedi 
 * 4 = venerdi
 * 5 = sabato
 * 6 = domenica
 */
 var giorni = [new Giorno("Lunedi",[]),new Giorno("Martedi",[]),new Giorno("mercoledi",[]),new Giorno("giovedi",[]),new Giorno("venerdi",[]),new Giorno("sabato",[]),new Giorno("domenica",[])];


 //################################### OPERAZIONI PRELIMINARI ###################################
client.login(process.env.BOT_TOKEN);
client.on('ready',readyDiscord);
function readyDiscord(){
    console.log("Il bot è online!");
    updateGiorniFromFile();
}
client.on('message',gotMessage);












//################################### CONTROLLO DEI MESSAGGI ###################################

function gotMessage(msg){
    /**questo primo if serve a controllare da quale canale è arrivato il messaggio */
    if(msg.channel.id == process.env.FOLLYBOT_CHANNEL){
        //entro in questa sezione solo se il 'sender' è un admin
        if(msg.author.id == process.env.ADMIN_ID /** || OTHER_ADMIN_ID */){
            if((msg.content).toLowerCase().startsWith("/delete")){
                var parts=msg.content.split(" ");
    
                deleteLastMessage(msg,parts[1]);
            }
            if((msg.content).toLowerCase().startsWith("/clearchat")){                                         //inizio a controllare il contenuto dei messaggi
                clearChat(msg);
            }
            if((msg.content).toLowerCase().startsWith("/exit")){                                         //inizio a controllare il contenuto dei messaggi
                exit(msg);
            }if((msg.content).toLowerCase().startsWith("/restart")){                                         //inizio a controllare il contenuto dei messaggi
                restartBot(msg);
            }
            if((msg.content).toLowerCase().startsWith("/image")){                                         //inizio a controllare il contenuto dei messaggi
                var parts = msg.content.split(" ");
                image(msg,parts);
            }
        }
        if(msg.author.id == process.env.OTHER_ID){    //altri id particolari
        }
        if((msg.content).toLowerCase().startsWith("/help")){                                         //inizio a controllare il contenuto dei messaggi
            printHelpEmbed(msg);
        }
        if((msg.content).toLowerCase().startsWith("/list")){                                         //inizio a controllare il contenuto dei messaggi
            console.log("entro qui");
            //printAllFromFile(msg);
            printAllFromList(msg);
        }
        if((msg.content).toLowerCase().startsWith("/add")){                                         //inizio a controllare il contenuto dei messaggi
            //il comando dovrebbe essere del tipo:
            // /add "giorno" "nome_lezione" "url" "messaggio" "orario"
            var parts=msg.content.split(" ");   //separo le parti
            
            var giornoToAdd = parts[1];

            var lezione = new Lezione(parts[2],parts[3],parts[4],parts[5]);

            addLezione(giornoToAdd,lezione);

            sendConfirmEmbed(msg,"Lezione aggiunta!","Non dimenticare di salvare con: ","/save");
        }
        if((msg.content).toLowerCase().startsWith("/remove")){
            lec = giorni[2].lezioni[0];
            rimuoviLezione(lec,msg);
        }
        if((msg.content).toLowerCase().startsWith("/save")){
            writeSaves(giorni);
            sendConfirmEmbed(msg,"Lezioni salvate correttamente!","","");
        }
        /*if((msg.content).toLowerCase() == "/read"){
            console.log("entro");
            readSaves();
        }*/
        if((msg.content).toLowerCase().startsWith("/lezioni")){
            var parts = msg.content.split(" ");
            var day=new Date().getDay();
            if(parts[1] == "ieri"){
                if(day==1){
                    day = 7;
                }else{
                    day = day-1;
                }
                switch (day) {
                    case 1:
                            day="lunedi";
                            break;
                    case 2:
                            day="martedi";
                            break;
                    case 3:
                            day="mercoledi";
                            break;
                    case 4:
                            day="giovedi";
                            break;
                    case 5:
                            day="venerdi";
                            break;
                    case 6:
                            day="sabato";
                            break;
                    case 7:
                            day="domenica";
                            break;
                    default:
                        break;
                }
                printGiorniFromFile(msg,day);
                return;
            }
            if (parts[1] == "domani") {
                if (day == 7) {
                    day = 1;
                }else{
                    day = day+1;
                }
                switch (day) {
                    case 1:
                            day="lunedi";
                            break;
                    case 2:
                            day="martedi";
                            break;
                    case 3:
                            day="mercoledi";
                            break;
                    case 4:
                            day="giovedi";
                            break;
                    case 5:
                            day="venerdi";
                            break;
                    case 6:
                            day="sabato";
                            break;
                    case 7:
                            day="domenica";
                            break;
                    default:
                        break;
                }
                printGiorniFromFile(msg,day);
                return;
            }
            switch (day) {
                case 1:
                        day="lunedi";
                        break;
                case 2:
                        day="martedi";
                        break;
                case 3:
                        day="mercoledi";
                        break;
                case 4:
                        day="giovedi";
                        break;
                case 5:
                        day="venerdi";
                        break;
                case 6:
                        day="sabato";
                        break;
                case 7:
                        day="domenica";
                        break;
                default:
                    break;
            }
            if(parts[1]!=null){
                switch (parts[1]) {
                    case "lunedi":
                        day="lunedi";
                        break;
                    case "lunedì":
                        day="lunedi";
                        break;
                    case "martedi":
                        day="martedi";
                        break;
                    case "martedì":
                        day="martedi";
                        break;
                    case "mercoledi":
                        day="mercoledi";
                        break;
                    case "mercoledì":
                        day="mercoledi";
                        break;
                    case "giovedi":
                        day="giovedi";
                        break;
                    case "giovedì":
                        day="giovedi";
                        break;
                    case "venerdi":
                        day="venerdi";
                        break;
                    case "venerdì":
                        day="venerdi";
                        break;
                    case "sabato":
                        day="sabato";
                        break;
                    case "domenica":
                        day="domenica";
                        break;
                    case "1":
                            day="lunedi";
                            break;
                    case "2":
                            day="martedi";
                            break;
                    case "3":
                            day="mercoledi";
                            break;
                    case "4":
                            day="giovedi";
                            break;
                    case "5":
                            day="venerdi";
                            break;
                    case "6":
                            day="sabato";
                            break;
                    case "7":
                            day="domenica";
                            break;
                    default:
                        sendConfirmEmbed(msg,"Comando non valido","Comandi consentiti:","/lezioni [giorno]\ngiorno puo essere omesso oppure espresso con un numero | parola");
                        return;
                }
            }
            

            printGiorniFromFile(msg,day);

        }
        /**updateGiorniFromFile */
        if((msg.content).toLowerCase().startsWith("/test")){
            updateGiorniFromFile();
        }
        if((msg.content).toLowerCase().startsWith("/prova")){
            console.log(giorni);
        }


    }
}


//################################### FUNCTIONS ###################################

function sendConfirmEmbed(msg,mainMessage,name,value) {
    const confirmEmbed=new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setTitle(mainMessage)
        if(name!=""){
            confirmEmbed.addFields(
                {name: name,value: value}
            )
        }
        
        msg.channel.send(confirmEmbed);
    
}

function listGiorni(array){
    console.log("####################################");
    array.forEach(giorno => {
        console.log(giorno);
    });
}

function listLezioni(){
    console.log(giorni);
}

/**
 * 
 * @param {String} giorno 
 */
function addLezione(toFind,lezione){
    giorni.forEach(giorno => {
        //modifico solo il giorno scelto
        if((giorno.giorno.toLowerCase()) == toFind.toLocaleLowerCase()){
            console.log("found lezione #########################");
            giorno.addLezione(lezione);
            console.log(giorno);
        }
    });
}

function getGiorno(message) {
    let giorno = "";

    let filter = m => m.author.id === message.author.id
    message.channel.send(`Digita il giorno in cui vuoi aggiungere la lezione:`).then(() => {
      message.channel.awaitMessages(filter, {
          max: 1,
          time: 30000,
          errors: ['time']
        })
        .then(message => {
          message = message.first()
          if (message.content.toLowerCase() == 'lunedi' || message.content.toLowerCase() == 'lunedì') {
            message.channel.send(`Stai aggiungendo lezioni per il lunedì.`)
            giorno="lunedi";
          } else if (message.content.toLowerCase() == 'martedi' || message.content.toLowerCase() == 'martedì') {
            message.channel.send(`Stai aggiungendo lezioni per il martedì.`)
            giorno="martedi";
          } else if (message.content.toLowerCase() == 'mercoledi' || message.content.toLowerCase() == 'mercoledì') {
            message.channel.send(`Stai aggiungendo lezioni per il mercoledì.`)
            giorno="mercoledi";
          } else if (message.content.toLowerCase() == 'giovedi' || message.content.toLowerCase() == 'giovedì') {
            message.channel.send(`Stai aggiungendo lezioni per il giovedì.`)
            giorno="giovedi";
          } else if (message.content.toLowerCase() == 'venerdi' || message.content.toLowerCase() == 'venerdì') {
            message.channel.send(`Stai aggiungendo lezioni per il venerdì.`)
            giorno="venerdi";
          } else if (message.content.toLowerCase() == 'sabato' || message.content.toLowerCase() == 'sabato') {
            message.channel.send(`Stai aggiungendo lezioni per il sabato.`)
            giorno="sabato";
          } else if (message.content.toLowerCase() == 'domenica' || message.content.toLowerCase() == 'domenica') {
            message.channel.send(`Stai aggiungendo lezioni per la domenica.`)
            giorno="domenica";
          } else{
            message.channel.send(`Terminated: Invalid Response`)
            giorno = "null";
          }
        })
        .catch(collected => {
            message.channel.send('Timeout');
            message.channel.send("Ho annullato l'operazione.");
            return;
        });
    })

    return giorno;
}

//da perfezionare non funge
function rimuoviLezione(toFind,lezione,msg){
    giorni.forEach(giorno => {
        var lezioniDelgiorno = giorni.lezioni;
        console.log(lezioniDelgiorno);
        console.log("\n");
    });
}


function testMessages(){
    const lezione1 = new Lezione("Fisica","Link1","questa è una prova","9-11");
    const lezione2 = new Lezione("Analisi","Link2","questa è una prova","11-12");

    var lezioni=[lezione1,lezione2];

    const giorno = new Giorno("lunedi",lezioni);


    console.log(giorno);

}

function printHelpEmbed(message){
    const follyBotEmbed=new Discord.MessageEmbed()

    .setColor('#2F3136')
    .setTitle('Lista comandi')
    .setDescription('Con questi comandi puoi effettuare diverse azioni.')
    .setThumbnail('https://i.imgur.com/1rI4Ff0.png')
    .addFields(
        {name: '/help',value: 'Ottieni informazioni sui comandi', inline: true},
        {name: '/lezioni',value: 'Mostra le lezioni odierne', inline: true},
        {name: '/add',value: '/add "giorno" "nome_lezione" "url" "messaggio" "orario"', inline: true},
        {name: '/lezioni ieri',value: 'Mostra le lezioni di ieri',inline: true},
        {name: '/lezioni domani',value: 'Mostra le lezioni di domani',inline: true},
        {name: '/list',value: 'Mostra tutte le lezioni',inline: true},
        {name: '/image',value: 'Ricerca immagine per nome. Utilizzo: /image [nome] [numero di foto]', inline: true},
        {name: '\u200B', value: '\u200B' },
        {name: '/exit',value: 'Chiudi il bot (admin only)', inline: true},
        {name: '/restart',value: 'Riavvia il bot (admin only)', inline: true},
        {name: '/clearchat',value: 'Elimina messaggi (50, admin only)', inline: true},
        {name: '\u200B', value: '\u200B' },
        {name: '/link',value: '(obsoleto)',inline:true},
        {name: '/meme',value: 'stampa un meme.\nscrivi"/meme help" per aiuto. (coming soon)',inline:true},
        {name: '/delete',value: 'elimina un numero di messaggi preciso. (admin only)',inline:true},
    )
    message.channel.send(follyBotEmbed)

}


//################################### I/O ###################################
/*function updateGiorniFromFile(){
    const fs = require('fs');
    // read JSON object from file
    fs.readFile('giorni.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }

        // parse JSON object
        //const users = JSON.parse(data.toString());
        giorni = JSON.parse(data);

        console.log(giorni);
    });
}*/
function updateGiorniFromFile(){
    const fs = require('fs');
    // read JSON object from file
    fs.readFile('giorni.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }

        // parse JSON object
        //const users = JSON.parse(data.toString());
        giorniLetti = JSON.parse(data);

        /**questa soluzione risolve l'errore "giorno.addLezione is not a function"
         * sinceramente non ho idea del perchè
         */
        giorni.forEach(giorno => {
            giorniLetti.forEach(giornoLetto => {
                if ((giornoLetto.giorno) == giorno.giorno) {
                    giorno.lezioni=giornoLetto.lezioni;
                }
            });
        });

        console.log(giorni);
    });
}


function readSaves(){
    const fs = require('fs');

    // read JSON object from file
    fs.readFile('giorni.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }

        // parse JSON object
        //const users = JSON.parse(data.toString());
        var giorniRead = JSON.parse(data);
        for (let i = 0; i < giorniRead.length; i++) {
            const giorno = giorniRead[i];
            console.log(giorno.lezioni);
            console.log("#####################")
            giorni[i].setLezioni(giorno.lezioni);
            
        }


        giorni = giorniRead;
    });
}


function printGiorniFromFile(msg,argument) {
    const fs = require('fs');
    // read JSON object from file
    fs.readFile('giorni.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }

        // parse JSON object
        //const users = JSON.parse(data.toString());
    
        var giorniLetti = JSON.parse(data);

        //giorni.concat(giorniLetti);



        giorniLetti.forEach(giorno => {
            if ((giorno.giorno).toLowerCase()==argument.toLowerCase()) {
                lezioniNelGiorno = giorno.lezioni;
                if(lezioniNelGiorno.length == 0){
                    const lezioneEmbed=new Discord.MessageEmbed()
                        .setColor('#2F3136')
                        .setTitle("Nessuna lezione trovata!")
                        .setThumbnail('https://i.imgur.com/1rI4Ff0.png')
                        .addFields(
                            {name: "Prova con un altro giorno",value: "/lezioni lunedì"})
                        
                        msg.channel.send(lezioneEmbed);
                }else{
                    lezioniNelGiorno.forEach(lezioneCurr => {
                        printLezioneEmbed(msg,lezioneCurr);
                    });
                }
                
            }
        });
    });
}

function printAllFromFile(msg) {
    const fs = require('fs');
    // read JSON object from file
    fs.readFile('giorni.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }

        // parse JSON object
        //const users = JSON.parse(data.toString());
    
        var giorniLetti = JSON.parse(data);



        giorniLetti.forEach(element => {
            printGiornoEmbed(element,msg);
        });

        /*giorniLetti.forEach(giornoCurr => {
            printGiorno(giornoCurr);
        });*/
    });
}
function printAllFromList(msg){
    giorni.forEach(element => {
        printGiornoEmbed(element,msg);
    });
}
function printGiornoEmbed(giorno,msg){
    const giornoEmbed=new Discord.MessageEmbed()
    .setColor('#2F3136')
    .setTitle(giorno.giorno)
    .setThumbnail('https://i.imgur.com/1rI4Ff0.png')
    if(giorno.lezioni !=0){
        giorno.lezioni.forEach(lezioneDelGiorno => {
            giornoEmbed.addFields(
                {name: lezioneDelGiorno.name, value: lezioneDelGiorno.orario},
                {name: "URL: ", value: lezioneDelGiorno.url},
    
            )
        });
    }else{
        giornoEmbed.addFields(
            {name: "Non hai lezioni oggi!", value: ":)"},
        )
    }
    
    msg.channel.send(giornoEmbed);
}

function printLezioneEmbed(msg,lezioneToPrint){
    const lezioneEmbed=new Discord.MessageEmbed()
    .setColor('#2F3136')
    .setTitle(lezioneToPrint.name)
    .setThumbnail('https://i.imgur.com/1rI4Ff0.png')
    .addFields(
        {name: "URL: ",value: lezioneToPrint.url},
        {name: "Messaggio: ",value: lezioneToPrint.message},
        {name: "Orario: ",value: lezioneToPrint.orario}
    )
    
    msg.channel.send(lezioneEmbed);
}

/**
 * 
 * @param {String} giorno 
 * @param {Array} list
 */
function printGiorno(giorno,list,msg) {
    list.forEach(giornoCurr => {
        if(giornoCurr.toLowerCase()==giorno.toLocaleLowerCase()){
            msg.channel.send(giornoCurr);
        }
    });
}

function writeSaves(giorni){
    const fs = require('fs');

    // convert JSON object to string
    const data = JSON.stringify(giorni);

    // write JSON string to a file
    fs.writeFile('giorni.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
}

function deleteLastMessage(message,amount){
    var am=1;
    if(amount!=null) am=amount;

    if (message.channel.type == 'text') {
        message.channel.messages.fetch()
          .then(messages => {
            message.channel.bulkDelete(am);
          })
          .catch(err => {
            console.log('Error while doing Bulk Delete');
            console.log(err);
          });
      }
}

function clearChat(message){
    if (message.channel.type == 'text') {
        message.channel.messages.fetch()
          .then(messages => {
            message.channel.bulkDelete(messages);
            messagesDeleted = messages.array().length; // number of messages deleted

            // Logging the number of messages deleted on both the channel and console.
            message.channel.send("Eliminazione dei messaggi riuscita. Messaggi totali eliminati: "+messagesDeleted);
            console.log('Deletion of messages successful. Total messages deleted: '+messagesDeleted)
          })
          .catch(err => {
            console.log('Error while doing Bulk Delete');
            console.log(err);
          });
      }
}
function exit(msg){
    msg.channel.send('Sto spegnendo il bot.. ')
    .then(msg => msg.client.destroy())
}
//restart the bot
function restartBot(msg){
    msg.channel.send('Sto riavviando il bot.. ')
    .then(msg => msg.client.destroy())
    .then(() => client.login('Nzc1NjQyMTc4NTQ2MzAyOTg2.X6pTEg._-JmDFs6QQNX3SZRDxdyBYi5E7E'));
    msg.channel.send('Bot riavviato')
}
function image(message, parts){
    var search = parts[1]//parts.slice(1).join(" ");
    var amount=1;
    if(parts.length>2){
        amount=parts[2];
    }

    

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function(error, response, responseBody) {
        if (error) {
            // handle error
            message.channel.send("Errore nella formattazione del testo. Inserisci un comando del tipo:")
            message.channel.send("/image [immagineDaCercare] [numero di foto da mostrare]")
            return;
        }
 

 
        $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)
 
        // In this search engine they use ".image a.link" as their css selector for image links
        var links = $(".image a.link");
 
        // We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
        // this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        //console.log(urls);
        if (!urls.length) {
            // Handle no results
            message.channel.send("Wow, strano!\nNon ho trovato nulla...")
            return;
        }
 
        // Send result
        message.channel.send("Inviando "+amount+" immagini...");
        for(var i=0;i<amount;i++){
            message.channel.send( urls[i] );
        }
    });
}