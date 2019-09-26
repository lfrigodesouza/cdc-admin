import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class SelectCustomizado extends Component {
  state = { msgErro: '' };
  render() {
    const { name, label, autores, value, onChange } = this.props;
    return (
      <div className='pure-control-group'>
        <label htmlFor={name}>{label}</label>
        <select id={name} value={value} onChange={onChange}>
          <option value=''>Selecione</option>
          {autores.map(autor => {
            return (
              <option key={autor.id} value={autor.id}>
                {autor.nome}
              </option>
            );
          })}
        </select>
        <span className='error'>{this.state.msgErro}</span>
      </div>
    );
  }

  componentDidMount() {
    PubSub.subscribe('erro-validacao', (topico, data) => {
      if (data.field === this.props.name) {
        this.setState({ msgErro: data.defaultMessage });
      }
    });
    PubSub.subscribe('limpa-erros', () => {
      this.setState({ msgErro: '' });
    });
  }
}

export default SelectCustomizado;
