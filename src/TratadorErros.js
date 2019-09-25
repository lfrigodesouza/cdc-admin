import PubSub from 'pubsub-js';

class TratadorErros {
  publicaErros(erros) {
    console.log(erros);
    for (let index = 0; index < erros.errors.length; index++) {
      const erro = erros.errors[index];
      PubSub.publish('erro-validacao', erro);
    }
  }
}

export default TratadorErros;
