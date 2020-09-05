const express = require('express');
const fs = require('fs');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

//A function that handles a get request from the CLIENT
//The client is the one getting
app.get('/api', (request, response) =>{
        let x = fs.readFileSync('public/switchState.txt', 'utf8')
        console.log(x);
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
    console.log(request.body.state);
    fs.writeFileSync('public/switchState.txt', request.body.state);
});