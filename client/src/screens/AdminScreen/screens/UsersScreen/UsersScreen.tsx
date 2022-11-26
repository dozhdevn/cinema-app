import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useIsFocused } from '@react-navigation/native'
import AdminHeader from '../../components/AdminHeader'
import Layout from '../../../../components/Layout'
import { ADMIN_ROUTES_NAMES } from '../../../../navigation/interfaces'
import AdminSearch from '../../components/AdminSearch'
import { useSearch } from '../../../../hooks/useSearch'
import AdminTable from '../../components/AdminTable'
import { useStores } from '../../../../stores'
import { useTypedNavigation } from '../../../../hooks/useTypedNavigation'

const UsersScreen: React.FC = observer(() => {
  const { debouncedSearch, reset, control } = useSearch()

  const {
    user: { getUsers, users, isLoading, deleteUser },
  } = useStores()

  const isFocused = useIsFocused()
  const navigation = useTypedNavigation()

  useEffect(() => {
    if (isFocused) {
      getUsers(debouncedSearch)
    }
  }, [isFocused, debouncedSearch])

  const tableItems = users.map((user) => ({
    _id: user._id,
    editNavigate: () => {
      navigation.navigate(ADMIN_ROUTES_NAMES.USER_EDIT, {
        id: user._id,
      })
    },
    removeHandler: (id: string) => {
      deleteUser(id)
    },
    headlines: [user.email, new Date(user.createdAt).toLocaleDateString('ru')],
  }))

  return (
    <Layout padding>
      <AdminHeader title={ADMIN_ROUTES_NAMES.USERS} />
      <AdminSearch control={control} />

      <AdminTable
        headerItems={['Email', 'Date register']}
        items={tableItems}
        isLoading={isLoading}
      />
    </Layout>
  )
})

export default UsersScreen
