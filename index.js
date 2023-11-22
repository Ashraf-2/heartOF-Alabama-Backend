const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middlewear
app.use(cors());
app.use(express.json());

//food-campagin-A11
//tvWaeIHIs0L7BQct

app.get('/', (req,res) => {
    res.send('Food Campagin server is running');
})


app.listen(port, ()=> {
    console.log(`Food Campagin server is successfully running    on port ${port}`);
})