import { ActivityIndicator, Button, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import FadeIn from '../../components/FadeIn';
import { useNotices } from '../../hooks/useNotices';

export default function Home() {
  const { notices, isLoading, error, reload } = useNotices();

  if (isLoading && notices.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.muted}>Carregando avisos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Tentar novamente" onPress={reload} />
      </View>
    );
  }

  return (
    <FlatList
      data={notices}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={reload} />}
      ListEmptyComponent={<Text style={styles.muted}>Nenhum aviso por enquanto.</Text>}
      renderItem={({ item, index }) => (
        <FadeIn delay={index * 60} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardBody}>{item.body}</Text>
        </FadeIn>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  list: { padding: 16, gap: 12, flexGrow: 1 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, elevation: 2, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6, textTransform: 'capitalize' },
  cardBody: { color: '#444' },
  muted: { color: '#666', textAlign: 'center' },
  error: { color: '#b91c1c', textAlign: 'center', fontSize: 16 },
});
