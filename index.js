const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()


app.use(cors());
app.use(express.json())



const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jbkru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
    //   const collection = client.db("mineral_water").collection("water_service");
    //   // perform actions on the collection object
    // });
    
    
    
    async function run(){
        try{
            client.connect();
            const database = client.db('mineral_water');
            const serviceCollection = database.collection('water_service');
            const teamsCollection = database.collection('teams');

        // Get Teams Data
            app.get('/teams',async(req, res)=>{
                const result = await teamsCollection.find({}).toArray();
                res.json(result)
            });


        // Get Services for home page
            app.get('/water_service', async(req, res)=>{
                const result = await serviceCollection.find({}).toArray();
                res.json(result)
            })


        }
    finally{
        
        //   client.close();
    }
}
run().catch(console.dir);

  
// port on
app.get('/', (req, res)=>{
    res.send('Running my crud server')
});

app.listen(port, ()=>{
    console.log('firebase')


})