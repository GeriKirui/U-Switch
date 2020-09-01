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

    let maxIndex = (data) =>{
        let maxTime = 0;
        let index = 0;
        
        for(let i = 0; i < data.length; i++){
          if(data[i].timestamp > maxTime){
            maxTime = data[i].timestamp;
            index = i;
          }
        }
        return index;
        }

    database.find({}, (err,data) =>{
        if(err){
            response.end();
            return;
        }
        response.json(data);
        item = data[maxIndex(data)];
        fs.writeFileSync('public/state.txt', item.state);
    });
});

//A function that handles a post request from the CLIENT
//The client is the one posting (index.js is the server)
app.post('/api', (request, response) =>{
    let data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp; 
    database.insert(data);
    response.json(data)
});