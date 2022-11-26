import React, { useEffect } from 'react'
import Layout from '../../../../components/Layout'
import AdminHeader from '../../components/AdminHeader'
import { ADMIN_ROUTES_NAMES } from '../../../../navigation/interfaces'
import { useSearch } from '../../../../hooks/useSearch'
import AdminSearch from '../../components/AdminSearch'
import AdminTable from '../../components/AdminTable'
import { observer } from 'mobx-react-lite'
import { useIsFocused } from '@react-navigation/native'
import { useTypedNavigation } from '../../../../hooks/useTypedNavigation'
import { useStores } from '../../../../stores'

const GenreListScreen: React.FC = observer(() => {
  const { debouncedSearch, reset, control } = useSearch()

  const {
    genres: { getGenres, genres, isLoading },
  } = useStores()

  const isFocused = useIsFocused()
  const navigation = useTypedNavigation()

  useEffect(() => {
    if (isFocused) {
      getGenres(debouncedSearch)
    }
  }, [isFocused, debouncedSearch])

  const tableItems = genres.map((genre) => ({
    _id: genre._id,
    editNavigate: () => {
      navigation.navigate(ADMIN_ROUTES_NAMES.GENRE_EDIT, {
        id: genre._id,
      })
    },
    removeHandler: (id: string) => {
      console.log(id)
    },
    headlines: [genre.name, genre.slug],
  }))

  return (
    <Layout padding>
      <AdminHeader title="Genres" />

      <AdminSearch control={control} />

      <AdminTable
        headerItems={['Name', 'Slug']}
        items={tableItems}
        isLoading={isLoading}
      />
    </Layout>
  )
})

export default GenreListScreen
