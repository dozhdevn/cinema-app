import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { ADMIN_ROUTES_NAMES } from '../../../../navigation/interfaces'
import Layout from '../../../../components/Layout'
import AdminHeader from '../../components/AdminHeader'
import AdminSearch from '../../components/AdminSearch'
import { useSearch } from '../../../../hooks/useSearch'
import { useTypedNavigation } from '../../../../hooks/useTypedNavigation'
import AdminTable from '../../components/AdminTable'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../../../stores'
import { TableItem } from '../../../../interfaces'

const MovieListScreen: React.FC = observer(() => {
  const { debouncedSearch, reset, control } = useSearch()

  const {
    movies: { getMovies, movies, isLoading },
  } = useStores()

  const isFocused = useIsFocused()
  const navigation = useTypedNavigation()

  useEffect(() => {
    if (isFocused) {
      getMovies(debouncedSearch)
    }
  }, [isFocused, debouncedSearch])

  const tableItems: TableItem[] = movies.map((movie) => ({
    _id: movie._id,
    editNavigate: () => {
      navigation.navigate(ADMIN_ROUTES_NAMES.MOVIE_EDIT, {
        id: movie._id,
      })
    },
    removeHandler: (id: string) => {
      console.log('delete movie')
    },
    headlines: [
      movie.title,
      movie.genres.length > 1
        ? `${movie.genres[0].name} ...`
        : movie.genres[0].name,
      String(movie.rating),
    ],
  }))

  return (
    <Layout padding>
      <AdminHeader title="Movies" />

      <AdminSearch control={control} />

      <AdminTable
        items={tableItems}
        headerItems={['Title', 'Main genre', 'Rating']}
        isLoading={isLoading}
      />
    </Layout>
  )
})

export default MovieListScreen
