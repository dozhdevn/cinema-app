import React from 'react'
import { IStore } from './interfaces'

import auth from './AuthStore'
import user from './UserStore'
import movies from './MoviesStore'
import genres from './GenresStore'
import actors from './ActorsStore'
import admin from './AdminStore'

const storeInstance = {
  auth,
  user,
  movies,
  genres,
  actors,
  admin
}

export const storesContext = React.createContext<IStore>(storeInstance)

export const useStores = (): IStore => React.useContext<IStore>(storesContext)
