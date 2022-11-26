import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { ITEM_SIZE } from '../../../../constants/Carousel'

export const useCarouselItemAnimation = (
  index: number,
  styleValue: SharedValue<number>
) => {
  const style = useAnimatedStyle(() => {
    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
    ]
    const scale = interpolate(styleValue.value, inputRange, [0.8, 1, 0.8])

    const rotate = interpolate(styleValue.value, inputRange, [4, 0, -4])

    const opacity = interpolate(styleValue.value, inputRange, [0.35, 1, 0.35])
    4
    return {
      transform: [{ rotate: `${rotate}deg` }, { scale }],
      opacity,
    }
  })

  return { style }
}
