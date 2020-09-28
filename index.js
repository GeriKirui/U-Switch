const express = require('express');
const fs = require('fs');
const app = express();
let port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening at 3000'));

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
    response.json(data)
});

//A function that handles a post request from the node MCU
app.post('/myLastStatus', (request, response) =>{
    //console.log(request.body.state);
    fs.writeFileSync('public/switchState.txt', request.body.state);
});

//A function that gets the scheduling times and stores them on the server
app.post('/scheduling', (request, response) =>{
    let schedule = request.body;
    console.log(schedule.str);
    fs.writeFileSync('public/schedule.txt', schedule.str);
    response.json(schedule)
});