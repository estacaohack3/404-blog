const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(expressMongoDb('mongodb://localhost/blog'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Vitas!! trltrltrltrtlrtrl');
});

app.listen(3030, () => {
  console.log('Servidor rodando na porta 3030');
});