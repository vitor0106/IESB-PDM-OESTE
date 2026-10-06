import { View, Text, StyleSheet } from 'react-native';

const LIMITE = 200;

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.valor, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, somaDespesas > LIMITE && styles.somaAlta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#e0e7ff',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodo: { fontSize: 14, color: '#3730a3' },
  soma: { fontSize: 16, fontWeight: 'bold', color: '#3730a3' },
  somaAlta: { color: 'red' }, // Bônus: acima de R$ 200,00
});
