import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import CategoriaSelector from '../components/despesa/CategoriaSelector';
import { CATEGORIAS } from '../data/despesas';
import { TODAS, filtrarPorCategoria } from '../util/filtro';

function TodasDespesas({ despesas }) {
  const [filtro, setFiltro] = useState(TODAS);
  const despesasFiltradas = filtrarPorCategoria(despesas, filtro);

  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>Filtrar por categoria</Text>
      <CategoriaSelector
        categorias={[TODAS, ...CATEGORIAS]}
        selecionada={filtro}
        onSelecionar={setFiltro}
      />
      <View style={styles.saida}>
        <DespesaSaida
          despesas={despesasFiltradas}
          periodo={filtro === TODAS ? 'Total' : `Total - ${filtro}`}
        />
      </View>
    </View>
  );
}

export default TodasDespesas;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  rotulo: { fontWeight: '600', marginBottom: 8, color: '#374151' },
  saida: { flex: 1, marginTop: 16 },
});
