import { action, makeObservable, observable, runInAction } from 'mobx'
import { Movie } from '../interfaces'
import { MoviesService } from '../services/MoviesService'

export class MoviesStore {
  movies: Movie[] = []

  popularMovies: Movie[] = []

  moviesByGenre: Movie[] = []

  moviesByActor: Movie[] = []

  movieBySlug: Movie | null = null

  isLoadingMoviesByActor = false

  isLoadingPopular = false

  isLoading = false

  isError = false

  constructor() {
    makeObservable(this, {
      movies: observable,
      popularMovies: observable,
      moviesByGenre: observable,
      moviesByActor: observable,
      movieBySlug: observable,
      isLoading: observable,
      isLoadingPopular: observable,
      isLoadingMoviesByActor: observable,
      isError: observable,
      getMovies: action,
      getPopularMovies: action,
      getMoviesByGenre: action,
      getMoviesByActor: action,
      getMovieBySlug: action,
      setMoviesByGenre: action,
      setMoviesByActor: action,
    })
  }

  getMovies = async (searchTerm = '') => {
    try {
      this.isLoading = true
      const data = await MoviesService.getAllMovies(searchTerm)
      runInAction(() => {
        this.movies = data.slice(0, 10)
        this.isLoading = false
      })
    } catch (e) {
      console.log('Что-то пошло не так', e)
      this.isError = false
      this.isLoading = false
    }
  }

  getPopularMovies = async (limit?: number) => {
    try {
      this.isLoadingPopular = true
      const data = await MoviesService.getPopularMovies()
      runInAction(() => {
        this.popularMovies = limit ? data.slice(0, limit) : data
        this.isLoadingPopular = false
      })
    } catch (e) {
      console.log('Что-то пошло не так', e)
      this.isError = true
      this.isLoadingPopular = false
    }
  }

  getMoviesByGenre = async (genreIds: string[]) => {
    try {
      this.isLoading = true
      const data = await MoviesService.getMoviesByGenre(genreIds)
      this.setMoviesByGenre(data)
    } catch (e) {
      console.log('Что-то пошло не так', e)
      this.isError = true
      this.isLoading = false
    }
  }

  getMoviesByActor = async (movieId: string) => {
    try {
      this.isLoadingMoviesByActor = true
      const data = await MoviesService.getMoviesByActor(movieId)
      runInAction(() => {
        this.moviesByActor = data
        this.isLoadingMoviesByActor = false
      })
    } catch (e) {
      console.log('Что-то пошло не так', e)
      this.isLoadingMoviesByActor = false
    }
  }

  getMovieBySlug = async (slug: string) => {
    try {
      this.isLoading = true
      const data = await MoviesService.getMovieBySlug(slug)
      runInAction(() => {
        this.movieBySlug = data
        this.isLoading = false
      })
      await MoviesService.updateCountOpened(slug)
    } catch (e) {
      console.log('Что-то пошло не так', e)
      this.isError = true
      this.isLoading = false
    }
  }

  setMoviesByGenre = (movies: Movie[]) => {
    this.moviesByGenre = movies
    this.isLoading = false
  }

  setMoviesByActor = (movies: Movie[]) => {
    this.moviesByActor = movies
    this.isLoading = false
  }
}

export default new MoviesStore()
