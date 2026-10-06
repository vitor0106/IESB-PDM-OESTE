import { FlatList, Text, StyleSheet } from 'react-native';
import DespesaItem from './DespesaItem';

function renderItem({ item }) {
  return <DespesaItem {...item} />;
}

function DespesaLista({ despesas }) {
  return (
    <FlatList
      data={despesas}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<Text style={styles.vazio}>Nenhuma despesa encontrada.</Text>}
    />
  );
}

export default DespesaLista;

const styles = StyleSheet.create({
  vazio: { textAlign: 'center', marginTop: 32, color: '#6b7280' },
});
