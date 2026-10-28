import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function NewTask() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova tarefa</Text>
      <Text>Aqui ficará o formulário de nova tarefa.</Text>
      <Button title="Fechar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
  title: { fontSize: 22, fontWeight: '600' },
});
