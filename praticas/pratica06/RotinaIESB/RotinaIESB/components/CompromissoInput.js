

  import React from 'react';
  import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

  export default function CompromissoInput({ value, onChangeText, onAdd, labels }) {
    return (
      <View style={styles.formArea}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={labels.placeholderCompromisso}
          placeholderTextColor="#999"
          returnKeyType="done"
          onSubmitEditing={onAdd}
        />

        <Pressable
          style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
          android_ripple={{ color: '#ffffff55' }}
          onPress={onAdd}
        >
          <Text style={styles.addButtonText}>{labels.botaoAdicionar}</Text>
        </Pressable>
      </View>
    );
  }

  const styles = StyleSheet.create({
    formArea: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    input: {
      width: '68%', 
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 15,
      backgroundColor: '#fff',
    },
    addButton: {
      width: '28%',
      backgroundColor: '#2f6fed',
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonPressed: {
      backgroundColor: '#1f4fbd',
    },
    addButtonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 14,
    },
  });
