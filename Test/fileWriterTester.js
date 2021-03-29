const fs = require('fs');


class Giorno{
    constructor(nome,lezioni){
        this.nome=nome;
        this.lezioni=lezioni;
    }
}
class Lezione{
    constructor(nome,link){
        this.nome=nome;
        this.link=link;
    }
}
var lezioni=[new Lezione("lezione1","link1"),new Lezione("lezione2","link2")];
var giorni=[new Giorno("peppe",lezioni)];

// convert JSON object to string
const data = JSON.stringify(giorni);

// write JSON string to a file
fs.writeFile('giorni.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});