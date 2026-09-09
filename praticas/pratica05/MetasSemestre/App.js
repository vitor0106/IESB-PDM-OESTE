import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './components/Metainput';
import MetaList from './components/Metalist';

const CHAVE_STORAGE = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);

  const [carregado, setCarregado] = useState(false);


  useEffect(() => {
    async function carregarMetas() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(CHAVE_STORAGE);
        if (dadosSalvos !== null) {
          setMetas(JSON.parse(dadosSalvos));
        }
      } catch (erro) {
        console.log('Erro ao carregar metas:', erro);
        Alert.alert(
          'Ops!',
          'Não foi possível carregar suas metas salvas anteriormente.'
        );
      } finally {
        setCarregado(true);
      }
    }

    carregarMetas();
  }, []);


  useEffect(() => {
    if (!carregado) return;

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(metas));
      } catch (erro) {
        console.log('Erro ao salvar metas:', erro);
        Alert.alert('Ops!', 'Não foi possível salvar suas metas.');
      }
    }

    salvarMetas();
  }, [metas, carregado]);

  function handleAdicionarMeta() {
    const textoLimpo = texto.trim();

    if (textoLimpo.length === 0) {
      Alert.alert('Atenção', 'Digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };


    setMetas((metasAtuais) => [...metasAtuais, novaMeta]);
    setTexto('');
  }

  function handleRemoverMeta(id) {

    setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== id));
  }

  function handleToggleConcluida(id) {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  }

  const pendentes = metas.filter((meta) => !meta.concluida).length;
  const concluidas = metas.filter((meta) => meta.concluida).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.header}>
          <Image source={require('./assets/icon.png')} style={styles.logo} />
          <View style={styles.headerTextos}>
            <Text style={styles.titulo}>Metas do Semestre</Text>
            <Text style={styles.contador}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        <MetaInput
          value={texto}
          onChangeText={setTexto}
          onAdd={handleAdicionarMeta}
        />

        <MetaList
          metas={metas}
          onDelete={handleRemoverMeta}
          onToggle={handleToggleConcluida}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  headerTextos: {
    flex: 1,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  contador: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
});