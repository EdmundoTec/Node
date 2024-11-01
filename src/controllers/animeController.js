const listaAnimes = require('../mocks/animeList')


function getAllAnimes (req, res) {
    res.send(listaAnimes)
}


function getAnimeById (req, res) {
    const id = parseInt(req.params.id);
    const animes = listaAnimes.find(p => p.id === id);

    if (animes){
        res.send(animes)
    } else {
        res.status(404).send({ message: "Anime não foi encontrado"})
    }
  }

function createAnime (req, res) {
    const {
      nome,
      ano,
      nota,
      genero,
      episodeos,
      imagem,
      sinopse} = req.body;

    // Ternário -> x ? condição = true : valor estabelecido
    const id = listaAnimes.length ? listaAnimes[listaAnimes.length -1].id +1 : 1;

        listaAnimes.push({id, nome, ano, nota, genero, episodeos, imagem, sinopse})
          res.send('🟢 Anime inserido com sucesso! 😁👍')
}


function updateAnime (request, response) {
  const {id} = request.params;
  const {
      nome,
      ano,
      nota,
      genero,
      episodeos,
      imagem,
      sinopse} = request.body;
  const animeIndex = listaAnimes.findIndex(anime => anime.id === Number(id));

  if(animeIndex === -1) {
    return response.send({ mensage: "🔴 Anime não encontrado 😰" })
  }

  listaAnimes[animeIndex] = {
    // Desestruturação do json para a devida visualização dos valores
    ...listaAnimes[animeIndex],
    nome,
    ano,
    nota,
    genero,
    episodeos,
    imagem,
    sinopse
  }
  response.send('🟢 Anime atualizado com sucesso! 😁👍')
}


  module.exports = {
    getAllAnimes,
    getAnimeById,
    createAnime,
    updateAnime
  }