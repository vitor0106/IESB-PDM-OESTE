import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CategoriaSelector from '../components/despesa/CategoriaSelector';
import { CATEGORIAS } from '../data/despesas';
import { getDataFormatada } from '../util/data';

function GerenciarDespesa({ route, navigation, despesas, onAdicionar, onAtualizar, onExcluir }) {
  const despesaId = route.params?.despesaId;
  const despesaEditada = despesas.find((d) => d.id === despesaId);
  const editando = !!despesaEditada;

  const [descricao, setDescricao] = useState(despesaEditada?.descricao ?? '');
  const [valor, setValor] = useState(despesaEditada ? despesaEditada.valor.toFixed(2) : '');
  const [data, setData] = useState(despesaEditada?.data ?? new Date());
  const [categoria, setCategoria] = useState(despesaEditada?.categoria ?? '');
  const [mostrarPicker, setMostrarPicker] = useState(false);

  // Aceita no máximo duas casas decimais.
  function tratarValor(texto) {
    if (/^\d*\.?\d{0,2}$/.test(texto)) {
      setValor(texto);
    }
  }

  function aoMudarData(evento, dataSelecionada) {
    setMostrarPicker(false);
    if (evento.type !== 'dismissed' && dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  function confirmar() {
    const valorNumerico = parseFloat(valor);

    if (!descricao.trim() || !valor || isNaN(valorNumerico) || valorNumerico <= 0 || !categoria) {
      Alert.alert('Dados inválidos', 'Preencha descrição, valor (maior que zero) e categoria.');
      return;
    }

    const dados = { descricao: descricao.trim(), valor: valorNumerico, data, categoria };

    if (editando) {
      onAtualizar(despesaId, dados);
    } else {
      onAdicionar(dados);
    }
    navigation.goBack();
  }

  function excluir() {
    onExcluir(despesaId);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex: Almoço"
      />

      <Text style={styles.rotulo}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={tratarValor}
        keyboardType="decimal-pad"
        placeholder="0.00"
      />

      <Text style={styles.rotulo}>Data</Text>
      <Pressable style={styles.input} onPress={() => setMostrarPicker(true)}>
        <Text>{getDataFormatada(data)}</Text>
      </Pressable>
      {mostrarPicker && (
        <DateTimePicker
          value={data}
          mode="date"
          maximumDate={new Date()}
          onChange={aoMudarData}
        />
      )}

      <Text style={styles.rotulo}>Categoria</Text>
      <CategoriaSelector categorias={CATEGORIAS} selecionada={categoria} onSelecionar={setCategoria} />

      <View style={styles.botoes}>
        <Pressable style={[styles.botao, styles.cancelar]} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelarTexto}>Cancelar</Text>
        </Pressable>
        <Pressable style={[styles.botao, styles.confirmar]} onPress={confirmar}>
          <Text style={styles.confirmarTexto}>{editando ? 'Atualizar' : 'Adicionar'}</Text>
        </Pressable>
      </View>

      {editando && (
        <Pressable style={styles.excluir} onPress={excluir}>
          <Text style={styles.excluirTexto}>Excluir despesa</Text>
        </Pressable>
      )}
    </View>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  rotulo: { fontWeight: '600', marginTop: 16, marginBottom: 6, color: '#374151' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  botoes: { flexDirection: 'row', gap: 12, marginTop: 28 },
  botao: { flex: 1, padding: 14, borderRadius: 6, alignItems: 'center' },
  cancelar: { backgroundColor: '#e5e7eb' },
  cancelarTexto: { color: '#374151', fontWeight: '600' },
  confirmar: { backgroundColor: '#4f46e5' },
  confirmarTexto: { color: '#fff', fontWeight: '600' },
  excluir: { marginTop: 24, alignItems: 'center' },
  excluirTexto: { color: 'red', fontWeight: '600' },
});
