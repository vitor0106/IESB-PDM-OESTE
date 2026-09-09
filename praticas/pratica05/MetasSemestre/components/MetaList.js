import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';

function MetaItem({ item, onDelete, onToggle }) {
  return (
    <View style={styles.item}>
      <Pressable
        style={styles.textArea}
        onPress={() => onToggle(item.id)}
        android_ripple={{ color: '#eee' }}
      >
        <Text style={[styles.texto, item.concluida && styles.riscado]}>
          {item.texto}
        </Text>
        <Text style={styles.data}>
          {new Date(item.criadaEm).toLocaleDateString()}
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed,
        ]}
        android_ripple={{ color: '#ffffff55' }}
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles.deleteText}>Excluir</Text>
      </Pressable>
    </View>
  );
}

export default function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Nenhuma meta cadastrada ainda.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 12, gap: 8 }}
      renderItem={({ item }) => (
        <MetaItem item={item} onDelete={onDelete} onToggle={onToggle} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 1,
  },
  textArea: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  texto: {
    fontSize: 16,
  },
  riscado: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  data: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#e63946',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  deleteButtonPressed: {
    opacity: 0.8,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  empty: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
  },
});