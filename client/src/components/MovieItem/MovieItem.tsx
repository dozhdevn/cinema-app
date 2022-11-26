import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import React, { useState } from 'react'
import Animated from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import { observer } from 'mobx-react-lite'
import { StackActions } from '@react-navigation/native'

import Rating from '../Rating'
import { TABS_NAMES } from '../../navigation/interfaces'
import { Movie } from '../../interfaces'
import { getMediaSource } from '../../utils/getMediaSource'
import { useTypedRoute } from '../../hooks/useTypedRoutes'
import FavoriteButton from '../FavoriteButton'
import { useTypedNavigation } from '../../hooks/useTypedNavigation'
import { useMovieItemAnimation } from './useMovieItemAnimation'
import styles from './styles'

const ReanimatedPressable = Animated.createAnimatedComponent(Pressable)

interface MovieItemProps {
  index: number
  movie: Movie
  style?: ViewStyle
}

const MovieItem: React.FC<MovieItemProps> = ({ index, movie, style }) => {
  const navigation = useTypedNavigation()
  const route = useTypedRoute()

  const isFavoritePage = route.name === TABS_NAMES.FAVORITES

  const isMoviePage = route.name === TABS_NAMES.MOVIE

  const { styleAnimation } = useMovieItemAnimation(index)

  const goToMovieScreen = () => {
    // if (isMoviePage) {
    //   navigation.push(TABS_NAMES.MOVIE, { slug: movie.slug })
    //   return
    // }
    navigation.navigate(TABS_NAMES.MOVIE, { slug: movie.slug })
  }

  return (
    <ReanimatedPressable
      style={[styleAnimation, styles.movie, style]}
      onPress={goToMovieScreen}
    >
      <View style={styles.favoriteButtonWrapper}>
        {isFavoritePage && <FavoriteButton isSmall movieId={movie._id} />}
      </View>

      <Image
        resizeMode="cover"
        source={getMediaSource(movie.poster)}
        style={StyleSheet.absoluteFill}
      />

      <BlurView style={styles.blur} intensity={25}>
        <Rating rating={movie.rating} size={16} />
        <Text numberOfLines={1} style={styles.title}>
          {movie.title}
        </Text>
      </BlurView>
    </ReanimatedPressable>
  )
}

export default observer(MovieItem)
