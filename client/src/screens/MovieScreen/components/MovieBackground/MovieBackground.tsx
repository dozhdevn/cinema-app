import { Image, StyleSheet } from 'react-native'
import React from 'react'
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { getMediaSource } from '../../../../utils/getMediaSource'
import { Movie } from '../../../../interfaces'
import { HEADER_HEIGHT, inputRange } from '../../constants'

interface MovieBackgroundProps {
  movie: Movie
  scrollY: SharedValue<number>
}

const MovieBackground: React.FC<MovieBackgroundProps> = ({
  movie,
  scrollY,
}) => {
  const { top } = useSafeAreaInsets()

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, inputRange, [2, 1, 1])

    const translateY = interpolate(scrollY.value, inputRange, [
      -HEADER_HEIGHT / 2,
      0,
      HEADER_HEIGHT * 0.01,
    ])

    return { transform: [{ scale }, { translateY }] }
  })

  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          height: HEADER_HEIGHT * 1.76,
          marginTop: -top,
        },
        animatedStyles,
      ]}
    >
      <Image
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        source={getMediaSource(movie.poster)}
      />
      <LinearGradient
        style={{ ...StyleSheet.absoluteFillObject, top: -HEADER_HEIGHT * 1.6 }}
        start={[0, 0.3]}
        end={[0, 0.8]}
        colors={['transparent', 'rgba(0, 0, 0, 0.2)', '#090909']}
      />
    </Animated.View>
  )
}

export default MovieBackground
