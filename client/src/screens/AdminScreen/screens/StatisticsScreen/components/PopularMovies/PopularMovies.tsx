import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../../../../../stores'
import MovieItem from '../../../../../../components/MovieItem'
import styles from './styles'

const PopularMovies: React.FC = observer(() => {
  const {
    movies: { getPopularMovies, popularMovies },
  } = useStores()

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      getPopularMovies(2)
    }
  }, [isFocused])

  return (
    <View style={styles.popularWrapper}>
      <Text style={styles.popularText}>The most popular movies</Text>

      <View style={styles.moviesList}>
        {popularMovies.map((movie, index) => (
          <View key={movie._id}>
            <MovieItem index={index} movie={movie} style={styles.movieItem} />
            <Text style={styles.movieCount}>
              Opened {movie.countOpened} times
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
})

export default PopularMovies
