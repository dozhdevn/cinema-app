import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import { TableItem } from '../../../../interfaces'
import Loader from '../../../../components/Loader'
import AdminActions from '../AdminActions'
import AdminTableItem from '../AdminTableItem'

interface AdminTableProps {
  items: TableItem[]
  headerItems: string[]
  isLoading: boolean
}

const AdminTable: React.FC<AdminTableProps> = ({
  headerItems,
  items,
  isLoading,
}): JSX.Element => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View>
        <View style={styles.headerWrapper}>
          {headerItems.map((item, i) => (
            <View style={styles.headerItem} key={item}>
              <Text
                style={[
                  styles.headerText,
                  { textAlign: i  ? 'center' : 'auto' },
                ]}
              >
                {item}
              </Text>
            </View>
          ))}
          <View style={styles.action}>
            <Text style={styles.headerText}>Action</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {items.map((item) => (
                <AdminTableItem key={item._id} item={item} />
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </ScrollView>
  )
}

export default AdminTable
