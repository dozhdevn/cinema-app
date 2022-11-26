import { View, Platform } from 'react-native'
import React, { useEffect } from 'react'
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { observer } from 'mobx-react-lite'
import Layout from '../../components/Layout'
import { useStores } from '../../stores'
import { EMPTY_ITEM_SIZE, ITEM_SIZE } from '../../constants/Carousel'
import CarouselItem from './components/CarouselItem'
import { Movie } from '../../interfaces'
import { useIsFocused } from '@react-navigation/native'

const HomeScreen = observer(() => {
  const isFocused = useIsFocused()

  const {
    user: { getUserFavoriteMovies },
    movies: { movies, getMovies },
  } = useStores()
  useEffect(() => {
    if (isFocused) {
      getUserFavoriteMovies()
      getMovies()
    }
  }, [isFocused])

  const scrollViewRef = useAnimatedRef<Animated.FlatList<Movie>>()

  const styleValue = useSharedValue(0)

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      styleValue.value = event.contentOffset.x
    },
  })

  return (
    <Layout style={{flex: 1}} viewAdminButton>
      <Animated.FlatList
        contentContainerStyle={{
          alignItems: 'center',
        }}
        ref={scrollViewRef}
        onScroll={onScroll}
        data={[{ _id: 'first' } as Movie, ...movies, { _id: 'last' } as Movie]}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={ITEM_SIZE}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderItem={({ item: movie, index }) => {
          if (!movie.slug) {
            return (
              <View
                style={{
                  width: EMPTY_ITEM_SIZE,
                }}
                key={index}
              />
            )
          }
          return (
            <CarouselItem movie={movie} index={index} styleValue={styleValue} />
          )
        }}
      />
    </Layout>
  )
})

export default HomeScreen
