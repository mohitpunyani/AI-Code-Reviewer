const express = require('express')
const port = 5000
const app = express()
const cors = require('cors');
app.use(express.json());
app.use(cors());
require('dotenv').config();

app.use('/api/aiRoutes', require('./src/Routes/ai.routes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
