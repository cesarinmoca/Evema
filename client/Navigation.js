import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import NuevoEventoScreen from './views/Nuevo Evento/NuevoEventoScreen';
import ObservarEventosScreen from './views/Observar Evento/ObservarEventosScreen';
import LeerTicketsScreen from './views/Leer Tickets/LeerTicketsScreen';
import DetallesEventoScreen from './views/Observar Evento/DetallesEventoScreen';
import DetallesEventoAlumnoScreen from './views/Observar Evento/DetallesEventoAlumnoScreen';
import DetallesTicketScreen from './views/Leer Tickets/DetallesTicketScreen';
import HomeAlumnoScreen from './HomeAlumnoScreen';
import ObservarEventosAlumnoScreen from './views/Observar Evento/ObservarEventosAlumnoScreen';
import EditarEventoScreen from './views/Observar Evento/EditarEventoScreen';
import TusEventosAlumno from './views/Observar Evento/TusEventosAlumno';
import DetallesEventoInscritosAlumno from './views/Observar Evento/DetallesEventoInscritosAlumno';

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
        <Stack.Screen name="DetallesEvento" component={DetallesEventoScreen} />
        <Stack.Screen name="DetallesTicket" component={DetallesTicketScreen} />
        <Stack.Screen name="HomeAlumno" component={HomeAlumnoScreen} />
        <Stack.Screen name="DetallesEventoAlumno" component={DetallesEventoAlumnoScreen} />
        <Stack.Screen name="ObservarEventosAlumno" component={ObservarEventosAlumnoScreen} />
        <Stack.Screen name="EditarEvento" component={EditarEventoScreen} />
        <Stack.Screen name="TusEventosAlumno" component={TusEventosAlumno} />
        <Stack.Screen name="DetallesEventoInscritosAlumno" component={DetallesEventoInscritosAlumno} />


        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
