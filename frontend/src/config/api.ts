// Detecta o ambiente de execução
const isCapacitor = window.hasOwnProperty('Capacitor');

// Configuração da API baseada no ambiente
export const getApiUrl = (): string => {
  if (isCapacitor) {
    // No Android (emulador ou dispositivo), sempre usar 10.0.2.2
    // que é o IP especial que o Android usa para acessar o localhost do host
    return 'http://10.0.2.2:3000/api';
  } else {
    // Browser web usa localhost
    return 'http://localhost:3000/api';
  }
};

export const API_URL = getApiUrl();

// Log para debug
console.log('API Configuration:', {
  isCapacitor,
  API_URL
}); 