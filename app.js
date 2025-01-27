const express = require('express');
const cors = require('cors');
require('dotenv').config();


const libroRouter = require('./routes/libroRoutes');


const app = express();

//Milddlewares
app.use(express.json());
app.use(cors());


//Routes
app.use('/api', libroRouter);


//Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en  http://localhost:${port}`);
});