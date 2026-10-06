import { getDataMenosDias } from '../util/data';

export const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

const hoje = new Date();

export const DESPESAS_INICIAIS = [
  { id: 'd1', descricao: 'Supermercado', valor: 89.9, data: getDataMenosDias(hoje, 1), categoria: 'Alimentação' },
  { id: 'd2', descricao: 'Uber para o trabalho', valor: 24.5, data: getDataMenosDias(hoje, 2), categoria: 'Transporte' },
  { id: 'd3', descricao: 'Cinema', valor: 45, data: getDataMenosDias(hoje, 4), categoria: 'Lazer' },
  { id: 'd4', descricao: 'Conta de luz', valor: 132.75, data: getDataMenosDias(hoje, 6), categoria: 'Contas' },
  { id: 'd5', descricao: 'Restaurante', valor: 62.3, data: getDataMenosDias(hoje, 12), categoria: 'Alimentação' },
  { id: 'd6', descricao: 'Gasolina', valor: 150, data: getDataMenosDias(hoje, 20), categoria: 'Transporte' },
];
