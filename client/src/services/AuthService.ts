import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { AuthFormData, AuthResponse, Tokens } from '../interfaces'
import { EnumSecureStore, SERVER_URL } from './constants'

export class AuthService {
  static endpointLogin = `${SERVER_URL}/auth/login`
  static endpointRegister = `${SERVER_URL}/auth/register`
  static endpointRefreshToken = `${SERVER_URL}/auth/login/access-token`

  static login = async (loginData: AuthFormData): Promise<AuthResponse> => {
    const { data } = await axios.post<AuthResponse>(
      this.endpointLogin,
      loginData
    )
    await this.saveToSecureStore(data)
    return data
  }

  static register = async (loginData: AuthFormData): Promise<AuthResponse> => {
    const { data } = await axios.post<AuthResponse>(
      this.endpointRegister,
      loginData
    )
    await this.saveToSecureStore(data)
    return data
  }

  static getAccessToken = async () => {
    const accessToken = SecureStore.getItemAsync(EnumSecureStore.ACCESS_TOKEN)

    return accessToken || null
  }

  static getNewTokens = async () => {
    console.log('new token')
    const refreshToken = await SecureStore.getItemAsync(
      EnumSecureStore.REFRESH_TOKEN
    )

    const { data } = await axios.post<AuthResponse>(this.endpointRefreshToken, {
      refreshToken,
    })

    if (data.accessToken) {
      await this.saveToSecureStore(data)
    }

    return data
  }

  static getUserFromStorage = async () => {
    try {
      return JSON.parse(
        (await SecureStore.getItemAsync(EnumSecureStore.USER)) || '{}'
      )
    } catch (e) {
      return null
    }
  }

  static saveTokensStorage = async (data: Tokens) => {
    await SecureStore.setItemAsync(
      EnumSecureStore.ACCESS_TOKEN,
      data.accessToken
    )
    await SecureStore.setItemAsync(
      EnumSecureStore.REFRESH_TOKEN,
      data.refreshToken
    )
  }

  static saveToSecureStore = async (data: AuthResponse) => {
    await this.saveTokensStorage(data)
    try {
      await SecureStore.setItemAsync(
        EnumSecureStore.USER,
        JSON.stringify(data.user)
      )
    } catch (error) {}
  }

  static deleteTokensStorage = async () => {
    await SecureStore.deleteItemAsync(EnumSecureStore.ACCESS_TOKEN)
    await SecureStore.deleteItemAsync(EnumSecureStore.REFRESH_TOKEN)
  }

  static logOut = async () => {
    await this.deleteTokensStorage()
    await SecureStore.deleteItemAsync(EnumSecureStore.USER)
  }
}
