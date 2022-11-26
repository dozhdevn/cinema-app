import { View, Text, Alert } from 'react-native'
import React from 'react'
import styles from './styles'
import { TableItem } from '../../../../interfaces'
import AdminActions from '../AdminActions'

interface AdminTableItemPros {
  item: TableItem
}

const AdminTableItem: React.FC<AdminTableItemPros> = ({ item }) => {
  const removeItem = () => {
    Alert.alert('Are you sure?', undefined, [
      { text: 'Yes', onPress: () => item.removeHandler(item._id) },
      { text: 'Cancel' },
    ])
  }

  return (
    <View style={styles.tableItem} key={item._id}>
      {item.headlines.map((headline, i) => (
        <View style={styles.headline} key={headline}>
          <Text style={[styles.text, { textAlign: i ? 'center' : 'auto' }]}>
            {headline}
          </Text>
        </View>
      ))}
      <AdminActions
        editNavigate={item.editNavigate}
        removeHandler={removeItem}
      />
    </View>
  )
}

export default AdminTableItem
