const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();

const app = express();
const PORT =  process.env.PORT || 80;



app.use(cors())
app.use(express.json())

//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req,res)=>{
    res.send('My api for the app Mynote')
})
app.listen(PORT,()=>{
    console.log(`Server Running at Port:${PORT}`)
})