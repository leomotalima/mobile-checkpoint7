# Mobile Application Development - Checkpoint 7

## Projeto: Aplicativo de Gerenciamento Escolar com Localização Automática

**Aluno:** Léo Mota Lima — RM557851 - Turma: 2TDSB  
**Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas  
**Disciplina:** Mobile Application Development  
**Professor:** Leonardo Marques Barra Bragatti  
**Instituição:** FIAP  
**Data:** Novembro / 2025  

**Repositório GitHub:** [github.com/leomotalima/mobile-checkpoint7](https://github.com/leomotalima/mobile-checkpoint7)

---

## Descrição do Projeto

A proposta deste projeto é **gerenciar uma escola de forma eficaz e intuitiva**.  
Tanto **gestores** quanto **alunos** utilizam o aplicativo para tornar a experiência mais ágil, oferecendo recursos de **cadastro, autenticação e localização automática**.  

O sistema permite que o usuário preencha automaticamente seu endereço com base na **localização atual do dispositivo**, integrando as APIs **Expo Location** e **Mapbox**.  

Este projeto foi desenvolvido com **React Native + Expo + TypeScript**, e utiliza **Firebase** para autenticação e persistência de dados.

---

## Funcionalidades

- Login e autenticação com Firebase Authentication  
- Cadastro de novo usuário (e-mail, nome, sobrenome, senha e endereço)  
- Preenchimento automático do endereço via **Mapbox Reverse Geocoding**  
- Captura da localização atual do dispositivo com `expo-location`  
- Armazenamento das informações no **Firebase Firestore**  
- Interface intuitiva e responsiva, compatível com **Expo Web**, **Android** e **iOS**

---

## Tecnologias Utilizadas

| Tecnologia | Descrição |
|-------------|-----------|
| **React Native + Expo** | Framework principal para desenvolvimento mobile multiplataforma |
| **TypeScript** | Tipagem estática e melhor manutenção do código |
| **Firebase Authentication** | Gerenciamento de login e cadastro de usuários |
| **Firebase Firestore** | Banco de dados para armazenamento das informações |
| **Expo Location** | Captura da geolocalização do dispositivo |
| **Mapbox API** | Conversão de coordenadas em endereços |
| **React Native Paper** | Componentes visuais modernos e acessíveis |

---

## Configurando o Projeto

Após clonar o repositório, rode o comando para instalar os pacotes:

```bash
npm install
```

Na raiz do seu projeto, crie um arquivo `.env.local` e defina as seguintes variáveis de ambiente:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyB0vnhIxA5wLNpReFrkyijvylgLYsJm-oo
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=mobile-checkpoint7.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=mobile-checkpoint7
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=mobile-checkpoint7.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=822765412645
EXPO_PUBLIC_FIREBASE_APP_ID=1:822765412645:web:8ac1d6363e5d83c9973acc

EXPO_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoibGVvbW90YTQzNiIsImEiOiJjbWhwYjk1eHEwbGpkMmpwd2Jha2d1a3JmIn0.EX_gmPjHwqhX9gMpqHa-hg
```

---

## Estrutura de Pastas

```
mobile-checkpoint7/
 ┣ src/
 ┃ ┣ api/
 ┃ ┣ Components/
 ┃ ┃ ┣ Auth/          → Telas de autenticação (Login e Cadastro)
 ┃ ┃ ┣ Config/        → Integrações externas e configurações gerais
 ┃ ┃ ┗ Users/         → Componentes de gerenciamento de usuários
 ┃ ┣ Context/         → Contextos globais (AuthContext, StudentContext)
 ┃ ┣ Navigation/      → Controle de navegação (Stacks, Tabs)
 ┃ ┗ types/           → Tipagens TypeScript
 ┣ .env.local
 ┣ App.tsx
 ┣ app.json
 ┣ package.json
 ┗ README.md
```

---

## Rodando o Projeto

### Executar no Android
```bash
npm run android
```

### Executar no iOS
```bash
npm run ios
```

### Executar no Navegador (Expo Web)
```bash
npm run web
```

### Alternativamente, iniciar manualmente
```bash
npx expo start
```

Após o servidor iniciar, o **Expo CLI** exibirá um **QR Code**.  
Escaneie o QR Code com o aplicativo **Expo Go** (disponível na Google Play Store e App Store).

---

## Execução no Expo Go (Android/iOS)

1. Instale o aplicativo **Expo Go** no seu dispositivo móvel.  
2. No terminal, execute o comando:
   ```bash
   npx expo start
   ```
3. Escaneie o **QR Code** exibido no terminal ou navegador.  
4. O projeto abrirá automaticamente no dispositivo móvel.  
5. Caso o endereço não seja preenchido automaticamente, verifique:
   - Se a permissão de localização está ativa.  
   - Se o `.env.local` contém a variável `EXPO_PUBLIC_MAPBOX_TOKEN`.  
   - Se há conexão com a internet para consultar a API do Mapbox.  

---

## Diagrama de Fluxo Simplificado

```mermaid
flowchart LR
    A[Usuário] --> B[Expo App]
    B --> C[Firebase Authentication]
    B --> D[Firestore Database]
    B --> E[Expo Location]
    E --> F[Mapbox API]
    F --> B
    D --> G[Tela do Usuário]
```

---

## Créditos e Observações

Este projeto foi desenvolvido como parte da disciplina **Mobile Application Development** da **FIAP**, ministrada pelo professor **Leonardo Marques Barra Bragatti**, com o objetivo de aplicar conceitos de integração entre **Firebase**, **Expo Location**, **Mapbox API** e **boas práticas de desenvolvimento mobile multiplataforma**.

---

## Demonstração

- Login e Cadastro com Endereço Automático  
- Integração com Firebase e Mapbox  
- Interface acessível e responsiva  

*(Adicione prints das telas Login e Cadastro conforme demonstrado nos testes.)*

---

## Autor

**Léo Mota Lima (RM557851)**  
[github.com/leomotalima](https://github.com/leomotalima)
