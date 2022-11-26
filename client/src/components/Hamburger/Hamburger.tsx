import React from 'react'
import Animated from 'react-native-reanimated'
import BlurButton from '../BlurButton'
import styles from './styles'
import { useHamburgerAnimation } from './useHamburgerAnimation'

interface HamburgerProps {
  isShow: boolean
  onPress: () => void
}

const Hamburger: React.FC<HamburgerProps> = ({ isShow, onPress }) => {
  const animation = useHamburgerAnimation(isShow)

  return (
    <BlurButton onPress={onPress}>
      <Animated.View style={animation.styleAnimation}>
        <Animated.View
          style={[styles.stick, animation.transformFirstLineAnimation]}
        />
        <Animated.View
          style={[styles.stick, animation.widthSecondLineAnimation]}
        />
        <Animated.View
          style={[styles.stick, animation.transformThirdLineAnimation]}
        />
      </Animated.View>
    </BlurButton>
  )
}

export default Hamburger
