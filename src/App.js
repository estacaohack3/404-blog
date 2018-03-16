import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentWillMount = () => {
    this.dados = {};
    this.setState({posts: []});

    this.carregar();
  }

  carregar = () => {
    axios.get('http://localhost:3030').then((resposta) => {
      this.setState({posts: resposta.data});
    });
  }
  
  aoEscrever = (event) => {    
    this.dados[event.target.name] = event.target.value;
  }

  // forma tradicional de capturar os dados usando querySelector
  // pegarDados = () => {
  //   let inputs = document.querySelectorAll('input');

  //   for(let input of inputs){
  //     this.dados[input.name] = input.value;
  //   }

  //   console.log(this.dados);
  // }

  enviar = () => {
    axios.post('http://localhost:3030', this.dados).then(() => {
      this.carregar();
    });
  }

  render = () => {
    let html = [];

    for(let post of this.state.posts){
      html.push(
        <div>
          <h2>{post.nome}</h2>
          <h3>{post.autor}</h3>
          <p>{post.conteudo}</p>
        </div>
      )
    }

    return (
      <div className="App" ref="container">
        <section>
          <input placeholder="Título" name="titulo" onChange={this.aoEscrever} />
          <input placeholder="Autor" name="autor" onChange={this.aoEscrever} />
          <textarea placeholder="Conteúdo" name="conteudo" onChange={this.aoEscrever}>
          </textarea>

          <button onClick={this.enviar}>Enviar</button>
        </section>


        {html}
      </div>
    );
  }
}

export default App;
