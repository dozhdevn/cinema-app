import { View, ViewStyle, SafeAreaView } from 'react-native'
import React from 'react'
import styles from './styles'
import AdminButton from '../AdminButton'

interface LayoutProps {
  padding?: boolean
  style?: ViewStyle
  children: React.ReactNode
  viewAdminButton?: boolean
}

const Layout: React.FC<LayoutProps> = ({
  viewAdminButton = false,
  padding,
  children,
  style,
}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[{ paddingTop: 10, flex: 1 }, padding && styles.padding, style]}
      >
        {children}
        {viewAdminButton && <AdminButton />}
      </View>
    </SafeAreaView>
  )
}

export default Layout
