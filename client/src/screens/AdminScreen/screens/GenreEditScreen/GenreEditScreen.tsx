import { View } from 'react-native'
import React, { useEffect } from 'react'
import Layout from '../../../../components/Layout'
import AdminHeader from '../../components/AdminHeader'
import { observer } from 'mobx-react-lite'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useIsFocused } from '@react-navigation/native'
import InputControl from '../../../../components/InputControl'
import { generateSlug } from '../../../../utils/generateSlug'
import InputGenerateSlug from '../../../../components/InputGenerateSlug'
import Button from '../../../../components/Button'
import TextEditor from '../../../../components/TextEditor'
import { useStores } from '../../../../stores'
import { useTypedRoute } from '../../../../hooks/useTypedRoutes'
import { ADMIN_ROUTES_NAMES } from '../../../../navigation/interfaces'
import Loader from '../../../../components/Loader'

export interface EditGenreForm {
  name: string
  slug: string
  description: string
  icon: string
}

const GenreEditScreen = observer(() => {
  const {
    admin: { getGenreById, editGenre, genre, isLoading },
  } = useStores()
  const { params } = useTypedRoute<ADMIN_ROUTES_NAMES.GENRE_EDIT>()
  const isFocused = useIsFocused()

  const { handleSubmit, control, setValue, getValues } = useForm<EditGenreForm>(
    {
      mode: 'onSubmit',
    }
  )

  const onSubmit: SubmitHandler<EditGenreForm> = (data) => {
    editGenre(params.id, { ...data, icon: '' })
  }

  useEffect(() => {
    if (isFocused) {
      getGenreById(params.id)
    }
  }, [isFocused])


  return (
    <Layout padding>
      <AdminHeader title="Genre edit" isBackButton />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {genre && (
            <View>
              <InputControl<EditGenreForm>
                placeholder="Enter name"
                control={control}
                name="name"
                rules={{
                  required: 'Name is required!',
                }}
                defaultValue={genre.name}
              />
              <View>
                <InputGenerateSlug
                  generate={() => {
                    setValue('slug', generateSlug(getValues('name') || ''))
                  }}
                />
                <InputControl<EditGenreForm>
                  placeholder="Enter slug"
                  control={control}
                  name="slug"
                  rules={{
                    required: 'Slug is required!',
                  }}
                />
              </View>

              <Controller
                control={control}
                name="description"
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <TextEditor onChange={onChange} value={value} error={error} />
                )}
                rules={{
                  validate: {
                    required: (value) => {
                      const replaceHTML = value
                        .replace(/<(.|\n)*?>/g, '')
                        .trim()
                      const replaceWhiteSpace = replaceHTML
                        .replace(/&nbsp;/g, '')
                        .trim()

                      return (
                        replaceWhiteSpace.length > 0 ||
                        'Description is required!'
                      )
                    },
                  },
                }}
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

export default GenreEditScreen
