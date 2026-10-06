import { View, Text, Pressable, StyleSheet } from 'react-native';

// Chips lado a lado, reutilizados no formulário e no filtro.
function CategoriaSelector({ categorias, selecionada, onSelecionar }) {
  return (
    <View style={styles.container}>
      {categorias.map((categoria) => {
        const ativa = categoria === selecionada;
        return (
          <Pressable
            key={categoria}
            onPress={() => onSelecionar(categoria)}
            style={[styles.chip, ativa && styles.chipAtivo]}
          >
            <Text style={[styles.texto, ativa && styles.textoAtivo]}>{categoria}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default CategoriaSelector;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
  },
  chipAtivo: { backgroundColor: '#4f46e5' },
  texto: { color: '#374151', fontWeight: '500' },
  textoAtivo: { color: '#fff' },
});
