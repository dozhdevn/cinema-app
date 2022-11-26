import { Pressable } from 'react-native'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useStores } from '../../stores'
import { useTypedNavigation } from '../../hooks/useTypedNavigation'
import { ADMIN_ROUTES_NAMES } from '../../navigation/interfaces'
import styles from './styles'

const AdminButton: React.FC = observer(() => {
  const navigation = useTypedNavigation()

  const {
    user: { user },
  } = useStores()

  const goToAdminScreen = () => {
    navigation.navigate(ADMIN_ROUTES_NAMES.ADMIN)
  }

  if (!user?.isAdmin) return null

  return (
    <Pressable style={styles.button} onPress={goToAdminScreen}>
      <MaterialIcons name="admin-panel-settings" size={32} color="#5D5D5D" />
    </Pressable>
  )
})

export default AdminButton
