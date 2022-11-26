import { RouteProp, useRoute } from "@react-navigation/native";
import { TypeRootStackParamList } from "../navigation/interfaces";

export const useTypedRoute = <N extends keyof TypeRootStackParamList>() =>
	useRoute<RouteProp<TypeRootStackParamList, N>>()