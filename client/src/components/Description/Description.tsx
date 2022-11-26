import { useWindowDimensions } from 'react-native'
import React, { memo } from 'react'
import RenderHTML from 'react-native-render-html'

interface DescriptionProps {
  description: string
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  const { width } = useWindowDimensions()

  const tagsStyles = {
    body: {
      color: 'white',
      fontSize: 17,
      fontWeight: '300',
      opacity: 0.5,
    },
  }

  return (
    <RenderHTML
      contentWidth={width}
      source={{
        html: description.includes('<p>')
          ? description
          : `<p>${description}</p`,
      }}
      //@ts-ignore
      tagsStyles={tagsStyles}
    />
  )
}

export default memo(Description)
