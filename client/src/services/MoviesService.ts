import axios from 'axios'
import { Movie } from '../interfaces'
import { SERVER_URL } from './constants'

export class MoviesService {
  static endpointMovies = `${SERVER_URL}/movies`
  static endpointMoviesByGenre = `${this.endpointMovies}/by-genres`
  static endpointMovieBySlug = `${this.endpointMovies}/by-slug`
  static endpointMoviesByActor = `${this.endpointMovies}/by-actor`

  static getAllMovies = async (searchTerm = ''): Promise<Movie[]> => {
    const params = {
      searchTerm,
    }
    const { data } = await axios.get<Movie[]>(this.endpointMovies, { params })

    return data
  }

  static getPopularMovies = async (): Promise<Movie[]> => {
    const { data } = await axios.get<Movie[]>(
      `${this.endpointMovies}/most-popular`
    )

    return data
  }

  static getMoviesByGenre = async (genreIds: string[]): Promise<Movie[]> => {
    const { data } = await axios.post<Movie[]>(this.endpointMoviesByGenre, {
      genreIds,
    })

    return data
  }

  static getMovieBySlug = async (slug: string): Promise<Movie> => {
    const { data } = await axios.get<Movie>(
      `${this.endpointMovieBySlug}/${slug}`
    )

    return data
  }

  static getMoviesByActor = async (actorId: string): Promise<Movie[]> => {
    const { data } = await axios.get<Movie[]>(
      `${this.endpointMoviesByActor}/${actorId}`
    )

    return data
  }

  static updateCountOpened = async (slug: string) => {
    await axios.put(`${this.endpointMovies}/update-count-opened`, { slug })
  }
}
