import { action, makeObservable, observable, runInAction } from 'mobx'
import { Actor } from '../interfaces'
import { ActorsService } from '../services/ActorsService'
import { MoviesService } from '../services/MoviesService'
import MoviesStore from './MoviesStore'

export class ActorsStore {
  actor: Actor | null = null

  actors: Actor[] = []

  isLoading = false

  isError = false

  constructor() {
    makeObservable(this, {
      actor: observable,
      actors: observable,
      isLoading: observable,
      isError: observable,
      getActor: action,
      getActors: action,
      setLoading: action,
    })
  }

  getActor = async (slug: string) => {
    try {
      this.setLoading(true)
      const data = await ActorsService.getActor(slug)
      runInAction(() => {
        this.actor = data
        this.setLoading(false)
      })
      const movies = await MoviesService.getMoviesByActor(data._id)
      MoviesStore.setMoviesByActor(movies)
    } catch (e) {
      console.log('Что-то пошло не так', e)
      this.isError = true
      this.setLoading(false)
    }
  }

  getActors = async (searchTerm = '') => {
    try {
      this.isLoading = true
      const data = await ActorsService.getAllActors(searchTerm)
      runInAction(() => {
        this.actors = data
        this.isLoading = false
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

export default new ActorsStore()
