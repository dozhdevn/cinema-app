import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useIsFocused } from '@react-navigation/native'

import Layout from '../../components/Layout'
import Title from '../../components/Title'
import Description from '../../components/Description'
import { useStores } from '../../stores'
import MovieList from '../../components/MovieList'
import Loader from '../../components/Loader'

const TrendingScreen = observer(() => {
  const isFocused = useIsFocused()

  const {
    movies: { popularMovies, isLoadingPopular, getPopularMovies },
  } = useStores()

  useEffect(() => {
    if (isFocused) {
      getPopularMovies()
    }
  }, [isFocused])

  return (
    <Layout padding viewAdminButton>
      <Title title="Trending" />
      <Description description="Trending movies in excellent quality: legal, safe, without ads" />
      {isLoadingPopular ? (
        <Loader />
      ) : (
        <MovieList movies={popularMovies} isFocused={isFocused} />
      )}
    </Layout>
  )
})

export default TrendingScreen
