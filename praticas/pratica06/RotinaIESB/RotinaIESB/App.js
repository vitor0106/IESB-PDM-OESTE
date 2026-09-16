

  import React, { useState, useEffect } from 'react';
  import { View, Text, Image, StyleSheet, Alert } from 'react-native';
  import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  import * as labels from './labels';
  import CompromissoInput from './components/CompromissoInput';
  import CompromissoList from './components/CompromissoList';

  const STORAGE_KEY = '@rotina_iesb_compromissos';

  export default function App() {
    const [texto, setTexto] = useState('');
    const [compromissos, setCompromissos] = useState([]);
    const [carregado, setCarregado] = useState(false);

  
    useEffect(() => {
      async function carregarCompromissos() {
        try {
          const dados = await AsyncStorage.getItem(STORAGE_KEY);
          if (dados) {
            setCompromissos(JSON.parse(dados));
          }
        } catch (erro) {
          Alert.alert('Erro', 'Não foi possível carregar seus compromissos salvos.');
        } finally {
          setCarregado(true);
        }
      }
      carregarCompromissos();
    }, []);

    
    useEffect(() => {
      if (!carregado) return; // evita sobrescrever antes do primeiro carregamento
      async function salvarCompromissos() {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
        } catch (erro) {
          Alert.alert('Erro', 'Não foi possível salvar seus compromissos.');
        }
      }
      salvarCompromissos();
    }, [compromissos, carregado]);

    function adicionarCompromisso() {
      const textoLimpo = texto.trim();
      if (textoLimpo.length === 0) {
        Alert.alert('Atenção', 'Digite um compromisso antes de adicionar.');
        return;
      }

      const novoCompromisso = {
        id: Date.now().toString(), // identificador único
        texto: textoLimpo,
        criadoEm: new Date().toISOString(),
        concluido: false,
      };

      setCompromissos((listaAtual) => [novoCompromisso, ...listaAtual]);
      setTexto('');
    }

    function removerCompromisso(id) {
      setCompromissos((listaAtual) => listaAtual.filter((item) => item.id !== id));
    }

    
    function alternarConcluido(id) {
      setCompromissos((listaAtual) =>
        listaAtual.map((item) => (item.id === id ? { ...item, concluido: !item.concluido } : item))
      );
    }

    const pendentes = compromissos.filter((item) => !item.concluido).length;

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image source={require('./assets/logo.png')} style={styles.logo} />
              <View style={styles.headerTextArea}>
                <Text style={styles.headerTitle}>{labels.tituloApp}</Text>
                {/* Desafio opcional O3 — contador de pendentes */}
                <Text style={styles.headerCounter}>{labels.contadorPendentes(pendentes)}</Text>
              </View>
            </View>

            <CompromissoInput
              value={texto}
              onChangeText={setTexto}
              onAdd={adicionarCompromisso}
              labels={labels}
            />

            <CompromissoList
              itens={compromissos}
              onDelete={removerCompromisso}
              onToggle={alternarConcluido}
              tituloLista={labels.tituloLista}
              listaVazia={labels.listaVazia}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#f2f4f7',
    },
    container: {
      flex: 1, 
      paddingHorizontal: 16,
      paddingTop: 12,
    },
    header: {
      flexDirection: 'row', 
      alignItems: 'center', 
      marginBottom: 20,
    },
    logo: {
      width: 48,
      height: 48,
      borderRadius: 8,
      marginRight: 12,
    },
    headerTextArea: {
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#222',
    },
    headerCounter: {
      fontSize: 13,
      color: '#666',
      marginTop: 2,
    },
  });

