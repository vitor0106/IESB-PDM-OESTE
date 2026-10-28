import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const screens = [
  { name: 'index', title: 'Início', icon: 'home' },
  { name: 'tasks', title: 'Tarefas', icon: 'checkbox' },
  { name: 'wallet', title: 'Bolso', icon: 'wallet' },
  { name: 'profile', title: 'Perfil', icon: 'person' },
];

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#2563eb' }}>
      {screens.map((s) => (
        <Tabs.Screen
          key={s.name}
          name={s.name}
          options={{
            title: s.title,
            tabBarIcon: ({ color, size }) => <Ionicons name={s.icon} size={size} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}
