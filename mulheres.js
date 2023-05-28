const express = require("express") //Iniciando o express.
const router = express.Router() // Configurando a primeira parte da rota.
const cors = require('cors') //Traz o pacote cors (permite consumir essa API no front-end.)
const conectaBancoDeDados = require('./bancoDeDados') //Ligando ao arquivo bancoDeDados.
conectaBancoDeDados() //Chamando a função que conecta o banco de dados.

//Abstração que diz a regra da criação e conexão com o Bando de Dados em relação ao objeto Mulher:
const Mulher = require('./mulherModel')

const app = express() //Iniciando o app.
app.use(express.json())
app.use(cors())

const porta = 3333 //Criando a porta.


//Mudei o GET antigo que puxava a const mulheres para o try catch:
//GET (verbo HTTP para obter dados):
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find() //find() --> Abstração do Mongoose

        response.json(mulheresVindasDoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }
}

// Mesma mudança do GET
//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try {
        const mulherCriada = await novaMulher.save() //Abstração pra criar o objeto no MongoDB.
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}

//Mesma mudança do POST
//PATCH
async function corrigeMulher(request, response) {
    try{
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem // Aqui ela não colocou mulherEncotnrada.imagem, só mulherEncontrada.
        }
    
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }

        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save() //constante para salvar a mulher alterada no Mangoose.
        response.json(mulherAtualizadaNoBancoDeDados)

    } catch (erro) {
        console.log(erro)
    }
}

//Mesma mudança do PATCH
//DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ mensagem: 'Mulher deletada com sucesso!'})
    } catch(erro) {
        console.log(erro)
    }
}

app.use(router.get('/mulheres', mostraMulheres)) //Configuração da rota GET / mulheres.
app.use(router.post('/mulheres', criaMulher)) // Configuração da rota POST /mulheres.
app.use(router.patch('/mulheres/:id', corrigeMulher)) //Configuração da rota PATCH /mulheres/:id.
app.use(router.delete('/mulheres/:id', deletaMulher)) //Configuração da rota DELETE /mulheres/:id.

//Retorna mensagem de log para exibir a porta (degub):
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.listen(porta, mostraPorta) //Servidor ouvindo a porta.