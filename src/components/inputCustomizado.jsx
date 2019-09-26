import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class InputCustomizado extends Component {
  constructor() {
    super();
    this.state = { msgErro: '' };
  }

  render() {
    const { label, type, name, value, onChange, placeHolder } = this.props;
    return (
      <div className='pure-control-group'>
        <label htmlFor={name}>{label}</label>
        <input
          {...this.props}
          onChange={evt => {
            debugger;
            this.props.onChange(name, evt);
          }}
        />
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

export default InputCustomizado;
