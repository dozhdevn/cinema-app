import { action, makeObservable, observable, runInAction } from 'mobx'
import { Genre } from '../interfaces'
import { GenresService } from '../services/GenresService'
import { MoviesService } from '../services/MoviesService'
import MoviesStore from './MoviesStore'

export class GenresStore {
  genre: Genre | null = null

  genres: Genre[] = []

  moviesByGenre: Genre[] = []

  isLoading = false

  isError = false

  constructor() {
    makeObservable(this, {
      genre: observable,
      genres: observable,
      moviesByGenre: observable,
      isLoading: observable,
      isError: observable,
      getGenre: action,
      getGenres: action,
      setLoading: action,
    })
  }

  getGenre = async (slug: string) => {
    try {
      this.setLoading(true)
      const data = await GenresService.getGenre(slug)
      runInAction(() => {
        this.genre = data
        this.setLoading(false)
      })
      const movies = await MoviesService.getMoviesByGenre([data._id])
      MoviesStore.setMoviesByGenre(movies)
    } catch (e) {
      console.log('Что-то пошло не так', e)
      this.isError = true
      this.setLoading(false)
    }
  }

  getGenres = async (searchTerm = '') => {
    try {
      this.isLoading = true
      const data = await GenresService.getAllGenres(searchTerm)
      runInAction(() => {
      this.isLoading = false
      this.genres = data
      })
    } catch (e) {
      console.log('Что-то пошло не так', e)
      this.isError = true
      this.isLoading = false
    }
  }

  setLoading = (val: boolean) => {
    this.isLoading = val
  }
}

export default new GenresStore()
