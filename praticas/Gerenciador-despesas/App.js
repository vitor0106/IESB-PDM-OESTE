import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';
import { DESPESAS_INICIAIS } from './src/data/despesas';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Abas({ despesas }) {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('GerenciarDespesa')} style={{ marginRight: 16 }}>
            <Ionicons name="add" size={28} color="#4f46e5" />
          </Pressable>
        ),
        tabBarActiveTintColor: '#4f46e5',
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        options={{
          title: 'Recentes',
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />,
        }}
      >
        {() => <DespesasRecentes despesas={despesas} />}
      </Tab.Screen>
      <Tab.Screen
        name="TodasDespesas"
        options={{
          title: 'Todas',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
        }}
      >
        {() => <TodasDespesas despesas={despesas} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function adicionar(dados) {
    const id = `d${Date.now()}`;
    setDespesas((atuais) => [{ id, ...dados }, ...atuais]);
  }

  function atualizar(id, dados) {
    setDespesas((atuais) => atuais.map((d) => (d.id === id ? { id, ...dados } : d)));
  }

  function excluir(id) {
    setDespesas((atuais) => atuais.filter((d) => d.id !== id));
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Abas" options={{ headerShown: false }}>
            {() => <Abas despesas={despesas} />}
          </Stack.Screen>
          <Stack.Screen
            name="GerenciarDespesa"
            options={{ title: 'Gerenciar Despesa', presentation: 'modal' }}
          >
            {(props) => (
              <GerenciarDespesa
                {...props}
                despesas={despesas}
                onAdicionar={adicionar}
                onAtualizar={atualizar}
                onExcluir={excluir}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
