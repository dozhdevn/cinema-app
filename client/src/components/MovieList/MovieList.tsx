import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useRef } from 'react'
import styles from './styles'
import { Movie } from '../../interfaces'
import MovieItem from '../MovieItem'

interface MovieListProps {
  movies: Movie[]
  isFocused: boolean
}

const MovieList: React.FC<MovieListProps> = ({ movies, isFocused }) => {
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ y: 0 })
  }, [isFocused])

  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
    >
      <View style={styles.container}>
        {movies.map((movie, index) => (
          <MovieItem
            key={movie._id}
            movie={movie}
            index={index}
            isView={isFocused}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default MovieList
