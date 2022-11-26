import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useTypedRoute } from '../../hooks/useTypedRoutes'
import { useIsFocused } from '@react-navigation/native'
import { useStores } from '../../stores'
import MovieHeader from './components/MovieHeader'
import MovieBackground from './components/MovieBackground'
import MovieContent from './components/MovieContent'
import { useSharedValue } from 'react-native-reanimated'
import { TABS_NAMES } from '../../navigation/interfaces'

const MovieScreen: React.FC = observer(() => {
  const isFocused = useIsFocused()
  const { params } = useTypedRoute<TABS_NAMES.MOVIE>()
  const {
    movies: { getMovieBySlug, movieBySlug: movie },
  } = useStores()

  useEffect(() => {
    if (isFocused) {
      getMovieBySlug(params?.slug || '')
    }
  }, [isFocused, params?.slug])

  const scrollY = useSharedValue(0)

  if (!movie) return null

  return (
    <>
      <MovieHeader movie={movie} scrollY={scrollY} />
      <MovieBackground movie={movie} scrollY={scrollY} />
      <MovieContent movie={movie} scrollY={scrollY} isFocused={isFocused} />
    </>
  )
})

export default MovieScreen
