import { createElement, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const pad = (n) => String(n).padStart(2, '0');
const toInputValue = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Seletor de data por plataforma: web usa <input type="date">, iOS usa o picker compacto
// e Android abre o diálogo nativo ao tocar no campo.
export default function CampoData({ value, onChange, theme, scheme, hasError }) {
  const [showAndroid, setShowAndroid] = useState(false);
  const borderColor = hasError ? theme.error : theme.border;

  if (Platform.OS === 'web') {
    return createElement('input', {
      type: 'date',
      value: toInputValue(value),
      onChange: (e) => {
        const [y, m, d] = e.target.value.split('-').map(Number);
        if (y && m && d) onChange(new Date(y, m - 1, d, 12));
      },
      style: {
        backgroundColor: theme.inputBg,
        color: theme.text,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        fontFamily: 'inherit',
        colorScheme: scheme === 'dark' ? 'dark' : 'light',
      },
    });
  }

  if (Platform.OS === 'ios') {
    return (
      <DateTimePicker
        value={value}
        mode="date"
        display="compact"
        themeVariant={scheme === 'dark' ? 'dark' : 'light'}
        onChange={(_e, selected) => selected && onChange(selected)}
        style={styles.iosPicker}
      />
    );
  }

  return (
    <>
      <Pressable
        style={[styles.field, { backgroundColor: theme.inputBg, borderColor }]}
        onPress={() => setShowAndroid(true)}
      >
        <Text style={{ color: theme.text }}>{value.toLocaleDateString('pt-BR')}</Text>
      </Pressable>
      {showAndroid && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={(_e, selected) => {
            setShowAndroid(false);
            if (selected) onChange(selected);
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  field: { borderWidth: 1.5, borderRadius: 8, padding: 12 },
  iosPicker: { alignSelf: 'flex-start' },
});
