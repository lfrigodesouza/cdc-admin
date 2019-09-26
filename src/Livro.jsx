import React, { Component } from 'react';
import InputCustomizado from './components/inputCustomizado';
import SubmitCustomizado from './components/submitCustomizado';
import $ from 'jquery';
import SelectCustomizado from './components/selectCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class TabelaLivro extends Component {
  render() {
    return (
      <div>
        <table className='pure-table'>
          <thead>
            <tr>
              <th>Título</th>
              <th>Preço</th>
              <th>Autor</th>
            </tr>
          </thead>
          <tbody>
            {this.props.livros.map(livro => {
              return (
                <tr>
                  <td>{livro.titulo}</td>
                  <td>R$ {livro.preco}</td>
                  <td>{livro.autor.nome}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

class FormularioLivro extends Component {
  constructor() {
    super();
    this.state = {
      titulo: '',
      autorId: '',
      preco: '',
      listaAutores: []
    };
  }

  componentDidMount() {
    $.ajax({
      url: 'https://cdc-react.herokuapp.com/api/autores',
      dataType: 'json',
      success: res => {
        this.setState({ listaAutores: res.slice(res.length - 10, res.length) });
      }
    });
  }

  enviaFormulario = evt => {
    evt.preventDefault();
    $.ajax({
      url: 'https://cdc-react.herokuapp.com/api/livros',
      method: 'POST',
      contentType: 'application/json',
      type: 'json',
      success: res => {
        PubSub.publish('on-new-list-livros', res);
        this.setState({ titulo: '', autorId: '', preco: '' });
      },
      error: erro => {
        if (erro.status === 400) {
          new TratadorErros().publicaErros(erro.responseJSON);
        }
      },
      data: JSON.stringify({
        titulo: this.state.titulo,
        preco: this.state.preco,
        autorId: this.state.autorId
      }),
      beforeSend: () => {
        PubSub.publish('limpa-erros');
      }
    });
  };

  handleTitleChange = evt => {
    this.setState({ titulo: evt.target.value });
  };
  handlePrecoChange = evt => {
    this.setState({ preco: evt.target.value });
  };
  handleAutorChange = evt => {
    this.setState({ autorId: evt.target.value });
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
            label='Título'
            type='text'
            name='titulo'
            value={this.state.titulo}
            onChange={this.handleTitleChange}
            placeHolder='Título do livro'
          />
          <InputCustomizado
            label='Preço'
            type='number'
            name='preco'
            value={this.state.preco}
            onChange={this.handlePrecoChange}
            isCurrency='true'
            placeHolder='R$'
          />
          <SelectCustomizado
            label='Autor'
            name='autorId'
            value={this.state.autorId}
            onChange={this.handleAutorChange}
            autores={this.state.listaAutores}
          />
          <SubmitCustomizado label='Gravar' />
        </form>
      </div>
    );
  }
}

class LivroBox extends Component {
  constructor() {
    super();
    this.state = {
      listaLivros: []
    };

    PubSub.subscribe('on-new-list-livros', (topic, data) => {
      this.setState({ listaLivros: data.slice(data.length - 10, data.length) });
    });
  }

  componentDidMount() {
    $.ajax({
      url: 'https://cdc-react.herokuapp.com/api/livros',
      dataType: 'json',
      success: res => {
        this.setState({ listaLivros: res.slice(res.length - 10, res.length) });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className='header'>
          <h1>Cadastro de Livros</h1>
        </div>
        <div className='content' id='content'>
          <FormularioLivro />
          <TabelaLivro livros={this.state.listaLivros} />
        </div>
      </React.Fragment>
    );
  }
}

export default LivroBox;
