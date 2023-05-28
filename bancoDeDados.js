const mongoose = require('mongoose')
require('dotenv').config() //Chama a dotenv pra ocultar o link do Banco de Dados.
async function conectaBancoDeDados(){
    try {
        console.log('Conexão com o banco de dados iniciada.')

        await mongoose.connect(process.env.MONGO_URL) //Abstração pra conectar com o banco de dados em segurança.

        console.log('Conexão com o banco de dados feita com sucesso!')
    } catch(erro) {
        console.log(erro)
    }
}

    module.exports = conectaBancoDeDados