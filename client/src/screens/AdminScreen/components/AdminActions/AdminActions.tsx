import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from './styles'

interface AdminActionsProps {
  editNavigate: () => void
  removeHandler: () => void
}

const AdminActions: React.FC<AdminActionsProps> = ({
  editNavigate,
  removeHandler,
}) => {
  return (
    <View style={styles.actions}>
      <Pressable onPress={editNavigate}>
        <MaterialCommunityIcons
          name={'note-edit-outline'}
          color="#1DA64F"
          size={20}
        />
      </Pressable>

      <Pressable onPress={removeHandler}>
        <MaterialCommunityIcons name={'close'} color="#AB2D2F" size={20} />
      </Pressable>
    </View>
  )
}

export default AdminActions
