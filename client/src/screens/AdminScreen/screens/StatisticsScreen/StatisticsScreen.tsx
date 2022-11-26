import { ScrollView } from 'react-native'
import React from 'react'
import Layout from '../../../../components/Layout'
import AdminHeader from '../../components/AdminHeader'
import { ADMIN_ROUTES_NAMES } from '../../../../navigation/interfaces'
import CountUsers from './components/CountUsers'
import PopularMovies from './components/PopularMovies'

const StatisticsScreen: React.FC = () => {
  return (
    <Layout padding>
      <AdminHeader title={ADMIN_ROUTES_NAMES.STATISTICS} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <CountUsers />
        <PopularMovies />
      </ScrollView>
    </Layout>
  )
}

export default StatisticsScreen
