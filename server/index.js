const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(expressMongoDb('mongodb://localhost/blog'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  req.db.collection('posts').find().toArray((err, dados) => {
    res.send(dados);
  });
});

app.post('/', (req, res) => {
  let dados = {
    titulo: req.body.titulo,
    autor: req.body.autor,
    data: req.body.data,
    conteudo: req.body.conteudo,
    imagem: req.body.imagem
  };

  //validação
  if(!dados.titulo || !dados.autor || !dados.conteudo){
    res.status(400).send('É necessário enviar titulo, autor e conteúdo');
    return;
  }

  req.db.collection('posts').insert(dados, (err, dados) => {
    res.send(dados);
  });  

});

app.listen(3030, () => {
  console.log('Servidor rodando na porta 3030');
});