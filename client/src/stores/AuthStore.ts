import { action, makeObservable, observable, runInAction } from 'mobx'
import { AuthFormData, User } from '../interfaces'
import { AuthService } from '../services/AuthService'

export class AuthStore {
  isAuth = false

  isLoading = false

  isAuthError = false

  constructor() {
    makeObservable(this, {
      login: action,
      register: action,
      logOut: action,
      setError: action,
      setAuth: action,
      isAuth: observable,
      isAuthError: observable,
      isLoading: observable,
    })
  }

  login = async (data: AuthFormData) => {
    try {
      this.isLoading = true
      await AuthService.login(data)
      runInAction(() => {
        this.isAuth = true
        this.isLoading = false
      })
    } catch (error) {
      this.setError(true)
      console.log(error)
    }
  }

  register = async (data: AuthFormData) => {
    try {
      this.isLoading = true
      await AuthService.register(data)
      runInAction(() => {
        this.isAuth = true
        this.isLoading = false
      })
    } catch (error) {
      this.setError(true)
      console.log(error)
    }
  }
  logOut = async () => {
    await AuthService.logOut()
    runInAction(() => {
      this.isAuth = false
    })
  }

  setError = (value: boolean) => {
    this.isLoading = false
    this.isAuthError = value
  }

  setAuth = (value: boolean) => {
    this.isAuth = value
  }
}

export default new AuthStore()
