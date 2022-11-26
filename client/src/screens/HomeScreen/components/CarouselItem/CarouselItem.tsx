import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { observer } from 'mobx-react-lite'
import { ITEM_SIZE, SPACING } from '../../../../constants/Carousel'
import { getMediaSource } from '../../../../utils/getMediaSource'
import { Movie } from '../../../../interfaces'
import Rating from '../../../../components/Rating'
import styles from './styles'
import Genre from '../../../../components/Genre'
import { useTypedNavigation } from '../../../../hooks/useTypedNavigation'
import { TABS_NAMES } from '../../../../navigation/interfaces'
import Animated, { SharedValue } from 'react-native-reanimated'
import { useCarouselItemAnimation } from './useCarouselItemAnimation'
import FavoriteButton from '../../../../components/FavoriteButton'

interface CarouselItemProps {
  movie: Movie
  index: number
  styleValue: SharedValue<number>
}

const CarouselItem: React.FC<CarouselItemProps> = observer(
  ({ movie, index, styleValue }) => {
    const navigation = useTypedNavigation()

    const goToMovieScreen = () => {
      navigation.navigate(TABS_NAMES.MOVIE, { slug: movie.slug })
    }

    const { style } = useCarouselItemAnimation(index, styleValue)

    return (
      <View style={{ width: ITEM_SIZE }}>
        <Animated.View
          style={[
            {
              padding: SPACING,
            },
            style,
          ]}
        >
          <Pressable style={styles.imageWrapper} onPress={goToMovieScreen}>
            <View style={styles.favoriteButton}>
              <FavoriteButton movieId={movie._id} />
            </View>
            <Image
              style={[
                {
                  height: ITEM_SIZE * 1.3,
                },
                styles.image,
              ]}
              source={getMediaSource(movie.poster)}
            />
          </Pressable>

          <View style={styles.bottomContent}>
            <Rating rating={movie.rating} />

            <Pressable onPress={goToMovieScreen}>
              <Text numberOfLines={1} style={styles.title}>
                {movie.title}
              </Text>
            </Pressable>

            <View style={styles.genreList}>
              {movie.genres.map((genre) => (
                <Genre key={genre._id} genre={genre} />
              ))}
            </View>
          </View>
        </Animated.View>
      </View>
    )
  }
)

export default CarouselItem
