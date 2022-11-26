import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'

interface AdminCreateButtonProps {
  onPress: () => void
}

const AdminCreateButton: React.FC<AdminCreateButtonProps> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
      style={{
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
      }}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        colors={['#DC3F41', '#a6282b']}
      >
        <Feather name="plus" size={24} color="#fff" />
      </LinearGradient>
    </Pressable>
  )
}

export default AdminCreateButton
