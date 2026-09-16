
import React from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';

export default function CompromissoList({ itens, onDelete, onToggle, tituloLista, listaVazia }) {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id} // key estável baseada no id, não no index
        contentContainerStyle={itens.length === 0 && styles.emptyContentContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>{listaVazia}</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable style={styles.itemTextArea} onPress={() => onToggle(item.id)}>
              <Text style={[styles.itemText, item.concluido && styles.itemTextDone]}>
                {item.texto}
              </Text>
              <Text style={styles.itemDate}>
                {new Date(item.criadoEm).toLocaleString('pt-BR')}
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.deleteButton, pressed && styles.deleteButtonPressed]}
              android_ripple={{ color: '#ffffff55' }}
              onPress={() => onDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Remover</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1, 
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  emptyContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemTextArea: {
    flex: 1,
    marginRight: 10,
  },
  itemText: {
    fontSize: 15,
    color: '#222',
  },
  itemTextDone: {
    
    textDecorationLine: 'line-through',
    color: '#999',
  },
  itemDate: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  deleteButtonPressed: {
    backgroundColor: '#c0392b',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
