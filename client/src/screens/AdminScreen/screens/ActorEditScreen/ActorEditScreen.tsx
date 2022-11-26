import { useIsFocused } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { View } from 'react-native'
import Button from '../../../../components/Button'
import InputControl from '../../../../components/InputControl'
import InputGenerateSlug from '../../../../components/InputGenerateSlug'
import Layout from '../../../../components/Layout'
import { useTypedRoute } from '../../../../hooks/useTypedRoutes'
import { ADMIN_ROUTES_NAMES } from '../../../../navigation/interfaces'
import { useStores } from '../../../../stores'
import { generateSlug } from '../../../../utils/generateSlug'
import AdminHeader from '../../components/AdminHeader'

import Loader from '../../../../components/Loader'
import FilePicker from '../../../../components/FilePicker'
import { setInitialValues } from '../../../../utils/setInitialValues'

export interface EditActorForm {
  name: string
  slug: string
  photo: string
}

const ActorEditScreen: React.FC = observer(() => {
  const {
    admin: { getActorById, editActor, actor, isLoading },
  } = useStores()

  const { params } = useTypedRoute<ADMIN_ROUTES_NAMES.ACTOR_EDIT>()
  const isFocused = useIsFocused()

  const { handleSubmit, control, setValue, getValues } = useForm<EditActorForm>(
    {
      mode: 'onSubmit',
    }
  )
  const onSubmit: SubmitHandler<EditActorForm> = (data) => {
    editActor(params.id, data)
  }

  useEffect(() => {
    if (isFocused) {
      getActorById(params.id)
    }
  }, [isFocused, params.id])

  useEffect(() => {
    if (actor) {
      setInitialValues<EditActorForm>(actor, setValue)
    }
  }, [actor?.name])

  return (
    <Layout padding>
      <AdminHeader title="Edit actor" isBackButton />

      {isLoading ? (
        <Loader />
      ) : (
        <View>
          {actor && (
            <View>
              <InputControl
                placeholder="Enter name"
                control={control}
                name="name"
                rules={{
                  required: 'Name is required!',
                }}
              />
              <View>
                <InputGenerateSlug
                  generate={() => {
                    setValue('slug', generateSlug(getValues('name')))
                  }}
                />
                <InputControl
                  placeholder="Enter slug"
                  control={control}
                  name="slug"
                  rules={{
                    required: 'Slug is required!',
                  }}
                  defaultValue={actor.slug}
                />
              </View>

              <Controller
                control={control}
                name="photo"
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <FilePicker
                    value={value}
                    onChange={onChange}
                    withImage
                    folder="actors"
                  />
                )}
                rules={{
                  required: 'Photo is required!',
                }}
              />
              <Button onPress={handleSubmit(onSubmit)} icon="pen-tool">
                Update
              </Button>
            </View>
          )}
        </View>
      )}
    </Layout>
  )
})

export default ActorEditScreen
