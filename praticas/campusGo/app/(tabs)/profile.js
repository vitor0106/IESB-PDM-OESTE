import { useEffect, useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function Profile() {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(PHOTO_KEY)
      .then((uri) => uri && setPhoto(uri))
      .catch(() => {});
  }, []);

  async function savePhoto(uri) {
    if (!uri) return;
    setPhoto(uri);
    try {
      await AsyncStorage.setItem(PHOTO_KEY, uri);
    } catch {
      // mantém a foto na tela mesmo se não conseguir salvar
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={async () => savePhoto(await pickImage())}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text style={styles.placeholderText}>Toque para escolher</Text>
          </View>
        )}
      </Pressable>
      <Text style={styles.name}>Estudante CampusGo</Text>
      <Button title="Tirar foto" onPress={async () => savePhoto(await takePhoto())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
  avatar: { width: 150, height: 150, borderRadius: 75 },
  placeholder: { backgroundColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: '#555', textAlign: 'center', paddingHorizontal: 12 },
  name: { fontSize: 20, fontWeight: '600' },
});
