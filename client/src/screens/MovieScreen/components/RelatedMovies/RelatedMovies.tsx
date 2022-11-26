import { View, Text, FlatList, ListRenderItemInfo } from 'react-native'
import React, { useEffect } from 'react'
import styles from './styles'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../../../stores'
import { Movie } from '../../../../interfaces'
import MovieItem from '../../../../components/MovieItem'

interface RelatedMoviesProps {
  currentMovieId: string
  genreIds: string[]
}

const RelatedMovies: React.FC<RelatedMoviesProps> = observer(
  ({ currentMovieId, genreIds }) => {
    const {
      movies: { getMoviesByGenre, moviesByGenre },
    } = useStores()

    useEffect(() => {
      getMoviesByGenre(genreIds)
    }, [])

    const movies = moviesByGenre.filter((movie) => movie._id !== currentMovieId)

    const renderItem = ({ item: movie, index }: ListRenderItemInfo<Movie>) => (
      <MovieItem
        index={index}
        movie={movie}
        isView
        style={styles.relatedItem}
      />
    )

    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>Related movies</Text>

        <FlatList
          horizontal
          snapToInterval={160}
          renderToHardwareTextureAndroid
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          data={movies}
          renderItem={renderItem}
        />
      </View>
    )
  }
)

export default RelatedMovies
