import { View, Text, Pressable } from 'react-native'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useTypedRoute } from '../../hooks/useTypedRoutes'
import Layout from '../../components/Layout'
import { useIsFocused } from '@react-navigation/native'
import { useTypedNavigation } from '../../hooks/useTypedNavigation'
import { useStores } from '../../stores'
import Title from '../../components/Title'
import { Ionicons } from '@expo/vector-icons'
import MovieList from '../../components/MovieList'
import { TABS_NAMES } from '../../navigation/interfaces'

const ActorScreen: React.FC = observer(() => {
  const isFocused = useIsFocused()
  const route = useTypedRoute<TABS_NAMES.ACTOR>()
  const navigation = useTypedNavigation()

  const {
    actors: { getActor, actor, isLoading: actorLoading },
    movies: { moviesByActor, getMoviesByActor, isLoading },
  } = useStores()

  useEffect(() => {
    if (isFocused) {
      getActor(route.params?.slug || '')
      getMoviesByActor(actor?._id || '')
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
            <Title title={actor?.name || ''} />
            <Pressable onPress={goBack}>
              <Ionicons
                name="arrow-back-circle-outline"
                size={32}
                color="white"
              />
            </Pressable>
          </View>
        </>
      )}

      <MovieList movies={moviesByActor} isFocused={isFocused} />
    </Layout>
  )
})

export default ActorScreen
