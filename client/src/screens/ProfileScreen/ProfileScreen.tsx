import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import Animated from 'react-native-reanimated'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthFormData } from '../../interfaces'
import InputControl from '../../components/InputControl'
import { validEmail } from '../../regex'
import Button from '../../components/Button'
import LogoutButton from '../../components/LogoutButton'
import Toast from 'react-native-toast-message'
import { useIsFocused } from '@react-navigation/native'
import { useScaleOnMount } from '../../hooks/useScaleOnMount'
import styles from './styles'

const ProfileScreen: React.FC = observer(() => {
  const isFocused = useIsFocused()
  const {
    auth: { logOut },
    user: { user, getUser, updateUser, isError, isSuccess, isLoading },
  } = useStores()

  const { handleSubmit, setValue, control } = useForm<AuthFormData>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<AuthFormData> = (data) => {
    updateUser(data)
  }

  const { styleAnimation } = useScaleOnMount(isFocused)

  useEffect(() => {
    if (isFocused) getUser()
  }, [isFocused])

  useEffect(() => {
    if(user) {
      setValue('email', user.email)
    }
  }, [user?.email])

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: 'Request error',
      })
    }
    if (isSuccess) {
      Toast.show({
        text1: 'Update profile',
        text2: 'update was successful',
        type: 'success',
      })
    }
  }, [isError, isSuccess])

  return (
    <Layout padding viewAdminButton>
      <Title title="Profile" />
      <Animated.View style={[styles.imageWrapper, styleAnimation]}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/avatar-guest.jpg')}
        />
      </Animated.View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.form}>
          <InputControl<AuthFormData>
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
              minLength: {
                value: 6,
                message: 'Password should be minimum 6 characters long',
              },
            }}
            secureTextEntry={true}
          />

          <Button
            onPress={handleSubmit(onSubmit)}
            icon="edit"
            disabled={isLoading}
          >
            Update profile
          </Button>
        </View>
      )}

      <LogoutButton onPress={() => logOut()} />
    </Layout>
  )
})

export default ProfileScreen
