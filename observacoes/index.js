const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid') //Pacote que gera IDs fortemente

const app = express()
app.use(bodyParser.json())

const observacoesPorLembreteId = {}

//EX: localhost:3000/lembretes/4/observacoes
app.get('/lembretes/:id/observacoes', (req, res) => {
    //Trazemos atraves do GET o OBJ com o mesmo ID passados nos parametros da URL ou se não existir nos traz um array vazio
    res.send(observacoesPorLembreteId[req.params.id] || [])
})

app.post(`/lembretes/:id/observacoes`, (req, res) => {
    const idObs = uuidv4()
    const { texto } = req.body
    const idLembrete = req.params.id
    //Criamos um ARRAY que recebe o OBJ com o ID da REQUISICAO ou uma lista vazia caso não tenham passado o parametro do ID na requisição
    const observacoesDoLembrete = observacoesPorLembreteId[idLembrete] || []
    //Damos um PUSH no ARRAY criado acima, passando seus elementos, sendo que "texto" por ter exatamente o mesmo nome CHAVE/VALOR, é possivel ser passado somente uma vez para facilitar o "texto: texto"
    observacoesDoLembrete.push({ id: idObs, texto })
    //Atribuimos ao OBJETO com o ID da REQUISICAO o ARRAY criado acima
    observacoesPorLembreteId[idLembrete] = observacoesDoLembrete
    //Exibimos o ARRAY criado
    res.status(201).send(observacoesDoLembrete)
})

app.listen(3000, () => console.log("3000 post available for observartions"))