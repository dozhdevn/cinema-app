import { View, Text, Pressable } from 'react-native'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { useTypedRoute } from '../../hooks/useTypedRoutes'
import Title from '../../components/Title'
import { useIsFocused } from '@react-navigation/native'
import { useStores } from '../../stores'
import Description from '../../components/Description'
import { Ionicons } from '@expo/vector-icons'
import { useTypedNavigation } from '../../hooks/useTypedNavigation'
import MovieList from '../../components/MovieList'
import { TABS_NAMES } from '../../navigation/interfaces'

const GenreScreen: React.FC = observer(() => {
  const isFocused = useIsFocused()
  const route = useTypedRoute<TABS_NAMES.GENRE>()
  const navigation = useTypedNavigation()

  const {
    genres: { getGenre, genre, isLoading },
    movies: { moviesByGenre, isLoading: moviesLoading },
  } = useStores()

  useEffect(() => {
    if (isFocused) {
      getGenre(route.params?.slug || '')
    }
  }, [isFocused])

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <Layout padding>
      {!isLoading && (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Title title={genre?.name || ''} />
            <Pressable onPress={goBack}>
              <Ionicons
                name="arrow-back-circle-outline"
                size={32}
                color="white"
              />
            </Pressable>
          </View>
          <Description description={genre?.description || ''} />
        </>
      )}

      <MovieList movies={moviesByGenre} isFocused={isFocused} />
    </Layout>
  )
})

export default GenreScreen
