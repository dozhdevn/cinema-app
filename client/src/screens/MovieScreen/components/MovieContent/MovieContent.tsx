import { View } from 'react-native'
import React, { useEffect } from 'react'
import MovieInfo from '../MovieInfo'
import { observer } from 'mobx-react-lite'
import { Movie } from '../../../../interfaces'
import ActorsCarousel from '../ActorsCarousel'
import RelatedMovies from '../RelatedMovies'
import { HEADER_HEIGHT } from '../../constants'
import Animated, {
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
} from 'react-native-reanimated'
import Button from '../../../../components/Button'
import VideoPlayer from '../VideoPlayer'

interface MovieContentProps {
  movie: Movie
  scrollY: SharedValue<number>
  isFocused?: boolean
}

const MovieContent: React.FC<MovieContentProps> = observer(
  ({ movie, scrollY, isFocused }) => {
    const ref = useAnimatedRef<Animated.ScrollView>()

    const onScroll = useAnimatedScrollHandler({
      onScroll: (event) => {
        scrollY.value = event.contentOffset.y
      },
    })

    useEffect(() => {
      ref.current?.scrollTo({ y: 0 })
    }, [isFocused])

    return (
      <Animated.ScrollView
        ref={ref}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
      >
        <MovieInfo movie={movie} scrollY={scrollY} />

        <View style={{ backgroundColor: 'transparent', paddingHorizontal: 24 }}>
          <VideoPlayer video={movie.videoUrl}/>

          <ActorsCarousel actors={movie.actors} />

          <RelatedMovies
            genreIds={movie.genres.map(({ _id }) => _id)}
            currentMovieId={movie._id}
          />
        </View>
      </Animated.ScrollView>
    )
  }
)

export default MovieContent
