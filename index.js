const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Genious Car Mechanics Server');
});



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wpmdo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

    try {
        await client.connect();

        const database = client.db("car_mechanic");
        const servicesCollection = database.collection("services");

        //GET API / GET ALL DATA
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        });
        //GET SINGLE API/SERVICE
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.json(service);
        });

        //POST API
        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log('hit the post api', service);
            const result = await servicesCollection.insertOne(service);
            console.log(result)
            res.json(result);

        });
        //DELETE API
        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await servicesCollection.deleteOne(query);
            console.log(result);
            res.json(result);
        })



    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);





app.listen(port, () => {
    console.log('Genious Car server Running at port', port);
});