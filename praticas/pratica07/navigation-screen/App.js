import { StyleSheet, TouchableOpacity } from 'react-native'; // Adicionado TouchableOpacity
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodasDespesas from './Screens/TodasDespesas';
import DespesasRecentes from './Screens/DespesasRecentes';
import GerenciarDespesa from './Screens/GerenciasDespesas';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function BottonTabScreen() {
    return (
      <Tab.Navigator
        screenOptions={({ navigation }) => ({
          // Substituímos o IconButton não definido pelo TouchableOpacity + Ionicons
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('GerenciarDespesa')}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>
          )
        })}
      >
        <Tab.Screen 
          name="DespesasRecentes" 
          component={DespesasRecentes}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="hourglass" size={size} color={color} />
            ),
            tabBarLabel: 'Recentes',
            title: 'Despesas Recentes',
            tabBarLabelStyle: { fontSize: 12 }
          }}
        />
        <Tab.Screen 
          name="TodasDespesas" 
          component={TodasDespesas}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="wallet-outline" size={size} color={color} />
            ),
            tabBarLabel: 'Todas',
            title: 'Todas as Despesas',
            tabBarLabelStyle: { fontSize: 12 }
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Despesas' 
          component={BottonTabScreen} 
          options={{ headerShown: false }} // Esconde o cabeçalho duplicado do Stack
        />
        <Stack.Screen name='GerenciarDespesa' component={GerenciarDespesa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});