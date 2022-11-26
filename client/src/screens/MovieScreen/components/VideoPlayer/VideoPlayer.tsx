import { View } from 'react-native'
import { Video, ResizeMode, Audio } from 'expo-av'
import React, { useEffect, useRef } from 'react'
import Button from '../../../../components/Button'
import { getMediaSource } from '../../../../utils/getMediaSource'
import { useIsFocused } from '@react-navigation/native'

interface VideoPlayerProps {
  video: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const videoRef = useRef<Video>(null)

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      const enableAudio = async () => {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: false,
        })

        await videoRef.current?.stopAsync()
      }

      enableAudio()
    }
  }, [isFocused])

  return (
    <>
      <Button
        icon="play"
        style={{ marginBottom: 24 }}
        onPress={async () => {
          await videoRef.current?.presentFullscreenPlayer()
          await videoRef.current?.playAsync()
        }}
      >
        Watch movie
      </Button>

      <View>
        <Video
          style={{ width: '100%', height: 180, display: 'none' }}
          ref={videoRef}
          source={getMediaSource(video)}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
        />
      </View>
    </>
  )
}

export default VideoPlayer
