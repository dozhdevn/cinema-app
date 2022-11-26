import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Checkbox from 'expo-checkbox'
import { observer } from 'mobx-react-lite'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useTypedRoute } from '../../../../hooks/useTypedRoutes'
import Layout from '../../../../components/Layout'
import AdminHeader from '../../components/AdminHeader'
import InputControl from '../../../../components/InputControl'
import { ADMIN_ROUTES_NAMES } from '../../../../navigation/interfaces'
import { validEmail } from '../../../../regex'
import Button from '../../../../components/Button'
import { useStores } from '../../../../stores'
import { useIsFocused } from '@react-navigation/native'
import Loader from '../../../../components/Loader'

export interface EditUserForm {
  email: string
  password: string
  isAdmin: boolean
}

const UserEditScreen: React.FC = observer(() => {
  const {
    admin: { getUserById, editUser, user, isLoading },
  } = useStores()
  const { params } = useTypedRoute<ADMIN_ROUTES_NAMES.USER_EDIT>()
  const isFocused = useIsFocused()

  const { handleSubmit, control } = useForm<EditUserForm>()
  const onSubmit: SubmitHandler<EditUserForm> = (data) => {
    editUser(params.id, data)
  }

  useEffect(() => {
    if (isFocused) {
      getUserById(params.id)
    }
  }, [isFocused])

  return (
    <Layout padding>
      <AdminHeader title="Edit user" isBackButton />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {user && (
            <View style={{ marginTop: 20 }}>
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
                defaultValue={user.email}
              />
              <InputControl
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

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                    onPress={() => onChange(!value)}
                  >
                    <Checkbox
                      value={value}
                      onValueChange={onChange}
                      color={'#DC3F41'}
                    />
                    <Text
                      style={{ color: '#fff', marginLeft: 10, fontSize: 16 }}
                    >
                      Administrator
                    </Text>
                  </Pressable>
                )}
                name="isAdmin"
                defaultValue={user.isAdmin}
              />

              <Button onPress={handleSubmit(onSubmit)} icon="pen-tool">
                Update
              </Button>
            </View>
          )}
        </>
      )}
    </Layout>
  )
})

export default UserEditScreen
