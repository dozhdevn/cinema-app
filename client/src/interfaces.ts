import { Feather, MaterialIcons } from '@expo/vector-icons'
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form'
import { TextInputProps } from 'react-native'

export interface User {
  _id: string
  email: string
  password: string
  createdAt: string
  isAdmin: boolean
}

export type AuthFormData = Pick<User, 'email' | 'password'>

export type TypeFeatherIconNames = keyof typeof Feather.glyphMap
export type TypeMaterialIconNames = keyof typeof MaterialIcons.glyphMap

export interface IField<T extends FieldValues>
  extends Omit<TextInputProps, 'onChange' | 'onChangeText' | 'value'> {
  control: Control<T>
  name: FieldPath<T>
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
}

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse extends Tokens {
  user: User
}

export interface Parameters {
  year: number
  duration: number
  country: string
}

export interface Actor {
  _id: string
  photo: string
  name: string
  countMovies: number
  slug: string
}

export interface Genre {
  _id: string
  name: string
  slug: string
  description: string
}

export interface Movie {
  _id: string
  poster: string
  title: string
  parameters: Parameters
  genres: Genre[]
  actors: Actor[]
  countOpened: number
  videoUrl: string
  rating: number
  slug: string
}

export interface SearchFormData {
  searchTerm: string
}

export interface TableItem {
  _id: string
  editNavigate: () => void
  removeHandler: (id: string) => void
  headlines: string[]
}
