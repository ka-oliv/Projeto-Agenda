import validator from 'validator';

export default class Contato {
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

  validate(e) {
    const el = e.target;
    const nomeInput = el.querySelector('input[name="nome"]');
    const emailInput = el.querySelector('input[name="email"]');
    const telefoneInput = el.querySelector('input[name="telefone"]');
    let error = false;

    if(!nomeInput.value) {
        alert('"Nome" é um campo obrigatório');
        error = true;
    }

    if(!emailInput.value && !telefoneInput.value) {
        alert('É necessário ao menos uma forma de contato');
        error = true;
    }
   
    if(emailInput.value && !validator.isEmail(emailInput.value)) {
        alert('email inválido');
        error = true;
    }
    
    if(!error) el.submit();
  }
}

