const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        nome: 'Sarah Mirailh',
        imagem: 'https://media.licdn.com/dms/image/C4D03AQGSQSIE_4SdGA/profile-displayphoto-shrink_400_400/0/1605821748135?e=1689811200&v=beta&t=GhpCMoYOPy4zmLlZhyY34CX9YWbYDFJ4SFkWaZEdN_Q',
        minibio: 'Desenvolvedora, produtora cultural e professora.'
    }, 
    {
        nome: 'Simara Conceição',
        imagem: 'https://github.com/simaraconceicao.png',
        minibio: 'Desenvolvedora e instrutora.'
    },
    {
        nome: 'Iana Chan',
        imagem: 'https://bit.ly/3JCXBqP',
        minibio: 'Fundadora da PrograMaria.'
    },
    {
        nome: 'Nina da Hora',
        imagem: 'https://bit.ly/3FKpFaz',
        minibio: 'Hacker antirracista.'
    }
]

function mostraMulheres(request, response) {
    response.json(mulheres)
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta)