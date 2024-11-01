// IMPORTANDO O EXPRESS
const express = require('express')
// APP RECEBE O EXPRESS
const app = express() 
const animeController = require('./controllers/animeController') 
// const { JsonWebTokenError } = require('jsonwebtoken')
const products = require('./mocks/sneakersList')
app.use(express.json()) // Middleware para interpratação de JSON
const jwt = require('jsonwebtoken')
const PORT = 3000

// CRIANDO ROTA LOGIN
app.post('/login', (req, res) => {
  try {

    const email = req.body.email
    const senha = req.body.senha

    const emailUser = 'eddy@exemplo.com'
    const senhaUser = '250600'


    if (email === emailUser && senha === senhaUser){
      const token = jwt.sign({id: 17, name:'Edmundo'}, 'akdjflnkadgp')
      res.send({
        sucess: true,
        token: token,
        message: 'Login realizado com sucesso!'
      })
    } else {
      res.send({
        sucess: true,
        token: '',
        message: 'Usuário ou senha inválidos!'
      })
    }
  } catch (error){
    res.send({
      sucess: false,
      token: '',
      message: `Falha na requisição ${error}`
    })
  }

})

// CRIANDO ROTA PRODUTOS
app.get('/produtos', (req, res) => {
  try {
    const token = req.query.token
    const jwt = require('jsonwebtoken')
    const decoded = jwt.verify(token, 'akdjflnkadgp')

    if (decoded){
      res.send({
        sucess: true,
        message: 'Lista carregada com sucesso!',
        products
      })
    } else {
      res.send({
        sucess: false,
        message: 'Token inválido!',
        products: []
      })
    }
  } catch (error){
    res.send({
      sucess: false,
      message: `Falha na requisição ${error}`,
      products: []
    })
  }

})


//CRIANDO ROTA HOME
app.get('/', (req, res) => {
  res.send('Bem vindo(a) à API')
})

//Rota para Visualizar todos os Animes.
app.get('/animes', animeController.getAllAnimes)

//Rota para Visualizar um animes singular, baseado no ID.
app.get('/animes/:id', animeController.getAnimeById)

//Rota para Inserir um novo anime.
app.post('/animes', animeController.createAnime)

//Rota para atualizar um anime existente utilizando o Id como parâmetro.
app.put('/animes/:id', animeController.updateAnime)


// SUBINDO O SERVIDOR NA PORTA 3000

app.listen(PORT, () => {
    console.log(`O servidor está rodando no link -> http://localhost:${PORT}`)
})



// // CRIANDO ROTA CEP
// app.get('/cep', (req, res) => {
//     res.send({
//         "cep": "01001-000",
//         "logradouro": "Praça da Sé",
//         "complemento": "lado ímpar",
//         "unidade": "",
//         "bairro": "Sé",
//         "localidade": "São Paulo",
//         "uf": "SP",
//         "estado": "São Paulo",
//         "regiao": "Sudeste",
//         "ibge": "3550308",
//         "gia": "1004",
//         "ddd": "11",
//         "siafi": "7107"
//       })
//   })

// // CRIANDO ROTA PRODUTOS
// app.get('/products', (req, res) => {
//     res.send(produtos)
//   })

// app.get('/products/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const produto = produtos.find(p => p.id === id);

//     if (produto){
//         res.send(produto)
//     } else {
//         res.status(404).send({ message: "Produto não encontrado"})
//     }
//   })