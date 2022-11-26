import { View, Text } from 'react-native'
import React from 'react'
import { TABS_NAMES } from '../../navigation/interfaces'
import { Feather } from '@expo/vector-icons'

interface BottomsTabs {
  routeName: string
  color: string
  size: number
}

const BottomsTabs: React.FC<BottomsTabs> = ({ routeName, size, color }) => {
  switch (routeName) {
    case TABS_NAMES.HOME:
      return <Feather size={size} name="home" color={color} />
    case TABS_NAMES.TRENDING:
      return <Feather size={size} name="bar-chart" color={color} />
    case TABS_NAMES.SEARCH:
      return <Feather size={size} name="search" color={color} />
    case TABS_NAMES.FAVORITES:
      return <Feather size={size} name="heart" color={color} />
    case TABS_NAMES.PROFILE:
      return <Feather size={size} name="user" color={color} />
    default:
      return null
  }
}

export default BottomsTabs
