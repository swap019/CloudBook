const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
const app = express()
const port = 5000

app.use(express.json()) // this middlewere is used if we wanto accesss the body of json on hitting endpoint

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})