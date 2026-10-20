export const CATEGORIES = ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Outros'];

export const themes = {
  light: {
    background: '#f4f4f8',
    card: '#ffffff',
    text: '#1c1c28',
    textSecondary: '#6b6b80',
    primary: '#4f46e5',
    onPrimary: '#ffffff',
    border: '#d4d4de',
    error: '#dc2626',
    inputBg: '#ffffff',
    overlay: 'rgba(0,0,0,0.4)',
  },
  dark: {
    background: '#12121a',
    card: '#1f1f2b',
    text: '#f2f2f7',
    textSecondary: '#a0a0b4',
    primary: '#818cf8',
    onPrimary: '#12121a',
    border: '#3a3a4a',
    error: '#f87171',
    inputBg: '#272735',
    overlay: 'rgba(0,0,0,0.6)',
  },
};

export const getTheme = (scheme) => (scheme === 'dark' ? themes.dark : themes.light);
