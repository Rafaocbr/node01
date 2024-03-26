import { randomUUID } from "node:crypto"

// UUID: Unique Universal ID

export class DatabaseMemory {
  #videos = new Map ()

// SET é como se fosse um array, porém não aceita dados duplicados;
// MAP é como se fosse um objeto, porém 

list(search) {

  return Array.from(this.#videos.entries())
  .map((videoArray) => {
    const id = videoArray[0]
    const data = videoArray[1]

    return {
      id, 
      ...data,
    }
  })

  .filter(video => {
    if(search) {
      return video.title.includes(search)
    }

    return true
  })
}

  create(video) {
    const videoId = randomUUID()

    this.#videos.set(videoId, video)
  }

  update(id, video) {
    this.#videos.set(id, video)
  }

  delete(id) {
    this.#videos.delete(id)
  }
}