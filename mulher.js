const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response) {
    response.json({
        nome: 'Sarah Mirailh',
        imagem: 'https://media.licdn.com/dms/image/C4D03AQGSQSIE_4SdGA/profile-displayphoto-shrink_400_400/0/1605821748135?e=1689811200&v=beta&t=GhpCMoYOPy4zmLlZhyY34CX9YWbYDFJ4SFkWaZEdN_Q',
        minibio: 'Desenvolvedora, produtora cultural e professora.'
    })
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)