import { View, Text, Pressable, PressableProps, ViewStyle } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { Feather } from '@expo/vector-icons'
import { TypeFeatherIconNames } from '../../interfaces'

interface BlurButtonProps extends PressableProps {
  icon?: TypeFeatherIconNames
  iconSize?: number
  color?: string
  isSmall?: boolean
  style?: ViewStyle
  children?: React.ReactNode
}

const BlurButton: React.FC<BlurButtonProps> = ({
  icon,
  iconSize = 21,
  color = '#fff',
  isSmall = false,
  children,
  style,
  ...rest
}) => {
  return (
    <Pressable {...rest}>
      <BlurView
        intensity={22}
        tint="light"
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            width: isSmall ? 32 : 48,
            height: isSmall ? 32 : 48,
            borderRadius: isSmall ? 8 : 16,
          },
          style,
        ]}
      >
        {children ? (
          children
        ) : (
          <Feather name={icon} size={iconSize} color={color} />
        )}
      </BlurView>
    </Pressable>
  )
}

export default BlurButton
