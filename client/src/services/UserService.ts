import { AuthFormData, Movie, User } from '../interfaces'
import { SERVER_URL } from './constants'
import axios from './interceptors'

export class UserService {
  static endpointUsers = `${SERVER_URL}/users`

  static endpointUser = `${this.endpointUsers}/profile`

  static endPointFavoriteMovies = `${this.endpointUsers}/profile/favorites`

  static getUser = async (): Promise<User> => {
    const { data } = await axios.get<User>(this.endpointUser)

    return data
  }

  static getUsers = async (searchTerm = ''): Promise<User[]> => {
    const { data } = await axios.get<User[]>(this.endpointUsers, {
      params: { searchTerm },
    })

    return data
  }

  static updateUser = async (updateData: AuthFormData) => {
    await axios.put<User>(this.endpointUser, updateData)
  }

  static deleteUser = async (id: string) => {
    await axios.delete(`${this.endpointUsers}/${id}`)
  }

  static getFavoriteMovies = async () => {
    const { data } = await axios.get<Movie[]>(this.endPointFavoriteMovies)
    return data
  }

  static toggleUserFavoriteMovies = async (movieId: string) => {
    await axios.put(this.endPointFavoriteMovies, { movieId })
  }
}
