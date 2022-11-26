import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons'

interface RatingProps {
  size?: number
  rating: number
}

const Rating: React.FC<RatingProps> = ({ rating, size = 20 }) => {
  return (
    <View style={styles.rating}>
      <AntDesign name="star" color="yellow" size={size} />

      <Text
        style={[
          styles.text,
          {
            fontSize: size === 20 ? 18 : 16,
          },
        ]}
      >
        {rating.toFixed(1)}
      </Text>
    </View>
  )
}

export default Rating
