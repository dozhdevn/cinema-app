import { action, makeObservable, observable, runInAction } from 'mobx'
import { Actor, Genre, Movie, User } from '../interfaces'
import { EditActorForm } from '../screens/AdminScreen/screens/ActorEditScreen/ActorEditScreen'
import { EditGenreForm } from '../screens/AdminScreen/screens/GenreEditScreen/GenreEditScreen'
import { EditMovieForm } from '../screens/AdminScreen/screens/MovieEditScreen/MovieEditScreen'
import { EditUserForm } from '../screens/AdminScreen/screens/UserEditScreen/UserEditScreen'
import { AdminService } from '../services/AdminService'

export class AdminStore {
  user: User | null = null

  genre: Genre | null = null

  actor: Actor | null = null

  movie: Movie | null = null

  isLoading = false

  isError = false

  constructor() {
    makeObservable(this, {
      user: observable,
      genre: observable,
      actor: observable,
      movie: observable,
      isLoading: observable,
      isError: observable,
      getUserById: action,
      editUser: action,
      getGenreById: action,
      editGenre: action,
      getActorById: action,
      editActor: action,
      getMovieById: action,
      editMovie: action,
      resetEntities: action,
    })
  }

  getUserById = async (id: string) => {
    try {
      this.isLoading = true
      const data = await AdminService.getUserById(id)
      runInAction(() => {
        this.user = data
        this.isLoading = false
      })
    } catch (e) {
      this.isError = true
      this.isLoading = false
      console.log('Что-то пошло не так', e)
    }
  }

  editUser = async (id: string, data: EditUserForm) => {
    try {
      await AdminService.editUser(id, data)
      await this.getUserById(id)
    } catch (e) {
      this.isError = true
      this.isLoading = false
      console.log('Что-то пошло не так', e)
    }
  }

  getGenreById = async (id: string) => {
    try {
      this.isLoading = true
      const data = await AdminService.getGenreById(id)
      runInAction(() => {
        this.genre = data
        this.isLoading = false
      })
    } catch (e) {
      this.isError = true
      this.isLoading = false
      console.log('Что-то пошло не так', e)
    }
  }

  editGenre = async (id: string, data: EditGenreForm) => {
    try {
      await AdminService.editGenre(id, data)
      await this.getGenreById(id)
    } catch (e) {
      this.isError = true
      this.isLoading = false
      console.log('Что-то пошло не так', e)
    }
  }

  getActorById = async (id: string) => {
    try {
      this.isLoading = true
      const data = await AdminService.getActorById(id)
      runInAction(() => {
        this.actor = data
        this.isLoading = false
      })
    } catch (e) {
      this.isError = true
      this.isLoading = false
      console.log('Что-то пошло не так', e)
    }
  }

  editActor = async (id: string, data: EditActorForm) => {
    try {
      this.isLoading = true
      await AdminService.editActor(id, data)
      await this.getActorById(id)
    } catch (e) {
      this.isError = true
      this.isLoading = false
      console.log('Что-то пошло не так', e)
    }
  }

  getMovieById = async (id: string) => {
    try {
      this.isLoading = true
      const data = await AdminService.getMovieById(id)
      runInAction(() => {
        this.movie = data
        this.isLoading = false
      })
    } catch (e) {
      this.isError = true
      this.isLoading = false
      console.log('Что-то пошло не так', e)
    }
  }

  editMovie = async (id: string, data: EditMovieForm) => {
    try {
      this.isLoading = true
      await AdminService.editMovie(id, data)
      await this.getMovieById(id)
    } catch (e) {
      this.isError = true
      this.isLoading = false
      console.log('Что-то пошло не так', e)
    }
  }

  resetEntities = () => {
    this.user = null
    this.genre = null
    this.movie = null
    this.actor = null
  }
}

export default new AdminStore()
