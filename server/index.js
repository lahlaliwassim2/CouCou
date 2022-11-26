const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserRoute = require('./routes/userRoutes')
const app = express()
require( "dotenv").config();

app.use(cors())
app.use(express.json())

app.use("/api/auth",UserRoute)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true,

}).then(()=>{
    console.log('Mongodb -connected')
}).catch((err)=>{
    console.log(err.message);
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`app run in ${process.env.PORT}`)
})