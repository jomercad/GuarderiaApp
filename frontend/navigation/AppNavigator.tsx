import { createStackNavigator } from "@react-navigation/stack";
import InicioScreen from "../screens/InicioScreen";
import RegistroEstudiantesScreen from "../screens/RegistroEstudiantesScreen";
import ListaEstudiantesScreen from "../screens/ListaEstudiantesScreen";
import DetallesEstudianteScreen from "../screens/DetallesEstudianteScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={InicioScreen} />
      <Stack.Screen
        name="RegistroEstudiantes"
        component={RegistroEstudiantesScreen}
      />
      <Stack.Screen
        name="ListaEstudiantes"
        component={ListaEstudiantesScreen}
      />
      <Stack.Screen
        name="DetallesEstudiante"
        component={DetallesEstudianteScreen}
      />
    </Stack.Navigator>
  );
}
