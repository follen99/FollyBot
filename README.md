# FollyBot
Questo è un semplice bot per Discord che ti permetterà di tenere sempre traccia delle tue lezioni!

<img src="https://github.com/follen99/FollyBot/blob/main/follyboticon.png" width=300 height=300>

## Funzioni principali

- Tenere traccia degli orari delle lezioni
- Ricevere i link delle lezioni per avviare subito la lezione telematica
- Visualizzare le lezioni dei giorni precedenti e successivi a quello corrente
- Eliminare più messaggi in una sola volta nella chat di discord
- Gestire i giorni con le relative lezioni

## Funzioni secondarie
- Inviare delle immagini tramite ricerca a keyword.
- Inviare delle GIF tramite ricerca a keyword.
- Inviare un meme tra diversi meme salvati.

# Istruzioni
Per poter utilizzare correttamente il bot bisogna effettuare le seguenti operazioni:
## Download dei files 

> git clone https://github.com/follen99/FollyBot.git

## Setup delle dipendenze 
Nella cartella del progetto eseguire i comandi:

> npm install discord.js

> npm install request

> npm install cheerio

## Eseguire il bot
Per eseguire il bot basta eseguire "follybot.js":
Recarsi nella directory del progetto ed eseguire il comando:

> node follybot.js

## Collegare il bot al proprio server Discord
Nel progetto è presente un file *.envSample*
Per poter collegare il bot al proprio server non basta che:

 - creare un file *.env* e salvare al suo interno le componenti descritte nel file *.envSample*
 - Recarsi all'indirizzo https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot sostituendo *YOUR_CLIENT_ID con il proprio id, che si può trovare al link: https://discord.com/developers/applications/ (bisogna aver già creato il bot da quel portale)

A questo punto il bot è presente nel vostro server. 
Per una guida più dettagliata consiglio la visione di questo video: https://www.youtube.com/watch?v=ibtXXoMxaho&list=PLRqwX-V7Uu6avBYxeBSwF48YhAnSn_sA4&index=2

## Problemi comuni

A questo punto, tutte le funzioni del bot funzionano correttamente, non resta che modificare le lezioni presente con le proprie lezioni (oppure eliminare il file e creare un nuovo file *giorni.json* scrivendo al suo interno *[]*; a questo punto il bot creerà dei giorni vuoti e non resterà che popolarli con delle lezioni utilizzando la funzione */add* )

Per utilizzare le funzioni:

> /clear

> /delete

Bisogna creare un nuovo ruolo con permessi di amministratori (basta il permesso di eliminare i messaggi di altri utenti) ed assegnarlo al bot.

