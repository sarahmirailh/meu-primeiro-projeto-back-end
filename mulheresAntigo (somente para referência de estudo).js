const express = require("express") //Iniciando o express.
const router = express.Router() // Configurando a primeira parte da rota.
const { v4: uuidv4 } = require('uuid') //Gera o id

const conectaBancoDeDados = require('./bancoDeDados') //Ligando ao arquivo bancoDeDados.
conectaBancoDeDados() //Chamando a função que conecta o banco de dados.

//Abstração que diz a regra da criação e conexão com o Bando de Dados em relação ao objeto Mulher:
const Mulher = require('./mulherModel')

const app = express() //Iniciando o app.
app.use(express.json())
const porta = 3333 //Criando a porta.

//Agora estamos usando a lista pelo banco de dados, não precisa mais dessa parte.
//Criando a lista inicial de mulheres:
/*const mulheres = [
    {
        id: '1',
        nome: 'Sarah Mirailh',
        imagem: 'https://media.licdn.com/dms/image/C4D03AQGSQSIE_4SdGA/profile-displayphoto-shrink_400_400/0/1605821748135?e=1689811200&v=beta&t=GhpCMoYOPy4zmLlZhyY34CX9YWbYDFJ4SFkWaZEdN_Q',
        minibio: 'Desenvolvedora, produtora cultural e professora.'
    }, 
    {
        id: '2',
        nome: 'Simara Conceição',
        imagem: 'https://github.com/simaraconceicao.png',
        minibio: 'Desenvolvedora e instrutora.'
    },
    {
        id: '3',
        nome: 'Iana Chan',
        imagem: 'https://bit.ly/3JCXBqP',
        minibio: 'Fundadora da PrograMaria.'
    },
    {
        id: '4',
        nome: 'Nina da Hora',
        imagem: 'https://bit.ly/3FKpFaz',
        minibio: 'Hacker antirracista.'
    }
] */

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
 function criaMulher(request, response) {
    const novaMulher = {
        id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio
    }

    mulheres.push(novaMulher)

    response.json(mulheres)

}

//PATCH
function corrigeMulher(request, response) {
    function encontraMulher(mulher) {
        if (mulher.id === request.params.id) {
            return mulher
        }
    }
    const mulherEncontrada = mulheres.find(encontraMulher)

    if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
    }

    if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem // Aqui ela não colocou mulherEncotnrada.imagem, só mulherEncontrada.
    }

    if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
    }

    response.json(mulheres)
}

//DELETE
function deletaMulher(request, response) {
    function todasMenosEla(mulher) {
        if (mulher.id !== request.params.id) {
            return mulher
        }
    }

    const mulheresQueFicam = mulheres.filter(todasMenosEla)

    response.json(mulheresQueFicam)
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