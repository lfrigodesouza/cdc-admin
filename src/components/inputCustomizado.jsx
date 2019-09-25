import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class InputCustomizado extends Component {
  constructor() {
    super();
    this.state = { msgErro: '' };
  }

  render() {
    const { label, type, name, value, onChange } = this.props;
    return (
      <div className='pure-control-group'>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
        <span className='error'>{this.state.msgErro}</span>
      </div>
    );
  }

  componentDidMount() {
    PubSub.subscribe('erro-validacao', (topico, data) => {
      if (data.field == this.props.name) {
        this.setState({ msgErro: data.defaultMessage });
      }
    });
    PubSub.subscribe('limpa-erros', () => {
      this.setState({ msgErro: '' });
    });
  }
}

export default InputCustomizado;
