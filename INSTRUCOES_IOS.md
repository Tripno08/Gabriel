# 📱 Instruções para executar o app Wyn no iOS

## ✅ Pré-configuração já realizada:
- Projeto iOS criado com Capacitor
- CocoaPods instalado
- Dependências configuradas
- Permissões HTTP configuradas para desenvolvimento

## 🚀 Após instalar o Xcode:

### 1. Configurar Xcode (fazer apenas uma vez)
```bash
# Aceitar licença do Xcode
sudo xcodebuild -license accept

# Configurar as ferramentas de linha de comando
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

### 2. Executar o app no simulador iOS

#### Opção A: Usar o script automático
```bash
cd frontend
./run-ios.sh
```

#### Opção B: Comandos manuais
```bash
# 1. Compilar o frontend
cd frontend
npm run build

# 2. Sincronizar com iOS
npx cap sync ios

# 3. Executar no simulador
npx cap run ios
```

### 3. Escolher simulador
- O Capacitor abrirá uma lista de simuladores disponíveis
- Recomendo escolher "iPhone 15" ou "iPhone 14"
- O simulador será baixado automaticamente se necessário

### 4. Testar o app
- Aguarde o simulador iniciar (primeira vez demora mais)
- O app Wyn abrirá automaticamente
- Use as credenciais de teste:
  - **Cliente**: maria@example.com / senha123
  - **Provedor**: joao@example.com / senha123

## 🛠️ Desenvolvimento

### API Backend
Certifique-se de que o servidor backend está rodando:
```bash
# Em outro terminal, na pasta raiz do projeto
npm run dev
```

### Hot Reload
Para desenvolvimento com hot reload:
```bash
cd frontend
npm run dev
```
E em outro terminal:
```bash
npx cap run ios --livereload --external
```

## 📝 Notas importantes:
- O simulador iOS não tem acesso ao `localhost` do Mac
- Use o IP da sua máquina se precisar (ex: 192.168.1.100:3000)
- Para testar em dispositivo físico, você precisa de uma conta Apple Developer

## 🐛 Problemas comuns:

### "No simulators available"
- Abra o Xcode manualmente uma vez
- Vá em Xcode > Settings > Platforms
- Baixe um simulador iOS

### "Command not found: pod"
```bash
brew install cocoapods
```

### Erro de certificado
- Abra o projeto no Xcode: `npx cap open ios`
- Selecione o projeto "App" na sidebar
- Em "Signing & Capabilities", desmarque "Automatically manage signing"
- Marque novamente para reconfigurar 