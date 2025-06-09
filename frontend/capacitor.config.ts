import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.github.gabriel',
  appName: 'Gabriel',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.15.173:4173',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      signingType: undefined
    }
  }
};

export default config;
