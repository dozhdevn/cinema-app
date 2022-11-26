import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import { MediaService } from '../../services/MediaService'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'
import { getMediaSource } from '../../utils/getMediaSource'
import styles from './styles'
import Loader from '../Loader'

interface FilePickerProps {
  folder: string
  onChange: (...event: any[]) => void
  value: string
  gradient?: [string, string]
  withImage?: boolean
}

const FilePicker: React.FC<FilePickerProps> = ({
  withImage = false,
  onChange,
  value,
  gradient = ['#1db052', '#178d42'],
  folder
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const uploadFile = async () => {
    setIsLoading(true)
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    })

    if (result.cancelled) {
      setIsLoading(false)
      return
    }

    const data = await MediaService.uploadFile(result.uri, folder)
    onChange(data[0].url)
    setIsLoading(false)
  }

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.poster}>Poster</Text>

        <Pressable style={{ marginTop: 10 }} onPress={uploadFile}>
          <LinearGradient
            start={{ x: 0, y: 0.75 }}
            end={{ x: 1, y: 0.25 }}
            colors={gradient}
            style={styles.button}
          >
            <Feather name="upload" size={18} color="#fff" />
            <Text style={styles.buttonText}>Click for upload file</Text>
          </LinearGradient>
        </Pressable>
      </View>

      {withImage && (
        <View style={styles.imageWrapper}>
          {isLoading ? (
            <Loader />
          ) : (
            <Image source={getMediaSource(value)} style={styles.image} />
          )}
        </View>
      )}
    </View>
  )
}

export default FilePicker
