import axios from './interceptors'
import { Actor, Genre, User } from '../interfaces'
import { SERVER_URL } from './constants'
import { EditUserForm } from '../screens/AdminScreen/screens/UserEditScreen/UserEditScreen'
import { EditGenreForm } from '../screens/AdminScreen/screens/GenreEditScreen/GenreEditScreen'
import { EditActorForm } from '../screens/AdminScreen/screens/ActorEditScreen/ActorEditScreen'
import { EditMovieForm } from '../screens/AdminScreen/screens/MovieEditScreen/MovieEditScreen'

export class AdminService {
  static endpointUsers = `${SERVER_URL}/users`

  static endpointGenres = `${SERVER_URL}/genres`

  static endpointActors = `${SERVER_URL}/actors`

  static endpointMovies = `${SERVER_URL}/movies`

  static getUsersCount = async (): Promise<number> => {
    const { data } = await axios.get<number>(`${this.endpointUsers}/count`)

    return data
  }

  static getUserById = async (id: string): Promise<User> => {
    const { data } = await axios.get<User>(`${this.endpointUsers}/${id}`)

    return data
  }

  static editUser = async (id: string, data: EditUserForm) => {
    await axios.put(`${this.endpointUsers}/${id}`)
  }

  static getGenreById = async (id: string): Promise<Genre> => {
    const { data } = await axios.get<Genre>(`${this.endpointGenres}/${id}`)

    return data
  }

  static editGenre = async (id: string, data: EditGenreForm) => {
    await axios.put(`${this.endpointGenres}/${id}`, data)
  }

  static getActorById = async (id: string): Promise<Actor> => {
    const { data } = await axios.get<Actor>(`${this.endpointActors}/${id}`)

    return data
  }

  static editActor = async (id: string, data: EditActorForm) => {
    await axios.put(`${this.endpointActors}/${id}`, data)
  }

  static getMovieById = async (id: string) => {
    const { data } = await axios.get(`${this.endpointMovies}/${id}`)

    return data
  }

  static editMovie = async (id: string, data: EditMovieForm) => {
    await axios.put(`${this.endpointMovies}/${id}`, data)
  }
}
