import { action, makeObservable, observable, runInAction } from 'mobx'
import { AuthFormData, Movie, User } from '../interfaces'
import { UserService } from '../services/UserService'

export class UserStore {
  user: User | null = null

  users: User[] = []

  favoriteMovies: Movie[] = []

  isSuccess = false

  isLoading = false

  isLoadingFavorites = false

  isError = false

  constructor() {
    makeObservable(this, {
      user: observable,
      users: observable,
      favoriteMovies: observable,
      isLoading: observable,
      isError: observable,
      isSuccess: observable,
      getUser: action,
      getUsers: action,
      getUserFavoriteMovies: action,
      setError: action,
      setUser: action,
    })
  }

  getUser = async () => {
    try {
      this.isLoading = true
      const data = await UserService.getUser()
      this.setUser(data)
    } catch (e) {
      this.setError()
      console.log('Что-то пошло не так', e)
    }
  }


  getUsers = async (searchTerm = '') => {
    try {
      this.isLoading = true
      const data = await UserService.getUsers(searchTerm)
      runInAction(() => {
        this.users = data
        this.isLoading = false
      })
    } catch (e) {
      console.log('Что-то пошло не так', e)
      this.isLoading = false
    }
  }

  updateUser = async (data: AuthFormData) => {
    try {
      await UserService.updateUser(data)
      await this.getUser()
      runInAction(() => {
        this.isSuccess = true
      })
    } catch (e) {
      this.setError()
      console.log('Что-то пошло не так', e)
    }
  }

  deleteUser = async (id: string) => {
    try {
      await UserService.deleteUser(id)
      await this.getUsers()
    } catch (e) {
      console.log('Что-то пошло не так', e)
    }
  }

  getUserFavoriteMovies = async () => {
    try {
      this.isLoadingFavorites = true
      const data = await UserService.getFavoriteMovies()
      runInAction(() => {
        this.favoriteMovies = data
        this.isLoadingFavorites = false
      })
    } catch (e) {
      this.isLoadingFavorites = false
      console.log('Не удалось получить избранные фильмы', e)
    }
  }

  toggleUserFavoriteMovies = async (movieId: string) => {
    try {
      await UserService.toggleUserFavoriteMovies(movieId)
    } catch (e) {
      console.log('Ошибка при добавлении/удалении избранного фильма')
    }
  }

  setUser = (data: User) => {
    this.user = data
    this.isLoading = false
    this.isSuccess = false
  }

  setError = () => {
    this.isError = true
    this.isLoading = false
    this.isSuccess = false
  }

  setLoading = (val: boolean) => {
    this.isLoading = val
  }
}

export default new UserStore()
