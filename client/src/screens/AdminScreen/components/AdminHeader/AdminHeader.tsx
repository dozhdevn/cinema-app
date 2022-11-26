import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Title from '../../../../components/Title'
import Hamburger from '../../../../components/Hamburger'
import { BlurView } from 'expo-blur'
import { navItems } from './admin-navigation.data'
import AdminNavItem from '../AdminNavItem'
import { useIsFocused } from '@react-navigation/native'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'
import BlurButton from '../../../../components/BlurButton'
import { useTypedNavigation } from '../../../../hooks/useTypedNavigation'
import styles from './styles'

interface AdminHeaderProps {
  title: string
  isBackButton?: true
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, isBackButton }) => {
  const isFocused = useIsFocused()
  const { goBack } = useTypedNavigation()
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    if (isFocused) {
      setIsShow(false)
    }
  }, [isFocused])

  const handlePressHamburger = () => {
    setIsShow((prev) => !prev)
  }

  const transform = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(isShow ? 0 : 170, { damping: 11.7 }) },
    ],
  }))

  return (
    <View style={styles.header}>
      <Title title={title} />
      <View style={styles.headerRight}>
        {isBackButton && (
          <BlurButton
            icon={'chevron-left'}
            iconSize={24}
            style={{ width: 48, height: 48, marginRight: 12 }}
            onPress={goBack}
          />
        )}

        <Hamburger isShow={isShow} onPress={handlePressHamburger} />

        <Animated.View style={transform}>
          <BlurView intensity={50} tint="dark" style={styles.navMenu}>
            {navItems.map((item) => (
              <AdminNavItem key={item.routeName} {...item} />
            ))}
          </BlurView>
        </Animated.View>
      </View>
    </View>
  )
}

export default AdminHeader
