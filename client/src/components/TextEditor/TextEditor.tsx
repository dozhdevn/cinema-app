import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import { FieldError } from 'react-hook-form'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'

interface TextEditorProps {
  onChange: (...event: any[]) => void
  value: string
  error?: FieldError
  placeholder?: string
}

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  placeholder = 'Write your cool content here',
  error,
  onChange,
}) => {
  const richEditor = useRef<RichEditor>(null)

  return (
    <View>
      <View style={{
        width: '100%',
        flexDirection: 'column-reverse',
        borderWidth: 1,
        borderRadius: 12,
        borderStyle: 'solid',
        borderColor: 'transparent',
        marginVertical: 16,
        overflow: 'hidden'
      }}>
        <RichEditor
          ref={richEditor}
          onChange={onChange}
          placeholder={placeholder}
          initialHeight={200}
          editorStyle={{
            backgroundColor: 'rgba(34,34,34,.5)',
            color: 'white',
          }}
          initialContentHTML={value}
        />
        <RichToolbar
          editor={richEditor}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.insertLink,
            actions.setUnderline,
            actions.undo,
            actions.keyboard,
          ]}
          style={{
            backgroundColor: '#222',
          }}
          iconTint="white"
          selectedIconTint="#1DA64F"
        />
      </View>

      {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
    </View>
  )
}

export default TextEditor
