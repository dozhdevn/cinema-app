import ActorEditScreen from '../screens/AdminScreen/screens/ActorEditScreen'
import ActorListScreen from '../screens/AdminScreen/screens/ActorListScreen'
import GenreEditScreen from '../screens/AdminScreen/screens/GenreEditScreen'
import GenreListScreen from '../screens/AdminScreen/screens/GenreListScreen'
import MovieEditScreen from '../screens/AdminScreen/screens/MovieEditScreen'
import MovieListScreen from '../screens/AdminScreen/screens/MovieListScreen'
import StatisticsScreen from '../screens/AdminScreen/screens/StatisticsScreen'
import UserEditScreen from '../screens/AdminScreen/screens/UserEditScreen'
import UsersScreen from '../screens/AdminScreen/screens/UsersScreen'
import { ADMIN_ROUTES_NAMES, Root } from './interfaces'

const adminRoutes: Root[] = [
  { name: ADMIN_ROUTES_NAMES.STATISTICS, component: StatisticsScreen },
  { name: ADMIN_ROUTES_NAMES.USERS, component: UsersScreen },
  { name: ADMIN_ROUTES_NAMES.MOVIE_LIST, component: MovieListScreen },
  { name: ADMIN_ROUTES_NAMES.GENRE_LIST, component: GenreListScreen },
  { name: ADMIN_ROUTES_NAMES.ACTOR_LIST, component: ActorListScreen },
  { name: ADMIN_ROUTES_NAMES.USER_EDIT, component: UserEditScreen },
  { name: ADMIN_ROUTES_NAMES.GENRE_EDIT, component: GenreEditScreen },
  { name: ADMIN_ROUTES_NAMES.ACTOR_EDIT, component: ActorEditScreen },
  { name: ADMIN_ROUTES_NAMES.MOVIE_EDIT, component: MovieEditScreen },
]

export default adminRoutes
