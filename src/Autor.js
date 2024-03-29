import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './components/inputCustomizado';
import SubmitCustomizado from './components/submitCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros.js';

class FormularioAutor extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      senha: ''
    };
  }
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
        //dispara um publish de nova listagem disponível
        PubSub.publish('on-new-list-autores', res);
        this.setState({ nome: '', email: '', senha: '' });
      },
      error: error => {
        if (error.status === 400) {
          new TratadorErros().publicaErros(error.responseJSON);
        }
      },
      beforeSend: () => {
        PubSub.publish('limpa-erros');
      }
    });
  };

  salvaAlteracao = (nomeInput, evento) => {
    this.setState({ [nomeInput]: evento.target.value });
  };

  render() {
    return (
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
            id='nome'
            placeHolder='Nome do autor'
            value={this.state.nome}
            onChange={this.salvaAlteracao}
          />
          <InputCustomizado
            label='E-mail'
            type='email'
            name='email'
            id='email'
            placeHolder='E-mail do autor'
            value={this.state.email}
            onChange={this.salvaAlteracao}
          />
          <InputCustomizado
            label='Senha'
            type='password'
            name='senha'
            id='senha'
            placeHolder='Senha de acesso'
            value={this.state.senha}
            onChange={this.salvaAlteracao}
          />
          <SubmitCustomizado label='Gravar' />
        </form>
      </div>
    );
  }
}

class TabelaAutores extends Component {
  render() {
    return (
      <div>
        <table className='pure-table'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {this.props.lista.map(autor => (
              <tr key={autor.id}>
                <td>{autor.nome}</td>
                <td>{autor.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class AutorBox extends Component {
  constructor() {
    super();
    this.state = {
      lista: []
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

    PubSub.subscribe('on-new-list-autores', (topico, NovaListaDeAutores) => {
      this.setState({
        lista: NovaListaDeAutores.slice(
          NovaListaDeAutores.length - 10,
          NovaListaDeAutores.length
        )
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className='header'>
          <h1>Cadastro de Autor</h1>
        </div>
        <div className='content' id='content'>
          <FormularioAutor />
          <TabelaAutores lista={this.state.lista} />
        </div>
      </React.Fragment>
    );
  }
}
export default AutorBox;
