import { View } from 'react-native';
import DespesaLista from './DespesaLista';

// Container de saída: exibe o sumário (quantidade e total) e a lista.
export default function DespesaSaida({ expenses, emptyMessage, emptyHint }) {
  return (
    <View style={{ flex: 1 }}>
      <DespesaLista expenses={expenses} emptyMessage={emptyMessage} emptyHint={emptyHint} />
    </View>
  );
}
