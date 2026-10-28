import { useMemo } from 'react';
import { View, useColorScheme } from 'react-native';
import { getTheme } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes() {
  const theme = getTheme(useColorScheme());
  const { expenses } = useExpenses();

  const recent = useMemo(() => {
    const limit = new Date();
    limit.setDate(limit.getDate() - 7);
    limit.setHours(0, 0, 0, 0);
    return expenses.filter((e) => new Date(e.date) >= limit);
  }, [expenses]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <DespesaSaida expenses={recent} emptyMessage="Nenhuma despesa nos últimos 7 dias." />
    </View>
  );
}
