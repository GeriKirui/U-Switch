const express = require('express');
const Datastore = require('nedb');
const fs = require('fs');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

//A function that handles a get request from the CLIENT
//The client is the one getting
app.get('/api', (request, response) =>{
    database.find({}, (err,data) =>{
        if(err){
            response.end();
            return;
        }
        response.json(data);
    });
});

//A function that handles a post request from the CLIENT
//The client is the one posting (index.js is the server)
app.post('/api', (request, response) =>{
    let data = request.body;
    fs.writeFileSync('public/userState.txt', data.state);
    const timestamp = Date.now();
    data.timestamp = timestamp; 
    database.insert(data);
    response.json(data)
});

//A function that handles a post request from the node MCU
app.post('/myLastStatus', (request, response) =>{
    console.log(request.body.state);
    fs.writeFileSync('public/switchState.txt', request.body.state);
});