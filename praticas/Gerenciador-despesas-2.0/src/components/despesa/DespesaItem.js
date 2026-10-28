import { Platform, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getTheme } from '../../constants/theme';

export default function DespesaItem({ expense }) {
  const navigation = useNavigation();
  const theme = getTheme(useColorScheme());

  return (
    <Pressable
      onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: expense.id })}
      style={({ pressed }) => [styles.card, { backgroundColor: theme.card }, pressed && { opacity: 0.75 }]}
    >
      <View style={styles.info}>
        <Text style={[styles.description, { color: theme.text }]} numberOfLines={1}>
          {expense.description}
        </Text>
        <Text style={{ color: theme.textSecondary }}>
          {new Date(expense.date).toLocaleDateString('pt-BR')} · {expense.category}
        </Text>
      </View>
      <Text style={[styles.amount, { color: theme.primary }]}>R$ {expense.amount.toFixed(2)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginVertical: 6,
    borderRadius: 10,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4 },
      android: { elevation: 3 },
      default: { boxShadow: '0 2px 4px rgba(0,0,0,0.15)' },
    }),
  },
  info: { flex: 1, marginRight: 10 },
  description: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  amount: { fontSize: 16, fontWeight: 'bold' },
});
