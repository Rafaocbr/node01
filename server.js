// Essa forma é a forma nativa de se criar um servidor. Mais abaixo iremos criar de uma forma mais
// -otimizada com o fastify
// import { createServer } from 'node:http'

// // request: solicitação que o seu navegador faz ao servidor.
// // response: resposta que o servidor envia de volta para o seu navegador
// const server = createServer((request, response) => {

//   response.write('Hello Worlde!')

//   return response.end()

// })

// server.listen(3333)

// // METODOS SÃO CRIADOS AQUI. EX: GET, POST, DELETE...
// // FRAMEWORK AUXILIA JUSTAMENTE NESSA ETAPA e banco de dados também;

// GET, POST, PUT(ALTERAÇÃO), DELETE, PATCH(ALTERAR PEQUENA INFO)


// POST http://localhost:3333/videos

// Route Parameter :id (é o endereço do vídeo em si)
// PUT http://localhost:3333/videos/1

import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

// Request Body (no post e no put)

// aqui eu criaria um video
server.post('/videos', async (req, res) => {
  const { title, description, duration } = req.body

  await database.create({
    // vou usar short sintax, é possível quando se tem-
    // nomes repetidos

    title,
    description,
    duration,

    // title: title,
    // description: description,
    // duration: duration,
  })

  return res.status(201).send()
})

// aqui eu vejo um video
// pelo navegador somente consegue-se testar métodos GET, nenhum outro
server.get('/videos', async (req) => {
  const search = req.query.search

  console.log(search)

  const videos = await database.list(search)

  return videos
})

//atualizar video
server.put('/videos/:id', async (req, res) => {
  const videoId = req.params.id
  const { title, description, duration } = req.body

  await database.update(videoId, {
    title,
    description,
    duration,
  })

  return res.status(204).send()
})

server.delete('/videos/:id', async (req, res) => {
  const videoId = req.params.id

  await database.delete(videoId)

  return res.status(204).send()
})

server.listen({
  port: process.env.PORT ?? 3333,
})
