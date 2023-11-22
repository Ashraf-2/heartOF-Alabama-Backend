const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

//middlewear
app.use(cors());
app.use(express.json());

//food-campagin-A11
//tvWaeIHIs0L7BQct

// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)

//mongodb connect


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bx5otjq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    //create Database and collections
    const foodCampgaingDB = client.db("food-campagin-b8A11-DB");
    const availableFoodsCL = foodCampgaingDB.collection('available-foods');
    
    
    //available foods related crud operation
    app.get('/availableFoods', async(req,res)=> {
        const cursor = availableFoodsCL.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    
    app.post('/availableFoods', async(req,res)=> {
        const newFood = req.body;
        console.log(newFood);
        const result = await availableFoodsCL.insertOne(newFood);
        res.send(result);
    })
    
    
    
    
    
    
    
    
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req,res) => {
    res.send('Food Campagin server is running');
})


app.listen(port, ()=> {
    console.log(`Food Campagin server is successfully running on port ${port}`);
})