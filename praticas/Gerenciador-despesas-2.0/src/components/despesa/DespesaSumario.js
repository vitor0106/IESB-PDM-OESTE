import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { getTheme } from '../../constants/theme';

export default function DespesaSumario({ expenses }) {
  const theme = getTheme(useColorScheme());
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={{ color: theme.textSecondary }}>
        {expenses.length} {expenses.length === 1 ? 'despesa' : 'despesas'}
      </Text>
      <Text style={[styles.total, { color: theme.text }]}>Total: R$ {total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 6,
  },
  total: { fontSize: 16, fontWeight: 'bold' },
});
