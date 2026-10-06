export const TODAS = 'Todas';

// Retorna apenas as despesas da categoria escolhida (ou todas, se "Todas").
export function filtrarPorCategoria(despesas, categoria) {
  if (categoria === TODAS) return despesas;
  return despesas.filter((despesa) => despesa.categoria === categoria);
}
