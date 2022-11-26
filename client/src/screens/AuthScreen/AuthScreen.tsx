import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthFormData } from '../../interfaces'
import Button from '../../components/Button'
import styles from './styles'
import InputControl from '../../components/InputControl'
import { validEmail } from '../../regex'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'

const AuthScreen: React.FC = observer(() => {
  const { auth } = useStores()
  const [isReg, setIsReg] = useState(false)
  const { handleSubmit, control, reset } = useForm<AuthFormData>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<AuthFormData> = (data) => {
    isReg ? auth.register(data) : auth.login(data)
    reset()
  }

  const handleToggleAuth = () => {
    setIsReg(!isReg)
  }

  return (
    <View style={styles.authWrapper}>
      <View style={styles.form}>
        <Text style={styles.title}>{isReg ? 'Register' : 'Login'}</Text>
        <InputControl
          placeholder="Enter e-mail"
          control={control}
          name="email"
          rules={{
            required: 'Email is required!',
            pattern: {
              value: validEmail,
              message: 'Please enter a valid email address',
            },
          }}
          keyboardType="email-address"
        />
        <InputControl<AuthFormData>
          placeholder="Enter password"
          control={control}
          name="password"
          rules={{
            required: 'Password is required!',
            minLength: {
              value: 6,
              message: 'Password should be minimum 6 characters long',
            },
          }}
          secureTextEntry={true}
        />
        <Button icon="film" onPress={handleSubmit(onSubmit)}>
          Go to watch
        </Button>
        <Pressable onPress={handleToggleAuth}>
          <Text style={styles.toggleButton}>
            {isReg ? 'Login' : 'Register'}
          </Text>
        </Pressable>
      </View>
    </View>
  )
})

export default AuthScreen
