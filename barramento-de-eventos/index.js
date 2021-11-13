const express = require('express') //Serve para receber requisições HTTP
const bodyParser = require('body-parser')
const axios = require('axios') //Serve para fazer requisições HTTP

const app = express()
app.use(bodyParser.json()) //Com isso eu consigo tratar o corpo de uma requisição como JSON, se ele for JSON

app.post('/eventos', (req, res) => {
    const evento = req.body
    console.log(evento)
    //Envia o evento para o microsserviço de lembretes
    axios.post('http://localhost:4000/eventos', evento)
    //Envia o evento para o microsserviço de observações
    axios.post('http://localhost:5000/eventos', evento)
    //Envia o evento para o microsserviço de consultas
    axios.post('http://localhost:6000/eventos', evento)
    //Finalizo para não estourar por só fazer fazer a "requisição" e não "responder" nada
    res.status(200).end()
})

app.listen(10000, () => console.log("Barramento de eventos. Porta 10000."))