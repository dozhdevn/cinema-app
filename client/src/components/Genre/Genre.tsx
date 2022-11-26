import { Text, Pressable } from 'react-native'
import React from 'react'
import { Genre as IGenre } from '../../interfaces'
import styles from './styles'
import { useTypedNavigation } from '../../hooks/useTypedNavigation'
import { TABS_NAMES } from '../../navigation/interfaces'

interface GenreProps {
  genre: IGenre
}

const Genre: React.FC<GenreProps> = ({ genre }) => {
  const navigation = useTypedNavigation()

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(TABS_NAMES.GENRE, { slug: genre.slug })
      }
      style={styles.genre}
    >
      <Text style={styles.name}>{genre.name}</Text>
    </Pressable>
  )
}

export default Genre
