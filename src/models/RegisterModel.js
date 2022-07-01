const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const RegisterSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const RegisterModel = mongoose.model('Register', RegisterSchema);

class Register {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.valida();
        if(this.errors.length > 0) return;

        await this.userExists();

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();  
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        this.user = await RegisterModel.create(this.body);
    }

    async userExists() {
        const user = await RegisterModel.findOne({ email: this.body.email });
        if(user) this.errors.push('Email já cadastrado');
    }

    valida() {
       this.cleanUp();
       // Validação
       // O email precisa ser valido
       if(!validator.isEmail(this.body.email)) {
           this.errors.push('Email inválido');
       }

       // A senha precisa ter entre 4 e 8 
       if(this.body.password.length < 4 || this.body.password.length > 8) {
           this.errors.push('Senha precisa ter de 4 a 8 caracteres')
        }

        if(this.body.password !==  this.body.repeatPassword) { 
            this.errors.push('Os campos de senha devem ser iguais')
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password,
            repeatPassword: this.body.repeatPassword
        };
    }
}
exports = Register;