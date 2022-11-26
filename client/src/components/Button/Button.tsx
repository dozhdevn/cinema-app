import { View, Text, Pressable, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './styles'
import { TypeFeatherIconNames } from '../../interfaces'
import { Feather } from '@expo/vector-icons'

interface ButtonProps {
  style?: StyleProp<TextStyle>
  icon?: TypeFeatherIconNames
  disabled?: boolean
  onPress: () => void
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  style,
  icon,
  disabled = false,
  onPress,
  children,
}) => {
  return (
    <Pressable
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <LinearGradient
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={[styles.gradient, { flexDirection: !!icon ? 'row' : 'column' }]}
        colors={['#DC3F41', '#a6282b']}
      >
        {icon && <Feather name={icon} color="#ffffff" size={18} />}
        <Text style={[styles.text, { marginLeft: !!icon ? 8 : 0 }]}>
          {children}
        </Text>
      </LinearGradient>
    </Pressable>
  )
}

export default Button
