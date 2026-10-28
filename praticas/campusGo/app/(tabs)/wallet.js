import { Button, Share, StyleSheet, Text, View } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function Wallet() {
  const { expenses } = useExpenses();
  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  function handleShare() {
    Share.share({ message: `Gastei R$ ${total.toFixed(2)} neste semestre.` }).catch(() => {});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total gasto</Text>
      <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
      {expenses.length === 0 && <Text style={styles.muted}>Nenhuma despesa cadastrada.</Text>}
      <Button title="Compartilhar resumo" onPress={handleShare} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  label: { fontSize: 16, color: '#666' },
  total: { fontSize: 40, fontWeight: '700' },
  muted: { color: '#666' },
});
