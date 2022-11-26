import { StatusBar } from 'expo-status-bar'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import Toast from 'react-native-toast-message'

import Navigation from './src/navigation/Navigation'
import { AuthService } from './src/services/AuthService'
import { useStores } from './src/stores'

SplashScreen.preventAutoHideAsync()

const App: React.FC = observer(() => {
  const {
    auth: { setAuth },
    user: { getUser },
  } = useStores()

  useEffect(() => {
    ;(async () => {
      try {
        const accessToken = await AuthService.getAccessToken()
        if (accessToken) {
          setAuth(true)
          await new Promise((resolve) => setTimeout(resolve, 2000))
          getUser()
        }
      } catch (e) {
        console.warn(e)
      } finally {
        await SplashScreen.hideAsync()
      }
    })()
  }, [])

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <Navigation />
      <StatusBar style="light" />
      <Toast />
    </SafeAreaProvider>
  )
})

export default App
