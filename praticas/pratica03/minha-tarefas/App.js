import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';


import outro_nome, { titulo } from './util'; 

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{margin: 20}}>{titulo}</Text>
      <Text>{outro_nome}</Text>
      <Text style={styles.text}>{titulo}</Text>
      <Button title="Clique aqui" onPress={() => console.log('Clicou!')} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 20,
    fontSize: 26,
  }
});