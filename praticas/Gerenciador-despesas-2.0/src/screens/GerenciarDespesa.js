import { useCallback, useLayoutEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, getTheme } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';
import CampoData from '../components/despesa/CampoData';

const AMOUNT_REGEX = /^\d*\.?\d{0,2}$/;

function FieldError({ message, color }) {
  return message ? <Text style={[styles.error, { color }]}>{message}</Text> : null;
}

function validate(values) {
  const errors = {};
  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }
  const amount = parseFloat(values.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  if (values.date > endOfToday) {
    errors.date = 'A data não pode ser futura.';
  }
  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }
  return errors;
}

export default function GerenciarDespesa({ route, navigation }) {
  const scheme = useColorScheme();
  const theme = getTheme(scheme);
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const editingExpense = expenses.find((e) => e.id === expenseId);

  const [form, setForm] = useState(() => ({
    description: editingExpense?.description ?? '',
    amount: editingExpense ? String(editingExpense.amount) : '',
    date: editingExpense ? new Date(editingExpense.date) : new Date(),
    category: editingExpense?.category ?? '',
  }));
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (field, value) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (errors[field]) {
      const fieldError = validate(next)[field];
      setErrors((prev) => {
        const updated = { ...prev };
        if (fieldError) updated[field] = fieldError;
        else delete updated[field];
        return updated;
      });
    }
  };

  const handleAmountChange = (text) => {
    const normalized = text.replace(',', '.');
    if (AMOUNT_REGEX.test(normalized)) handleChange('amount', normalized);
  };

  const handleDelete = useCallback(() => {
    Alert.alert('Excluir despesa', 'Tem certeza que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }, [deleteExpense, expenseId, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
      headerRight: isEditing
        ? () => (
            <Pressable onPress={handleDelete} hitSlop={10} accessibilityLabel="Excluir despesa">
              <Ionicons name="trash-outline" size={24} color={theme.error} />
            </Pressable>
          )
        : undefined,
    });
  }, [navigation, isEditing, handleDelete, theme.error]);

  const handleSave = () => {
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date.toISOString(),
      category: form.category,
    };
    if (isEditing) updateExpense(expenseId, data);
    else addExpense(data);
    navigation.goBack();
  };

  const inputStyle = (field) => [
    styles.input,
    { backgroundColor: theme.inputBg, color: theme.text, borderColor: errors[field] ? theme.error : theme.border },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={[styles.label, { color: theme.text }]}>Descrição</Text>
        <TextInput
          style={inputStyle('description')}
          value={form.description}
          onChangeText={(t) => handleChange('description', t)}
          placeholder="Ex.: Almoço"
          placeholderTextColor={theme.textSecondary}
        />
        <FieldError message={errors.description} color={theme.error} />

        <Text style={[styles.label, { color: theme.text }]}>Valor (R$)</Text>
        <TextInput
          style={inputStyle('amount')}
          value={form.amount}
          onChangeText={handleAmountChange}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={theme.textSecondary}
        />
        <FieldError message={errors.amount} color={theme.error} />

        <Text style={[styles.label, { color: theme.text }]}>Data</Text>
        <CampoData
          value={form.date}
          onChange={(date) => handleChange('date', date)}
          theme={theme}
          scheme={scheme}
          hasError={!!errors.date}
        />
        <FieldError message={errors.date} color={theme.error} />

        <Text style={[styles.label, { color: theme.text }]}>Categoria</Text>
        <Pressable style={inputStyle('category')} onPress={() => setModalVisible(true)}>
          <Text style={{ color: form.category ? theme.text : theme.textSecondary }}>
            {form.category || 'Selecione uma categoria'}
          </Text>
        </Pressable>
        <FieldError message={errors.category} color={theme.error} />

        <Pressable style={[styles.saveButton, { backgroundColor: theme.primary }]} onPress={handleSave}>
          <Text style={[styles.saveText, { color: theme.onPrimary }]}>Salvar</Text>
        </Pressable>
      </ScrollView>

      <Modal transparent animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <Pressable style={[styles.overlay, { backgroundColor: theme.overlay }]} onPress={() => setModalVisible(false)}>
          <View style={[styles.sheet, { backgroundColor: theme.card }]}>
            <Text style={[styles.sheetTitle, { color: theme.text }]}>Escolha a categoria</Text>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                style={[styles.option, { borderBottomColor: theme.border }]}
                onPress={() => {
                  handleChange('category', cat);
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: cat === form.category ? theme.primary : theme.text, fontSize: 16 }}>{cat}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 40 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 14, marginBottom: 6 },
  input: { borderWidth: 1.5, borderRadius: 8, padding: 12, fontSize: 16 },
  error: { marginTop: 4, fontSize: 13 },
  saveButton: { marginTop: 28, padding: 14, borderRadius: 8, alignItems: 'center' },
  saveText: { fontSize: 16, fontWeight: 'bold' },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  sheet: { borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16, paddingBottom: 32 },
  sheetTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  option: { paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth },
});
