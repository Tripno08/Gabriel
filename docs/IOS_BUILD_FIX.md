# Solução para Erro de Build iOS - CocoaPods

## Problema

Ao tentar executar o projeto iOS, ocorria o seguinte erro:

```
Command PhaseScriptExecution failed with a nonzero exit code
/bin/sh: /Users/.../Pods/Target Support Files/Pods-App/Pods-App-frameworks.sh: Operation not permitted
```

## Causa

O macOS estava bloqueando a execução do script do CocoaPods devido a restrições de segurança (sandbox).

## Solução Aplicada

### 1. Tentativas Iniciais (não funcionaram completamente)

- Aceitar licença do Xcode: `sudo xcodebuild -license`
- Dar permissões aos scripts: `chmod +x` nos arquivos .sh
- Reinstalar Pods: `pod deintegrate && pod install`
- Limpar DerivedData
- Desabilitar temporariamente o script

### 2. Solução Final (funcionou)

Recriar o projeto iOS do zero:

```bash
# Remover o diretório iOS existente
cd frontend
rm -rf ios

# Adicionar a plataforma iOS novamente
npx cap add ios

# Executar o projeto
npx cap run ios
```

## Por que funcionou?

1. **Projeto limpo**: Sem scripts problemáticos do CocoaPods
2. **Configuração atualizada**: Capacitor criou um projeto com configurações mais recentes
3. **Sem dependências legadas**: Evitou problemas de compatibilidade

## Correção Adicional - LaunchScreen

Também foi corrigido o aviso de memória da tela de lançamento:

```
The launch screen exceeds the memory limit and may not display during app launch
```

**Solução**: Substituir a imagem pesada por uma tela simples com cor de fundo e texto no `LaunchScreen.storyboard`.

## Como evitar no futuro

1. Sempre usar `npx cap add ios` para criar projetos iOS
2. Evitar modificações manuais nos scripts do CocoaPods
3. Manter o Capacitor e dependências atualizadas
4. Usar imagens otimizadas para splash screens

## Comandos úteis

```bash
# Sincronizar projeto iOS
npx cap sync ios

# Executar no simulador
npx cap run ios

# Abrir no Xcode
npx cap open ios

# Limpar e recriar
rm -rf ios && npx cap add ios
``` 