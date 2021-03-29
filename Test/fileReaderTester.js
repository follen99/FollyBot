const fs = require('fs');

// read JSON object from file
fs.readFile('giorni.json', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }

    // parse JSON object
    //const users = JSON.parse(data.toString());
    const giorni = JSON.parse(data);

    giorni.forEach(giorno => {
        var lezioniGiorno=giorno.lezioni;
        lezioniGiorno.forEach(lezione => {
            console.log(lezione.nome);
        });
    });

    // print JSON object
    //console.log(giorni);
});