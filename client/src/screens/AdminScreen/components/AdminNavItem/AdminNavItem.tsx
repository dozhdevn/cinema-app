import React from 'react'
import { Text, Pressable } from 'react-native'
import { TypeMaterialIconNames } from '../../../../interfaces'
import { TypeRootStackParamList } from '../../../../navigation/interfaces'
import { MaterialIcons } from '@expo/vector-icons'
import { useTypedRoute } from '../../../../hooks/useTypedRoutes'
import { useTypedNavigation } from '../../../../hooks/useTypedNavigation'
import styles from './styles'

interface AdminNavItemProps {
  icon: TypeMaterialIconNames
  title: string
  routeName: keyof TypeRootStackParamList
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({
  icon,
  title,
  routeName,
}) => {
  const navigate = useTypedNavigation()
  const route = useTypedRoute()

  const isActive = route.name === routeName

  const onPressItem = () => {
    // @ts-ignore
    navigate.navigate(routeName)
  }

  return (
    <Pressable style={styles.navItem} onPress={onPressItem}>
      <MaterialIcons
        name={icon}
        size={18}
        color={isActive ? '#D73033' : '#666'}
      />
      <Text style={[styles.text, { color: isActive ? '#D73033' : '#D1D1D1' }]}>
        {title}
      </Text>
    </Pressable>
  )
}

export default AdminNavItem
