import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { TypeRootStackParamList } from './interfaces'
import AuthScreen from '../screens/AuthScreen/AuthScreen'
import PrivateNavigation from './PrivateNavigation'
import { observer } from 'mobx-react-lite'
import { useStores } from '../stores'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const Navigation: React.FC = observer(() => {
  const {
    auth: { isAuth, isLoading, isAuthError },
  } = useStores()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#090909' },
        }}
      >
        {isAuth ? (
          <>
            <Stack.Screen name="Main" component={PrivateNavigation} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
})

export default Navigation
