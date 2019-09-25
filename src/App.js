import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import { bindExpression } from '@babel/types';
import InputCustomizado from './components/inputCustomizado';
import SubmitCustomizado from './components/submitCustomizado';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lista: [],
      nome: '',
      email: '',
      senha: ''
    };
  }

  componentDidMount() {
    $.ajax({
      url: 'https://cdc-react.herokuapp.com/api/autores',
      dataType: 'json',
      success: res => {
        this.setState({ lista: res.slice(res.length - 10, res.length) });
      }
    });
  }

  setEmail = evt => {
    this.setState({ email: evt.target.value });
  };
  setNome = evt => {
    this.setState({ nome: evt.target.value });
  };
  setSenha = evt => {
    this.setState({ senha: evt.target.value });
  };

  enviaFormulario = evt => {
    evt.preventDefault();
    $.ajax({
      url: 'https://cdc-react.herokuapp.com/api/autores',
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({
        nome: this.state.nome,
        email: this.state.email,
        senha: this.state.senha
      }),
      success: res => {
        this.setState({ lista: res.slice(res.length - 10, res.length) });
      },
      error: error => {}
    });
  };

  render() {
    return (
      <div id='layout'>
        <a href='#menu' id='menuLink' className='menu-link'>
          <span></span>
        </a>
        <div id='menu'>
          <div className='pure-menu'>
            <a className='pure-menu-heading' href='#'>
              Company
            </a>

            <ul className='pure-menu-list'>
              <li className='pure-menu-item'>
                <a href='#' className='pure-menu-link'>
                  Home
                </a>
              </li>
              <li className='pure-menu-item'>
                <a href='#' className='pure-menu-link'>
                  Autor
                </a>
              </li>
              <li className='pure-menu-item'>
                <a href='#' className='pure-menu-link'>
                  Livro
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div id='main'>
          <div className='header'>
            <h1>Cadastro de Autores</h1>
          </div>
          <div className='content' id='content'>
            <div className='pure-form pure-form-aligned'>
              <form
                className='pure-form pure-form-aligned'
                onSubmit={this.enviaFormulario}
                method='POST'
              >
                <InputCustomizado
                  label='Nome'
                  type='text'
                  name='nome'
                  value={this.state.nome}
                  onChange={this.setNome}
                />
                <InputCustomizado
                  label='Email'
                  type='email'
                  name='email'
                  value={this.state.email}
                  onChange={this.setEmail}
                />
                <InputCustomizado
                  label='Senha'
                  type='password'
                  name='senha'
                  value={this.state.senha}
                  onChange={this.setSenha}
                />
                <SubmitCustomizado label='Gravar' />
              </form>
            </div>
            <div>
              <table className='pure-table'>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.lista.map(autor => (
                    <tr key={autor.id}>
                      <td>{autor.nome}</td>
                      <td>{autor.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
