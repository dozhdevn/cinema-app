import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { View, Pressable } from 'react-native'
import InputControl from '../../components/InputControl'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import { SearchFormData } from '../../interfaces'
import { useStores } from '../../stores'
import MovieList from '../../components/MovieList'
import Loader from '../../components/Loader'
import { useSearch } from '../../hooks/useSearch'

const SearchScreen: React.FC = observer(() => {
  const isFocused = useIsFocused()
  const {
    movies: { getMovies, movies, isLoading },
  } = useStores()
  const { debouncedSearch, reset, control, searchTerm } = useSearch()

  useEffect(() => {
    getMovies(debouncedSearch)
  }, [debouncedSearch, isFocused])

  return (
    <Layout padding viewAdminButton>
      <Title title="Search" />
      <View style={{ marginTop: 12, position: 'relative' }}>
        <InputControl<SearchFormData>
          placeholder="Type something..."
          control={control}
          name="searchTerm"
          keyboardType="web-search"
        />
        {searchTerm && (
          <Pressable
            style={{ position: 'absolute', right: 15, top: 18 }}
            onPress={() => reset()}
          >
            <AntDesign name="close" size={20} color="white" />
          </Pressable>
        )}
      </View>

      {!!debouncedSearch && (
        <>
          {!isLoading ? (
            <MovieList movies={movies} isFocused={isFocused} />
          ) : (
            <Loader />
          )}
        </>
      )}
    </Layout>
  )
})

export default SearchScreen
