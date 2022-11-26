import {
  View,
  Text,
  FlatList,
  Pressable,
  ListRenderItemInfo,
  Image,
} from 'react-native'
import React from 'react'
import { Actor } from '../../../../interfaces'
import styles from './styles'
import { getMediaSource } from '../../../../utils/getMediaSource'
import { useTypedNavigation } from '../../../../hooks/useTypedNavigation'

interface ActorsCarouselProps {
  actors: Actor[]
}

const ActorsCarousel: React.FC<ActorsCarouselProps> = ({ actors }) => {
  const { navigate } = useTypedNavigation()

  const renderItem = ({ item: actor }: ListRenderItemInfo<Actor>) => (
    <Pressable
      style={styles.actorItem}
      onPress={() => {
        navigate('Actor', {
          slug: actor.slug,
        })
      }}
    >
      <Image style={styles.photo} source={getMediaSource(actor.photo)} />
      <View style={styles.nameWrapper}>
        <Text style={styles.name}>{actor.name}</Text>
      </View>
    </Pressable>
  )

  return (
    <FlatList
      horizontal
      renderToHardwareTextureAndroid
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      data={actors}
      renderItem={renderItem}
    />
  )
}

export default ActorsCarousel
