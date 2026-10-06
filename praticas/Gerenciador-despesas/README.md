# Gerenciador de Despesas

App React Native (Expo) com categorização de despesas e filtro dinâmico.

## Executar
```bash
npm install
npx expo start
```

## Estrutura
```
src/
├── components/despesa/  DespesaItem, DespesaLista, DespesaSaida, DespesaSumario, CategoriaSelector
├── screens/             TodasDespesas, DespesasRecentes, GerenciarDespesa
├── data/                despesas.js (dados iniciais e categorias)
└── util/                data.js (getDataFormatada), filtro.js (.filter por categoria)
```

## Requisitos atendidos
- Campo `categoria` + seletor com `Pressable` em `GerenciarDespesa`
- Regex `/^\d*\.?\d{0,2}$/`, `DateTimePicker` e validação de descrição, valor e categoria
- `DespesaItem` com tag de categoria; `DespesaSumario` com `.reduce()` e `R$ ...toFixed(2)`
- Filtro com `.filter()` -> lista filtrada passada para `DespesaSaida`
- Bônus: total acima de R$ 200,00 aparece em vermelho
