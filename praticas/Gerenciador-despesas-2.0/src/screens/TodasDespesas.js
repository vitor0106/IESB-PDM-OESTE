import { useMemo, useState } from 'react';
import { StyleSheet, TextInput, View, useColorScheme } from 'react-native';
import { getTheme } from '../constants/theme';
import useDebounce from '../hooks/useDebounce';
import { useExpenses } from '../store/expenses-context';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function TodasDespesas() {
  const theme = getTheme(useColorScheme());
  const { expenses } = useExpenses();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const isSearching = debouncedSearch.trim().length > 0;

  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    if (!term) return expenses;
    return expenses.filter((e) => e.description.toLowerCase().includes(term));
  }, [expenses, debouncedSearch]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        style={[styles.search, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
        placeholder="Buscar por descrição"
        placeholderTextColor={theme.textSecondary}
        value={search}
        onChangeText={setSearch}
        autoCorrect={false}
      />
      <DespesaSaida
        expenses={filtered}
        emptyMessage={isSearching ? 'Nenhum resultado encontrado.' : 'Nenhuma despesa.'}
        emptyHint={isSearching ? 'Tente outro termo de busca.' : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: { margin: 16, marginBottom: 0, padding: 10, borderRadius: 8, borderWidth: 1, fontSize: 16 },
});
