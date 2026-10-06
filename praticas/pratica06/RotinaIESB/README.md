# RotinaIESB

Organizador simples da rotina acadêmica do aluno no IESB. Cadastra
compromissos (aula, estudo, trabalho, lazer), lista, marca como concluído,
remove e mantém tudo salvo após fechar o app (AsyncStorage).

## Como rodar

1. Confirme o Node.js LTS (>= 22.11):
   ```
   node -v
   ```

2. Extraia este projeto em uma pasta e, dentro dela, instale as dependências
   (os pacotes nativos já estão listados no `package.json`, mas rodar o
   comando abaixo garante as versões corretas para a sua versão do Expo):
   ```
   npm install
   npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
   ```

3. Inicie o projeto:
   ```
   npx expo start
   ```
   Escaneie o QR code com o app **Expo Go** ou rode em um emulador Android.

> Observação: o `assets/logo.png` incluso é um placeholder gerado
> automaticamente (círculo azul com "IESB"). Fique à vontade para substituir
> por um logo próprio — basta manter o mesmo nome de arquivo ou ajustar o
> `require('./assets/logo.png')` em `App.js`.

## Estrutura do projeto

```
RotinaIESB/
  App.js                      -> tela única, estado global e persistência
  labels.js                   -> rótulos de texto (export nomeado)
  assets/
    logo.png
  components/
    CompromissoInput.js        -> input + botão de adicionar
    CompromissoList.js         -> lista (FlatList) + remoção/conclusão
  package.json
  app.json
  README.md
```

## Onde cada conteúdo das aulas aparece

- **Aula 02 — Estrutura do projeto**: template Expo *blank*, `App.js`,
  `app.json`, `package.json`, pasta `assets/` com o logo.
- **Aula 03 — Import/export, componentes e estilos**: `labels.js` com
  `export const`; `View`, `Text`, `TextInput`, `Image` usados nos
  componentes; estilos centralizados em `StyleSheet.create` (não inline).
- **Aula 04 — Layout e Flexbox**: cabeçalho em `flexDirection: 'row'`;
  `input` com largura em `%` e botão com largura em `%`; lista com
  `flex: 1`; `justifyContent`/`alignItems` usados com intenção clara em
  vários pontos (cabeçalho, formulário, itens da lista).
- **Aula 05 — Estado e componentização**: `useState` para o texto digitado
  e para o array de compromissos; `CompromissoInput` e `CompromissoList` em
  `components/`, recebendo dados e funções via **props**.
- **Aula 06 — Eventos e persistência**: id único (`Date.now().toString()`),
  remoção com `.filter`, `Pressable` com `android_ripple`, `key` estável
  pelo `id`, `SafeAreaProvider`/`SafeAreaView`, `useEffect` duplo
  (carregar/salvar) com `AsyncStorage` + `JSON.stringify`/`JSON.parse` e
  `try/catch` com `Alert.alert` amigável.

## Desafios opcionais implementados (2 de 4)

- **O2 — Concluir compromisso**: tocar no texto do item alterna o campo
  `concluido` (boolean) e aplica `textDecorationLine: 'line-through'`.
- **O3 — Contador no cabeçalho**: exibe "X pendentes" ao lado do título,
  calculado a partir dos itens com `concluido: false`.

Como bônus, a lista já usa **FlatList com `ListEmptyComponent`** (item O4)
em vez de `ScrollView`/`.map`.

Os desafios **O1** (filtro por categoria) e o restante de **O4** ficam como
sugestão de evolução caso queira ganhar pontos extras.
