import axios from 'axios'
import { Actor } from '../interfaces'
import { SERVER_URL } from './constants'

export class ActorsService {
  static endpointActors = `${SERVER_URL}/actors`
  static endpointGetActor = `${this.endpointActors}/by-slug`

  static getActor = async (slug: string): Promise<Actor> => {
    const { data } = await axios.get<Actor>(`${this.endpointGetActor}/${slug}`)

    return data
  }

  static getAllActors = async (searchTerm = ''): Promise<Actor[]> => {
    const { data } = await axios.get<Actor[]>(this.endpointActors, {
      params: {
        searchTerm,
      },
    })

    return data
  }
}
