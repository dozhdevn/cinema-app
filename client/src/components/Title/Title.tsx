import { Text, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import styles from './styles'

interface TitleProps {
  title: string
  style?: StyleProp<TextStyle>
}

const Title: React.FC<TitleProps> = ({ title, style }) => {
  return (
    <Text style={[styles.title, style]} numberOfLines={2}>
      {title}
    </Text>
  )
}

export default Title
