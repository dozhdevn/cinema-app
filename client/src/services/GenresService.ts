import axios from 'axios'
import { Genre } from '../interfaces'
import { SERVER_URL } from './constants'

export class GenresService {
  static endpointGenres = `${SERVER_URL}/genres`
  static endpointGetGenre = `${this.endpointGenres}/by-slug`

  static getAllGenres = async (searchTerm = ''): Promise<Genre[]> => {
    const params = {
      searchTerm,
    }
    const { data } = await axios.get<Genre[]>(this.endpointGenres, { params })

    return data
  }

  static getGenre = async (slug: string): Promise<Genre> => {
    const { data } = await axios.get<Genre>(`${this.endpointGetGenre}/${slug}`)

    return data
  }
}
