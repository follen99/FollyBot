const fs = require('fs');

// read JSON object from file
fs.readFile('user.json', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }

    // parse JSON object
    const users = JSON.parse(data.toString());

    // print JSON object
    console.log(users);
});