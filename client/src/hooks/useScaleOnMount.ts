import { useEffect } from 'react'
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

export const useScaleOnMount = (isFocused: boolean) => {
  const scale = useSharedValue(0)

  useEffect(() => {
    if (isFocused) scale.value = withSpring(1)

    if (!isFocused) scale.value = withSpring(0)
  }, [isFocused])

  const styleAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
  }))
 
  return { styleAnimation }
}
