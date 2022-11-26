import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BACKGROUND_COLOR } from '../constants/Colors'
import adminRoutes from './adminRoutes'
import { TypeRootStackParamList } from './interfaces'

export const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const AdminNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: BACKGROUND_COLOR },
      }}
    >
      {adminRoutes.map((route) => (
        <Stack.Screen key={route.name} {...route} />
      ))}
    </Stack.Navigator>
  )
}

export default AdminNavigation
