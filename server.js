import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/manga_livro', (request, reply) => {
// Acessando dados do corpo da requisição
    const {nome, originador, capitulos} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        nome: nome,
        originador: originador,
        capitulos: capitulos,
    })

    return reply.status(201).send
})

server.get('/manga_livro', (request) => {
    const search = request.query.search
    console.log(search)
    const mangas_livro = database.list(search)
    console.log(mangas_livro)
    return mangas_livro
})

server.put('/mangas_livro/:id', (request, reply) => {
    const manga_livroId = request.params.id
    const {nome, originador, capitulos} = request.body
    const manga_livro = database.update(manga_livroId, {
        nome: nome,
        originador: originador,
        capitulos: capitulos,
    })
    return reply.status(204).send()
})

server.delete('/mangas_livro/:id', (request, reply) => {
    const manga_livroId = request.params.id

    database.delete(manga_livroId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})