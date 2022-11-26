import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TypeRootStackParamList } from "../navigation/interfaces";

export const useTypedNavigation = () => useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>()