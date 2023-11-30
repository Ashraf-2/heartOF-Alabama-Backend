const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { error } = require('console');

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
    const foodRequestCL = foodCampgaingDB.collection('food-requests');

    //available foods related crud operation
    app.get('/availableFoods', async (req, res) => {
      const cursor = availableFoodsCL.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    //get specific food
    app.get('/availableFoods/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await availableFoodsCL.findOne(query);
      res.send(result);

    })


    //add data - food 
    app.post('/availableFoods', async (req, res) => {
      const newFood = req.body;
      console.log(newFood);
      const result = await availableFoodsCL.insertOne(newFood);
      res.send(result);
    })

    //food delete by the user operation
    app.delete('/availableFoods/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await availableFoodsCL.deleteOne(query);
        // console.log("query id: ", query);
        res.send(result);
      } catch {
        (error) => {
          console.log(error);
        }
      }
    })

    //food update operation 
    app.put('/availableFoods/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updateFood = req.body;

      const food1 = {
        $set: {
          food_img: updateFood.food_img,
          food_name: updateFood.food_name,
          food_status: updateFood.food_status,
          donator_name: updateFood.donator_name,
          donator_email: updateFood.donator_email,
          donator_photo: updateFood.donator_photo,
          food_quantity: updateFood.food_quantity,
          pickup_location: updateFood.pickup_location,
          expire_date: updateFood.expire_date,
          notes: updateFood.notes,
          delivery_status: updateFood.delivery_status
        }
      }
      console.log(food1);
      const result = await availableFoodsCL.updateOne(filter, food1, options)
      console.log(result)
      res.json(result);
    })

    //food request related CRUD operation

    //get operation for food-request collections
    app.get('/foodRequest', async (req, res) => {
      const cursor = foodRequestCL.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/foodRequest/:refId', async (req, res) => {
      try {
        const refId = req.params.refId;
        const result = await foodRequestCL.findOne({refId});
        console.log(refId);
        res.send(result)
      } catch (error) {
        console.log(error);
      }
    })

    //post operation for store food-request
    app.post('/foodRequest', async (req, res) => {
      try {
        const newFoodRequest = req.body;
        console.log(newFoodRequest);
        const result = await foodRequestCL.insertOne(newFoodRequest);
        res.send(result)
      }
      catch {
        (error) => {
          console.log(error);
        }

      }
    })

    app.delete('/foodRequest/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const result = await foodRequestCL.deleteOne(query);
        res.send(result);
      }
      catch
      {
        error => console.log(error);

      }
    })

    app.put('/foodRequest/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updateFood = req.body;

      const food1 = {
        $set: {
          refId: updateFood.refId,
          food_name: updateFood.food_name,
          food_status: updateFood.food_status,
          donator_name: updateFood.donator_name,
          donator_email: updateFood.donator_email,
          donator_photo: updateFood.donator_photo,
          food_quantity: updateFood.food_quantity,
          pickup_location: updateFood.pickup_location,
          expire_date: updateFood.expire_date,
          notes: updateFood.notes,
          delivery_status: updateFood.delivery_status,
          donation_amount: updateFood.donation_amount,
          request_date: updateFood.request_date,
          requester_name: updateFood.requester_name,
          requester_email: updateFood.requester_email,
          requester_photo: updateFood.requester_photo,
        }
      }
      console.log(food1);
      const result = await foodRequestCL.updateOne(filter, food1, options)
      console.log(result)
      res.json(result);
    })

    //manage food crud operation

    /** 
    app.get('/manageFoods', async(req,res)=> {
      // console.log(req.query.email)
      // const email = req.query.email;
      // let query = {};
      // if(req.query?.email){
      //   query = {email: req.query.email};
      // }
      // console.log("query: ", query);
      // const cursor = availableFoodsCL.find(query);
      // const result = await cursor.toArray();
      // console.log("result: ",result);


      // const query = {
      //   email: 'hasanashraful03@gmail.com',
      // };
      // const result = await availableFoodsCL.find(query).toArray()
      res.send(result);
    })
    */









    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Food Campagin server is running');
})


app.listen(port, () => {
  console.log(`Food Campagin server is successfully running on port ${port}`);
})