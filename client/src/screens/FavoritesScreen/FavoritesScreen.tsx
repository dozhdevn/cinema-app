import { View, ScrollView } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useIsFocused } from '@react-navigation/native'
import { useStores } from '../../stores'
import Title from '../../components/Title'
import Layout from '../../components/Layout'
import Loader from '../../components/Loader'
import MovieList from '../../components/MovieList'

const FavoritesScreen: React.FC = observer(() => {
  const isFocused = useIsFocused()

  const {
    user: { favoriteMovies, isLoadingFavorites, getUserFavoriteMovies },
  } = useStores()

  useEffect(() => {
    if (isFocused) {
      getUserFavoriteMovies()
    }
  }, [isFocused])

  return (
    <Layout padding viewAdminButton>
      <Title title="Favorites" />
      {isLoadingFavorites ? (
        <Loader />
      ) : (
        <MovieList movies={favoriteMovies} isFocused={isFocused}/>
      )}
    </Layout>
  )
})

export default FavoritesScreen
