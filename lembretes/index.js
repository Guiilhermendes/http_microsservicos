const express = require('express') //Importação
const bodyParser = require('body-parser') //Isso é um "middleware"
const axios = require('axios')

const app = express() //Atribuo a uma constante o pacote EXPRESS para assim utilizar dos METODOS HTTP

app.use(bodyParser.json()) //Com isso por causa do BODYPARSER é permitido agora acessar o corpo da requisição, assim: "req.body" e tratá-lo como um objeto JSON

const lembretes = {}
let contador = 0 //Minha chave "ID"

app.get('/lembretes', (req, res) => {
    //O STAUS já é explicito, logo não era necessario colocar ".status(200)" porque se for aceito mesmo ele já vai dar "OK", poderia ficar assim essa linha:
    //res.send(lembretes)
    res.status(200).send(lembretes) //Passamos um STATUS 200 para indicar que "OK" a reposta está sendo enviada e com o SEND enviamos nosso OBJ como retorno
})

app.post('/lembretes', async (req, res) => {
    contador++
    /* EXPLICANDO DESTRTUTURAÇÃO *
        Esse "const {texto, data} = req.body" teria a mesma função de se fazer:
        const texto = req.body.texto
        ou
        const data = req.body.data
        Porem com essa forma que foi feita na primeira linha, uma foma mais enxuta que se chama OPERADOR DE DESESTRUTURAÇÃO.

        Porque o que acontece, como qualquer OBJ JSON, existe o corpo, e nesse "req" existe o corpo da requisição que possui um objeto como um qualquer, como por exemplo:
        {
            "texto": "Fazer cafe",
            "data": "2021-11-07",
            "outracoisa": "asihdfaifji"
        }
        Suponha-se que tenhamos 50 propriedades aqui e que nós gostariamos de pegar somente algumas delas e é ai que entra o OPERADOR DE DESESTRUTURAÇÃO para facilitar nossas vidas
        ele constiste em facilitar nossas vidas, porque se por exemplo a gente vai pegar somente um elemento do OBJ, tudo bem utilizar o OPERADOR "." para pegar, afinal é um-
        -mas se nós formos pegar varios elementos dentro do OBJ, fazer isso linha por linha fica cansativo e por isso podemos usar a "desestruturação".
        
        Então em vez de utilizarmos:

        const texto = req.body.texto
        const data = req.body.data

        Utilizazmos:

        --> const { texto, data } = req.body 

        Que deixa o codigo muito mais limpo e causa o mesmo efeito.
        E com isso a gente pode chamar os elementos dentro das {} da mesma forma, como se tivesse declarado ela como uma variavel comum
        console.log(texto) e ele ira nos trazer extamente o que retia dentro do "req.body.texto"

        É importante deixar claro que essa DESESTRUTURAÇÃO funciona passando os nomes dos elementos que pertencetem dentro de tal objeto e com isso ao fazer a atribuição-
        -desse objeto essa DESESTRUTURAÇÃO nós podemos acessar seus valores como é feito de forma casual de atribuições de variaveis
    */
    const { texto } = req.body
    //Acessamos o OBJETO "lembretes" apartir de um indice CONTADOR (que seria 0, mas como temos um "contador++" começa com 1) e abatir de desse OBJETO com uma chave "1"-
    //-Nós atribuimos como valor a CHAVE 1 um novo OBJETO que tem suas chaves e seus valores
    lembretes[contador] = { contador: contador, texto: texto }
    //Dessa forma eu envio para o BARRAMENTO DE EVENTOS os dados manipulados nestes POST neste MICROSSERVIÇO
    await axios.post('http://localhost:10000/eventos', {
        tipo: "Lembrete criado",
        dados: {
            contador,
            texto
        }
    })
    //201 --> CREATED
    res.status(201).send(lembretes[contador])
})

app.post('/eventos', (req, res) => {
    console.log(req.body)
    res.status(204).end()
})

//Com esse LISTEN eu consigo passar uma PORTA de hospedagem no primeiro parametro e no segundo uma ARROW FUNCTION
app.listen(4000, () => console.log("Lembretes. Porta 4000"))