import validator from 'validator';
export default class Register {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate() {
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();

    if (camposValidos && senhasValidas) {
      alert('O formulário foi enviado!');
      this.form.submit();
    }
  }

  senhasSaoValidas() {
    let valid = true;

    const password = document.querySelector('#inputPassword');
    const passwordTwo = document.querySelector('#inputRepeatPassword');

    if (password.value.length < 4 || password.value.length > 8) {
      valid = false;
      this.criaErro(password, 'A senha precisa ter entre 4 e 8 caracteres');
    }

    if (password.value !== passwordTwo.value) {
      valid = false;
      this.criaErro(passwordTwo, 'Dados divergentes, confirme sua senha');
    }

    return valid;
  }

  camposSaoValidos() {
    let valid = true;

    for(let errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for(let campo of this.form.querySelectorAll('.need-validation')) {
      
      if(!campo.value) {
        valid = false;
        this.criaErro(campo, 'Campo obrigatório');
      }

      if(campo.classList.contains('email')) {
        if(!validator.isEmail(campo.value)) valid = false;
        this.criaErro(campo, 'Email inválido');
      }
    }

    return valid;
  }

  criaErro(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend', div);
  }
}