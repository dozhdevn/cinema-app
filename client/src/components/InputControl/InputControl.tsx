import { View, TextInput, Text } from 'react-native'
import React from 'react'
import { IField } from '../../interfaces'
import { Controller } from 'react-hook-form'
import styles from './styles'

const InputControl = <T extends Record<string, any>>({
  control,
  rules,
  name,
  ...rest
}: IField<T>): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.inputWrapper,
              { borderColor: error ? 'red' : 'transparent' },
            ]}
          >
            <TextInput
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              value={(value || '').toString()}
              {...rest}
            />
          </View>
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </>
      )}
    />
  )
}

export default InputControl
