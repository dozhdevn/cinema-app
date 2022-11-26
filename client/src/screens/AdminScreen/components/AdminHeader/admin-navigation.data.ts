import { TypeMaterialIconNames } from "../../../../interfaces"
import { ADMIN_ROUTES_NAMES, TypeRootStackParamList } from "../../../../navigation/interfaces"

interface NavItem {
  icon: TypeMaterialIconNames
  title: string
  routeName: keyof TypeRootStackParamList
}

export const navItems: NavItem[] = [
	{
		icon: 'insert-chart-outlined',
		title: 'Statistics',
		routeName: ADMIN_ROUTES_NAMES.STATISTICS
	},
	{
		icon: 'group',
		title: 'Users',
		routeName: ADMIN_ROUTES_NAMES.USERS
	},
	{
		icon: 'movie-filter',
		title: 'Movies',
		routeName: ADMIN_ROUTES_NAMES.MOVIE_LIST
	},
	{
		icon: 'recent-actors',
		title: 'Actors',
		routeName: ADMIN_ROUTES_NAMES.ACTOR_LIST
	},
	{
		icon: 'category',
		title: 'Genres',
		routeName: ADMIN_ROUTES_NAMES.GENRE_LIST
	}
]