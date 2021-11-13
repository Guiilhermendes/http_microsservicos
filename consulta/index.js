const express = require('express')

const app = express()
app.use(express.json())

const baseConsulta = {}

const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.contador] = {
            contador: lembrete.contador, texto: lembrete.texto
        }
    },
    ObservacaoCriada: (observacao) => {
        //Crio uma constante que recebera a chave "observaoes" ou caso ele não exista uma lista vazia
        const observacoes = baseConsulta[observacao.lembreteId]['observacoes'] || []
        //Dou um push nessa lista criada acima passando o parametro
        observacoes.push(observacao)
        //faço com que esse array criado acima e preenchido agora seja atribuido a uma chave de um objeto
        baseConsulta[observacao.lembreteId]['observacoes'] = observacoes
    }
}

app.post('/eventos', (req, res) => {
    funcoes[req.body.tipo](req.body.dados)
    res.status(200).send(baseConsulta)
})

app.get('/lembretes', (req, res) => {
    res.status(200).send(baseConsulta)
})


app.listen(6000, () => console.log("Open post. 6000"))