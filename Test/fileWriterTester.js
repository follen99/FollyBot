const fs = require('fs');

// create a JSON object
const user = {
    "id": 1,
    "name": "Peppe",
    "age": 25
};
const user1 = {
    "id": 2,
    "name": "Luigi",
    "age": 26
};
const user2 = {
    "id": 3,
    "name": "Antonello",
    "age": 27
};
const user3 = {
    "id": 4,
    "name": "Giuseppina",
    "age": 28
};

var users=[user,user1,user2,user3];

// convert JSON object to string
const data = JSON.stringify(users);

// write JSON string to a file
fs.writeFile('user.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});