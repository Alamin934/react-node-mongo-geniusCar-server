const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ogrrwih.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


app.get('/', (req, res) => {
    res.send('Server Running successfully');
});


async function run() {
    try {
        await client.connect();
        const database = client.db("insertDB");
        const haiku = database.collection("haiku");







    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log('Server Running port on', port)
})