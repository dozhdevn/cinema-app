import { ADMIN_ROUTES_NAMES, Root, TABS_NAMES } from './interfaces'
import ActorScreen from '../screens/ActorScreen'
import AdminScreen from '../screens/AdminScreen/AdminScreen'
import FavoritesScreen from '../screens/FavoritesScreen/FavoritesScreen'
import GenreScreen from '../screens/GenreScreen'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import MovieScreen from '../screens/MovieScreen'
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
import SearchScreen from '../screens/SearchScreen/SearchScreen'
import TrendingScreen from '../screens/TrendingScreen/TrendingScreen'

export const userRoutes: Root[] = [
  {
    name: TABS_NAMES.HOME,
    component: HomeScreen,
    isMain: true,
  },
  {
    name: TABS_NAMES.TRENDING,
    component: TrendingScreen,
    isMain: true,
  },
  {
    name: TABS_NAMES.SEARCH,
    component: SearchScreen,
    isMain: true,
  },
  {
    name: TABS_NAMES.FAVORITES,
    component: FavoritesScreen,
    isMain: true,
  },
  {
    name: TABS_NAMES.PROFILE,
    component: ProfileScreen,
    isMain: true,
  },
  {
    name: TABS_NAMES.MOVIE,
    component: MovieScreen,
    isMain: false,
  },
  {
    name: TABS_NAMES.GENRE,
    component: GenreScreen,
    isMain: false,
  },
  {
    name: TABS_NAMES.ACTOR,
    component: ActorScreen,
    isMain: false,
  },
  {
    name: ADMIN_ROUTES_NAMES.ADMIN,
    component: AdminScreen,
    isMain: false,
  },
]
