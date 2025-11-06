# Projeto de Gerenciamento Escolar

A proposta deste projeto é gerenciar uma escola de forma eficaz e intuitiva. Tanto gestores quanto alunos utilizam o aplicativo para tornar essa experiência mais ágil
Este projeto é feito com [Expo](https://expo.dev/)

# Configurando o projeto
Após clonar o repositório, rode o comando para instalar os pacotes:

`npm install`

Na raiz do seu projeto, crie um arquivo `.env.local` e defina as seguintes variáveis de ambiente:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=<sua configuração do firebase>
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=<sua configuração do firebase>
EXPO_PUBLIC_FIREBASE_PROJECT_ID=<sua configuração do firebase>
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=<sua configuração do firebase>
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<sua configuração do firebase>
EXPO_PUBLIC_FIREBASE_APP_ID=<sua configuração do firebase>
```

# Rodando o projeto
Para rodar o projeto num dispositivo Android:

`npm run android`

Para rodar o projeto num dispositivo iOS:

`npm run ios`

Para rodar o projeto num dispositivo Web:

`npm run web`