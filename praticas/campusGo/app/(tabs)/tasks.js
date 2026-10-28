import { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function Tasks() {
  const router = useRouter();
  const [place, setPlace] = useState(null);

  async function handleCheckIn() {
    try {
      const found = await getCurrentPlace();
      if (!found) {
        Alert.alert('Sem permissão', 'Permita a localização para fazer o check-in.');
        return;
      }
      setPlace(found);
    } catch {
      Alert.alert('Localização indisponível', 'Não foi possível obter sua posição agora.');
    }
  }

  async function handleReminder() {
    try {
      const id = await scheduleReminder('Hora de estudar!', 10);
      if (!id) {
        Alert.alert('Sem permissão', 'Permita as notificações para receber o lembrete.');
        return;
      }
      Alert.alert('Lembrete agendado', 'Você será avisado em 10 segundos.');
    } catch {
      Alert.alert('Erro', 'Não foi possível agendar o lembrete.');
    }
  }

  async function handleComplete() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      // sem vibração (emulador): segue normalmente
    }
    Alert.alert('Tarefa concluída');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <Link href="/task/42" asChild>
        <Button title="Abrir tarefa 42" />
      </Link>
      <Button title="Nova tarefa" onPress={() => router.push('/new-task')} />

      <View style={styles.section}>
        <Button title="Estudei aqui" onPress={handleCheckIn} />
        {place && <Text style={styles.place}>📍 {place.label}</Text>}
      </View>

      <Button title="Lembrar em 10 s" onPress={handleReminder} />
      <Button title="Concluir" onPress={handleComplete} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 14 },
  title: { fontSize: 24, fontWeight: '700' },
  section: { gap: 8 },
  place: { fontSize: 15, color: '#065f46' },
});
