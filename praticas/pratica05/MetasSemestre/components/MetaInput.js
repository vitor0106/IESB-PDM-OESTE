import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma meta de estudo..."
        value={value}
        onChangeText={onChangeText}
        returnKeyType="done"
        onSubmitEditing={onAdd}
      />
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        android_ripple={{ color: '#ffffff55' }}
        onPress={onAdd}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4361ee',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});