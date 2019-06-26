const express = require('express');
const Datastore = require('nedb');
const fetch  = require('node-fetch');
require('dotenv').config()
console.log(process.env)

const app = express();

const database =  new Datastore('database.db');
database.loadDatabase();


app.listen(8080, () => console.log("Está na porta 8080"));
app.use(express.static("publico"));
app.use(express.json({limit: "1mb"}));
app.get('/api', (request, response) => {
    database.find({}, (err, data) => {


      if(err){
        console.log("deu merda piá");
        response.end();
        return;
      }
        response.json(data);


    }); 
});
app.post('/api', (request, response) => {
const data = request.body;
const time = Date.now();
data.time = time;
database.insert(data);
response.json(data);




});
app.get('/tempo/:latlng', async (request, response) => {
  console.log(request.params);
const latlng = request.params.latlng.split(',');
console.log(latlng);
const lat = latlng[0];
const lng = latlng[1];
console.log(lat, lng);
const api_key = '044928bac188c8097fd006309a165fc1';
const w_url = `https://api.darksky.net/forecast/${api_key}/${lat},${lng}`;
const w_response = await fetch(w_url);
const w_json = await w_response.json();
const data = {weather: w_json};
response.json(data);
console.log(data);

});