const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const Port = 5000;

const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  };

app.use(express.json());
app.use(cors(corsOptions));


const uri = "mongodb+srv://table:OgFoSkQSN1fuvtwc@cluster0.t87ip2a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();
    const tableCollection = client.db("tableDB").collection("table");

    
    app.get('/table', async(req , res)=>{
        const data = tableCollection.find()
        const result = await data.toArray()
        res.send(result)
     })

    

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", async (req, res) => {
    res.send({ message: "Welcome to our server" });
});

app.listen(Port, () => {
    console.log(`Server is running at ${Port}`);
});