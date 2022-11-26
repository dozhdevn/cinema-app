import { ComponentType } from 'react'

export enum TABS_NAMES {
  MAIN = 'Main',
  AUTH = 'Auth',
  HOME = 'Home',
  PROFILE = 'Profile',
  FAVORITES = 'Favorites',
  TRENDING = 'Trending',
  SEARCH = 'Search',
  MOVIE = 'Movie',
  GENRE = 'Genre',
  ACTOR = 'Actor',
}

export enum ADMIN_ROUTES_NAMES {
  ADMIN = 'Admin',
  STATISTICS = 'Statistics',
  USERS = 'Users',
  MOVIE_LIST = 'MovieList',
  GENRE_LIST = 'GenreList',
  ACTOR_LIST = 'ActorList',
  USER_EDIT = 'UserEdit',
  GENRE_EDIT = 'GenreEdit',
  ACTOR_EDIT = 'ActorEdit',
  MOVIE_EDIT = 'MovieEdit'
}

export type TypeRootStackParamList = {
  Main: undefined
  Auth: undefined
  Home: undefined
  Profile: undefined
  Favorites: undefined
  Trending: undefined
  Search: undefined
  Movie: {
    slug: string
  }
  Genre: {
    slug: string
  }
  Actor: {
    slug: string
  }
} & TypeRootStackAdminList

export type TypeRootStackAdminList = {
  Admin: undefined
  Statistics: undefined
  Users: undefined
  MovieList: undefined
  GenreList: undefined
  ActorList: undefined
  UserEdit: {
    id: string
  }
  GenreEdit: {
    id: string
  }
  ActorEdit: {
    id: string
  }
  MovieEdit: {
    id: string
  }
}


export interface Root {
  name: keyof TypeRootStackParamList
  component: ComponentType
  isAdmin?: boolean
  isMain?: boolean
}

