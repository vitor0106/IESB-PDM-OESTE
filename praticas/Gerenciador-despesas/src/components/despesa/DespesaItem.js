import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFormatada } from '../../util/data';

function DespesaItem({ id, descricao, valor, data, categoria }) {
  const navigation = useNavigation();

  function editar() {
    navigation.navigate('GerenciarDespesa', { despesaId: id });
  }

  return (
    <Pressable onPress={editar} style={({ pressed }) => pressed && styles.pressionado}>
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.descricao}>{descricao}</Text>
          <Text style={styles.data}>{getDataFormatada(data)}</Text>
          <View style={styles.tag}>
            <Text style={styles.tagTexto}>{categoria}</Text>
          </View>
        </View>
        <View style={styles.valorBox}>
          <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  pressionado: { opacity: 0.75 },
  item: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#4f46e5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    elevation: 3,
  },
  info: { flex: 1 },
  descricao: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  data: { color: '#e0e7ff', marginBottom: 6 },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  tagTexto: { fontSize: 12, fontWeight: '600', color: '#374151' },
  valorBox: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 4,
    alignSelf: 'center',
    minWidth: 90,
    alignItems: 'center',
  },
  valor: { fontWeight: 'bold', color: '#4f46e5' },
});
