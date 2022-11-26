import { View, Text } from 'react-native'
import React from 'react'
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { Movie } from '../../../../interfaces'
import styles from './styles'
import Rating from '../../../../components/Rating'
import { Entypo } from '@expo/vector-icons'
import Genre from '../../../../components/Genre'
import { HEADER_HEIGHT, inputRange } from '../../constants'

interface MovieInfoProps {
  movie: Movie
  scrollY: SharedValue<number>
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie, scrollY }) => {
  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [-HEADER_HEIGHT, 0, HEADER_HEIGHT / 2],
      [1, 1, 0]
    )

    return { opacity }
  })

  return (
    <Animated.View style={[styles.movieWrapper, animatedStyles]}>
      <Text style={styles.title} numberOfLines={2}>
        {movie.title}
      </Text>

      <View style={styles.infoWrapper}>
        <Rating rating={movie.rating} size={18} />
        <Entypo
          name="dot-single"
          size={18}
          color="rgba(255,255,255,.5)"
          style={styles.dot}
        />
        <Text style={styles.text}>{movie.parameters.duration} min.</Text>
        <Entypo
          name="dot-single"
          size={18}
          color="rgba(255,255,255,.5)"
          style={styles.dot}
        />
        <Text style={styles.text}>{movie.parameters.year}</Text>
      </View>
      <View style={styles.genres}>
        {movie.genres.map((genre) => (
          <Genre key={genre._id} genre={genre} />
        ))}
      </View>
    </Animated.View>
  )
}

export default MovieInfo
