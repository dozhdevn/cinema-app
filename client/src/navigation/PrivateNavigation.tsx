import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { userRoutes } from './routes'
import BottomsTabs from '../components/BottomsTabs'
import { TypeRootStackParamList } from './interfaces'
import { BACKGROUND_COLOR } from '../constants/Colors'

export interface TabBarIconParams {
  focused: boolean
  color: string
  size: number
}

const Tab = createBottomTabNavigator<TypeRootStackParamList>()

const PrivateNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: BACKGROUND_COLOR }}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { backgroundColor: BACKGROUND_COLOR },
        tabBarIcon: ({ color, size }: TabBarIconParams) => (
          <BottomsTabs routeName={route.name} color={color} size={size} />
        ),
        tabBarActiveTintColor: '#BF3335',
        tabBarInactiveTintColor: '#626262',
      })}
    >
      {userRoutes.map((route) =>
        route.isMain ? (
          <Tab.Screen key={route.name} {...route} />
        ) : (
          <Tab.Screen
            key={route.name}
            options={{ tabBarButton: () => null }}
            {...route}
          />
        )
      )}
    </Tab.Navigator>
  )
}

export default PrivateNavigation
