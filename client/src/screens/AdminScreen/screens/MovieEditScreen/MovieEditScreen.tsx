import { View, Text, ScrollView } from 'react-native'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import React, { useEffect, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { useIsFocused } from '@react-navigation/native'
import { Movie } from '../../../../interfaces'
import Layout from '../../../../components/Layout'
import AdminHeader from '../../components/AdminHeader'
import { ADMIN_ROUTES_NAMES } from '../../../../navigation/interfaces'
import { useTypedRoute } from '../../../../hooks/useTypedRoutes'
import { useStores } from '../../../../stores'
import Loader from '../../../../components/Loader'
import InputControl from '../../../../components/InputControl'
import InputGenerateSlug from '../../../../components/InputGenerateSlug'
import { generateSlug } from '../../../../utils/generateSlug'
import { setInitialValues } from '../../../../utils/setInitialValues'
import Dropdown from '../../../../components/Dropdown'
import FilePicker from '../../../../components/FilePicker'
import Button from '../../../../components/Button'

export interface EditMovieForm extends Omit<Movie, '_id'> {}

const MovieEditScreen: React.FC = observer(() => {
  const {
    admin: { getMovieById, editMovie, movie, isLoading },
    genres: { getGenres, genres },
    actors: { getActors, actors },
  } = useStores()

  const { params } = useTypedRoute<ADMIN_ROUTES_NAMES.MOVIE_EDIT>()
  const isFocused = useIsFocused()

  const { handleSubmit, control, setValue, getValues } = useForm<EditMovieForm>(
    {
      mode: 'onSubmit',
    }
  )

  const onSubmit: SubmitHandler<EditMovieForm> = data => {
    editMovie(params.id, data)
  }

  useEffect(() => {
    if (isFocused) {
      getMovieById(params.id)
      getGenres()
      getActors()
    }
  }, [isFocused, params.id])

  useEffect(() => {
    if (movie) {
      setInitialValues<EditMovieForm>(movie, setValue)
    }
  }, [movie?._id])

  const genreOptions = genres.map((genre) => ({
    label: genre.name,
    value: genre._id,
  }))

  const actorsOptions = actors.map((actor) => ({
    label: actor.name,
    value: actor._id,
  }))

  return (
    <Layout padding>
      <AdminHeader title="Edit movie" isBackButton />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {movie && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <InputControl
                placeholder="Enter name"
                control={control}
                name="title"
                rules={{
                  required: 'Name is required!',
                }}
              />
              <View>
                <InputGenerateSlug
                  generate={() => {
                    setValue('slug', generateSlug(getValues('title')))
                  }}
                />
                <InputControl
                  placeholder="Enter slug"
                  control={control}
                  name="slug"
                  rules={{
                    required: 'Slug is required!',
                  }}
                />
              </View>
              <InputControl
                placeholder="Enter countries"
                control={control}
                name="parameters.country"
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ width: '56%' }}>
                  <InputControl<EditMovieForm>
                    placeholder="Enter duration (min.)"
                    control={control}
                    name="parameters.duration"
                    rules={{
                      required: 'Duration is required!',
                    }}
                  />
                </View>
                <View style={{ width: '40%' }}>
                  <InputControl
                    placeholder="Enter year"
                    control={control}
                    name="parameters.year"
                    rules={{
                      required: 'Year is required!',
                    }}
                    keyboardType="number-pad"
                  />
                </View>
              </View>

              <Controller
                control={control}
                name="genres"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    value && (
                      <Dropdown
                        options={genreOptions}
                        value={value}
                        onChange={onChange}
                        isMulti
                      />
                    )
                  )
                }}
                rules={{
                  required: 'Genres is required!',
                }}
              />

              <Controller
                name="actors"
                control={control}
                rules={{
                  required: 'Please dropdown at least one actor!',
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) =>
                  value && (
                    <Dropdown
                      value={value}
                      options={actorsOptions}
                      onChange={onChange}
                      isMulti
                    />
                  )
                }
              />

              <Controller
                control={control}
                name="poster"
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <FilePicker
                    value={value}
                    onChange={onChange}
                    withImage
                    folder="movies"
                  />
                )}
                rules={{
                  required: 'Photo is required!',
                }}
              />

              <Controller
                control={control}
                name="videoUrl"
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <FilePicker
                    value={value}
                    onChange={onChange}
                    withImage
                    folder="movies"
                    gradient={['#4361a6', '#254584']}
                  />
                )}
                rules={{
                  required: 'Video is required!',
                }}
              />

              <Button onPress={handleSubmit(onSubmit)} icon="pen-tool">
                Update
              </Button>
            </ScrollView>
          )}
        </>
      )}
    </Layout>
  )
})

export default MovieEditScreen
