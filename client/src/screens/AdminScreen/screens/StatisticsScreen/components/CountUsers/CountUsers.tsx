import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { AdminService } from '../../../../../../services/AdminService'
import styles from './styles'

const CountUsers: React.FC = () => {
  const [count, setIsCount] = useState(0)

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      ;(async () => {
        const response = await AdminService.getUsersCount()
        setIsCount(response)
      })()
    }
  }, [isFocused])

  return (
    <View
      style={styles.counterWrapper}
    >
      <Text
        style={styles.countText}
      >
        {count}
      </Text>
      <Text
        style={styles.usersText}
      >
        users
      </Text>
    </View>
  )
}

export default CountUsers
