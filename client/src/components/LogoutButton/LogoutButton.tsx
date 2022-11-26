import { View, Text, Pressable } from 'react-native'
import React from 'react'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons'

interface LogoutButtonProps {
  onPress: () => void
}

const LogoutButton: React.FC<LogoutButtonProps> = ({onPress}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <AntDesign name='logout' color='#fff' size={18}/>
      <Text style={styles.text}>Logout</Text>
    </Pressable>
  )
}

export default LogoutButton