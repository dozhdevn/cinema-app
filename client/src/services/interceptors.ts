import axios from "axios";
import { AuthService } from "./AuthService";
import { SERVER_URL } from "./constants";

export const errorCatch = (error: any): string => {
	const message = error?.response?.data?.message

	return message
		? typeof error.response.data.message === 'object'
			? message[0]
			: message
		: error.message
}

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
		'Content-Type': 'application/json'
	}
})

instance.interceptors.request.use( async config => {
  const accessToken = await AuthService.getAccessToken()

  if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') await AuthService.deleteTokensStorage()
			}
		}

		throw error
	}
)

export default instance