import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import BlurButton from '../BlurButton'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'

interface FavoriteButtonProps {
  movieId: string
  isSmall?: boolean
}

const FavoriteButton: React.FC<FavoriteButtonProps> = observer(
  ({ movieId, isSmall = false }) => {
    const {
      user: { favoriteMovies, toggleUserFavoriteMovies },
    } = useStores()

    const [isSmashed, setIsSmashed] = useState(false)

    useEffect(() => {
      if (!favoriteMovies.length) return

      const isHasMovie = favoriteMovies.some(
        (favorite) => favorite._id === movieId
      )

      if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie)

    }, [movieId, favoriteMovies.length])

    const toggleFavorite = () => {
      toggleUserFavoriteMovies(movieId)
      setIsSmashed(!isSmashed)
    }

    const liked = useSharedValue(0)

    useEffect(() => {
      liked.value = withSpring(+isSmashed)
    }, [isSmashed])

    const outlineStyle = useAnimatedStyle(() => ({
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    }))

    const fillStyle = useAnimatedStyle(() => ({
      transform: [
        {
          scale: liked.value,
        },
      ],
      opacity: liked.value,
    }))

    return (
      <BlurButton onPress={toggleFavorite} isSmall={isSmall}>
        <Animated.View
          style={[
            {
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
            },
            outlineStyle,
          ]}
        >
          <MaterialCommunityIcons
            name="heart-outline"
            size={isSmall ? 19 : 28}
            color="#fff"
          />
        </Animated.View>

        <Animated.View style={fillStyle}>
          <MaterialCommunityIcons
            name="heart"
            size={isSmall ? 19 : 28}
            color="#DC3F41"
          />
        </Animated.View>
      </BlurButton>
    )
  }
)

export default FavoriteButton
