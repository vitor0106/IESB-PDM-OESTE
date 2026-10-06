import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import CategoriaSelector from '../components/despesa/CategoriaSelector';
import { CATEGORIAS } from '../data/despesas';
import { TODAS, filtrarPorCategoria } from '../util/filtro';
import { getDataMenosDias } from '../util/data';

function DespesasRecentes({ despesas }) {
  const [filtro, setFiltro] = useState(TODAS);

  const limite = getDataMenosDias(new Date(), 7);
  const recentes = despesas.filter((despesa) => despesa.data >= limite);
  const despesasFiltradas = filtrarPorCategoria(recentes, filtro);

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
          periodo={filtro === TODAS ? 'Últimos 7 dias' : `Últimos 7 dias - ${filtro}`}
        />
      </View>
    </View>
  );
}

export default DespesasRecentes;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  rotulo: { fontWeight: '600', marginBottom: 8, color: '#374151' },
  saida: { flex: 1, marginTop: 16 },
});
