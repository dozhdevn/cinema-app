import { View, Text, Pressable } from 'react-native'
import React from 'react'
import styles from './styles'

interface InputGenerateSlugProps {
  generate: () => void
}

const InputGenerateSlug: React.FC<InputGenerateSlugProps> = ({ generate }) => {
  return (
    <Pressable style={styles.wrapper} onPress={generate}>
      <Text style={styles.text}>generate</Text>
    </Pressable>
  )
}

export default InputGenerateSlug
