import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BlurButton from '../../../../components/BlurButton'
import Rating from '../../../../components/Rating'
import FavoriteButton from '../../../../components/FavoriteButton'
import { Movie } from '../../../../interfaces'
import styles from './styles'
import { useTypedNavigation } from '../../../../hooks/useTypedNavigation'
import { inputRange } from '../../constants'

interface MovieHeaderProps {
  movie: Movie
  scrollY: SharedValue<number>
}
const MovieHeader: React.FC<MovieHeaderProps> = ({ movie, scrollY }) => {
  const { goBack } = useTypedNavigation()
  const { top } = useSafeAreaInsets()

  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, inputRange, [0, 0, 2])

    return { opacity }
  })

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: top + 6,
        },
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: '#0D0404' },
          animatedStyles,
        ]}
      />
      <BlurButton icon="chevron-left" iconSize={23} onPress={goBack} />
      <Animated.View
        style={[{ alignItems: 'center', width: '66%' }, animatedStyles]}
      >
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <Rating rating={movie.rating} />
      </Animated.View>
      <FavoriteButton movieId={movie._id} />
    </View>
  )
}

export default MovieHeader
