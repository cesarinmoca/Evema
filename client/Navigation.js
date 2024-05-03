import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import NuevoEventoScreen from './views/Nuevo Evento/NuevoEventoScreen';
import ObservarEventosScreen from './views/Observar Evento/ObservarEventosScreen';
import LeerTicketsScreen from './views/Leer Tickets/LeerTicketsScreen';
import GestionarEventosScreen from './GestionarEventosScreen';
import DetallesEventoScreen from './views/Observar Evento/DetallesEventoScreen';
import DetallesTicketScreen from './views/Leer Tickets/DetallesTicketScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="NuevoEvento" component={NuevoEventoScreen} />
        <Stack.Screen name="ObservarEventos" component={ObservarEventosScreen} />
        <Stack.Screen name="LeerTickets" component={LeerTicketsScreen} />
        <Stack.Screen name="GestionarEventos" component={GestionarEventosScreen} />
        <Stack.Screen name="DetallesEvento" component={DetallesEventoScreen} />
        <Stack.Screen name="DetallesTicket" component={DetallesTicketScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
