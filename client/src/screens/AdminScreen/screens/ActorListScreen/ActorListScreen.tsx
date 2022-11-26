import { useIsFocused } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import Layout from '../../../../components/Layout'
import { useSearch } from '../../../../hooks/useSearch'
import { useTypedNavigation } from '../../../../hooks/useTypedNavigation'
import { TableItem } from '../../../../interfaces'
import { ADMIN_ROUTES_NAMES } from '../../../../navigation/interfaces'
import { useStores } from '../../../../stores'
import AdminHeader from '../../components/AdminHeader'
import AdminSearch from '../../components/AdminSearch'
import AdminTable from '../../components/AdminTable'

const ActorListScreen: React.FC = observer(() => {
  const { debouncedSearch, reset, control } = useSearch()

  const {
    actors: { getActors, actors, isLoading },
  } = useStores()

  const isFocused = useIsFocused()
  const navigation = useTypedNavigation()

  useEffect(() => {
    if (isFocused) {
      getActors(debouncedSearch)
    }
  }, [isFocused, debouncedSearch])


  const tableItems: TableItem[] = actors.map(actor => ({
    _id: actor._id,
    editNavigate: () => {
      navigation.navigate(ADMIN_ROUTES_NAMES.ACTOR_EDIT, {
        id: actor._id
      })
    },
    removeHandler: (id: string) => {
      console.log('delete')
    },
    headlines: [
      actor.name, 
      String(actor.countMovies)
    ]
  }))

  return (
    <Layout padding>
      <AdminHeader title='Actors' />

      <AdminSearch control={control} />

      <AdminTable
        headerItems={['Name', 'Count movies']}
        items={tableItems}
        isLoading={isLoading}
      />
    </Layout>
  )
})

export default ActorListScreen
