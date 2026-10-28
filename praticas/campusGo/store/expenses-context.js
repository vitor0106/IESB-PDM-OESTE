// ATENÇÃO: substitua este arquivo pelo store/expenses-context.js da Aula 09
// (Gerenciador de Despesas). Esta versão mínima só mantém a mesma API:
// ExpensesContextProvider e useExpenses() -> { expenses, addExpense, removeExpense }.
import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';
const ExpensesContext = createContext(null);

export function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => raw && setExpenses(JSON.parse(raw)))
      .catch(() => {});
  }, []);

  function persist(next) {
    setExpenses(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  }

  function addExpense(expense) {
    persist([...expenses, { id: String(Date.now()), ...expense }]);
  }

  function removeExpense(id) {
    persist(expenses.filter((e) => e.id !== id));
  }

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, removeExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const ctx = useContext(ExpensesContext);
  if (!ctx) throw new Error('useExpenses deve ser usado dentro de ExpensesContextProvider');
  return ctx;
}
