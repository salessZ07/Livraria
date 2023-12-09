import { randomUUID } from "crypto"

export class DatabaseMemory{
#mangas_livro = new Map()

list(search){
    return Array.from(this.#mangas_livro.entries()).map((mangas_livroArray) =>{
    // acessando primeira posição
        const id = mangas_livroArray[0]
        const data = mangas_livroArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(manga_livro => {
        if (search){
            return manga_livro.nome.includes(search)
        }
        return true
    })
}
create(manga_livro){
    const manga_livroId = randomUUID()
    this.#mangas_livro.set(manga_livroId, manga_livro)
}
update(id, manga_livro){
    this.#mangas_livro.set(id, manga_livro)
}
delete(id, manga_livro){
    this.#mangas_livro.delete(id, manga_livro)
}
}