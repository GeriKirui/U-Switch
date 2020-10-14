const express = require('express');
const fs = require('fs');
var sha256 = require('js-sha256');
const Datastore = require('nedb');
const wordToNum = require('words-to-numbers')
const app = express();
let port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening at 3000'));
const database = new Datastore('database.db');
database.loadDatabase();

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

//A function that handles a get request from the CLIENT
//The client is the one getting
app.get('/api', (request, response) =>{
        let x = fs.readFileSync('public/switchState.txt', 'utf8')
        //console.log(x);
        response.json(x);
});

//A function that handles a post request from the CLIENT
//The client is the one posting (index.js is the server)
app.post('/api', (request, response) =>{
    let data = request.body;
    fs.writeFileSync('public/userState.txt', data.state);
    database.insert(data);
    response.json(data)
});

//A function that handles a post request from the node MCU
app.post('/myLastStatus', (request, response) =>{
    //console.log(request.body.state);
    fs.writeFileSync('public/switchState.txt', request.body.state);
});

//A function that gets the scheduling times and stores them on the server
app.post('/scheduling', (request, response) =>{
    let data = request.body;
    function setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }
    
    for(let i = 0; i < data.length; i++){
        let num1Conv = wordToNum.wordsToNumbers(data[i].num1);
        let num2Conv = wordToNum.wordsToNumbers(data[i].num2);
        let index = 4*(num1Conv%12 + 0.25*(num2Conv - 1));
        let updatedState = JSON.stringify(data[i].state);
        let schedule = fs.readFileSync('public/schedule.txt', 'utf8');
        schedule = setCharAt(schedule,index,updatedState);
        fs.writeFileSync('public/schedule.txt', schedule);

    }
});

//A function that sends the schedule to the client
app.get('/scheduling', (request, response) =>{
    let x = fs.readFileSync('public/schedule.txt', 'utf-8');
    response.json(x);
});

app.get('/command',(request, response) =>{
    let x = fs.readFileSync('public/userState.txt', 'utf8');
    response.json(x);
    let empty = 2;
    fs.writeFileSync('public/userState.txt', empty);
})

//A function that handles a post request from the node MCU
app.post('/myCurrentReadings', (request, response) =>{
    console.log(request.body);
    //fs.writeFileSync('public/switchState.txt', request.body.state);
});

//A function that handles the PIN
app.post('/verifyPin', (request, response) =>{
    let package = request.body;
    let pin = package.password;
    fs.writeFileSync('userPin.txt', pin);
});

app.get('/verifyPin', (request, response) =>{
    let userPin = fs.readFileSync('userPin.txt', 'utf8');

    if(userPin === sha256('Student1615002')){
        response.json(1);
    }
    else{
        response.json(0);
    }

});