const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config();         //use the module with "npm install dotenv"


client.login(process.env.BOT_TOKEN);
client.on('ready',readyDiscord);
function readyDiscord(){
    console.log("Il bot è online!");
}
client.on('message',gotMessage);




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

    addLezione(lezione){
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
const giorni = [new Giorno("Lunedi",[]),new Giorno("Martedi",[]),new Giorno("mercoledi",[]),new Giorno("giovedi",[]),new Giorno("venerdi",[]),new Giorno("sabato",[]),new Giorno("domenica",[])];



//################################### CONTROLLO DEI MESSAGGI ###################################

function gotMessage(msg){
    /**questo primo if serve a controllare da quale canale è arrivato il messaggio */
    if(msg.channel.id == process.env.FOLLYBOT_CHANNEL){
        //entro in questa sezione solo se il 'sender' è un admin
        if(msg.author.id == process.env.ADMIN_ID /** || OTHER_ADMIN_ID */){
        }
        if(msg.author.id == process.env.OTHER_ID){    //altri id particolari
        }
        if((msg.content).toLowerCase().startsWith("/help")){                                         //inizio a controllare il contenuto dei messaggi
            printHelpEmbed(msg);
        }
        if((msg.content).toLowerCase().startsWith("/list")){                                         //inizio a controllare il contenuto dei messaggi
            //testMessages();
            listLezioni();
        }
        if((msg.content).toLowerCase().startsWith("/add")){                                         //inizio a controllare il contenuto dei messaggi
            //testMessages();
            addLezione("mercoledi");
        }
        if((msg.content).toLowerCase().startsWith("/remove")){
            lec = giorni[2].lezioni[0];
            rimuoviLezione(lec,msg);
        }



    }
}


//################################### FUNCTIONS ###################################

function listLezioni(){
    console.log(giorni);
}

/**
 * 
 * @param {String} toFind 
 */
function addLezione(toFind){
    giorni.forEach(giorno => {
        //modifico solo il giorno scelto
        if((giorno.giorno.toLowerCase()) == toFind.toLocaleLowerCase()){
            giorno.addLezione(new Lezione("test","url","message","orario"));
        }
    });
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
        {name: '/lezioni ieri',value: 'Mostra le lezioni di ieri',inline: true},
        {name: '/lezioni domani',value: 'Mostra le lezioni di domani',inline: true},
        {name: '/lezioni tutte',value: 'Mostra tutte le lezioni',inline: true},
        {name: '/image',value: 'Ricerca immagine per nome. Utilizzo: /image [nome] [numero di foto]', inline: true},
        {name: '\u200B', value: '\u200B' },
        {name: '/exit',value: 'Chiudi il bot (admin only)', inline: true},
        {name: '/restart',value: 'Riavvia il bot (admin only)', inline: true},
        {name: '/clear',value: 'Elimina messaggi (50, admin only)', inline: true},
        {name: '\u200B', value: '\u200B' },
        {name: '/link',value: 'inserisci un codice e ricevi un link\nper la lezione corrispondente.',inline:true},
        {name: '/meme',value: 'stampa un meme.\nscrivi"/meme help" per aiuto.',inline:true},
        {name: '/delete',value: 'elimina un numero di messaggi preciso. (admin only)',inline:true},
    )
    message.channel.send(follyBotEmbed)

}



