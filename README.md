# Smart Lock App 📱🔒

Este é o aplicativo mobile (Front-end) do sistema de Fechadura Inteligente. Ele foi desenvolvido com **React Native** e **Expo**, permitindo que os usuários destranquem a porta utilizando a aproximação de tags **NFC** ou validação por **Reconhecimento Facial**.

Este projeto consome a API RESTful fornecida pelo [smart-lock-backend](https://github.com/GabrielZanini04/smart-lock-backend).

---

## 🛠️ Tecnologias Utilizadas

- **React Native / Expo:** Framework principal para desenvolvimento mobile.
- **React Navigation:** Gerenciamento de rotas e fluxo de telas.
- **Axios:** Cliente HTTP para comunicação com a API.
- **Expo Camera:** Captura de imagem para reconhecimento biométrico.
- **React Native NFC Manager:** Leitura e detecção de tags NFC.
- **Expo SecureStore:** Armazenamento criptografado do token de autenticação (JWT/Sanctum).

---

## ⚙️ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- Aplicativo **Expo Go** instalado no seu celular físico (disponível na App Store ou Google Play).
- O backend `smart-lock-backend` rodando localmente (ex: via **Laragon**).

---

## 🚀 Como instalar e rodar o projeto

### 1. Clonar o repositório

```bash
git clone [https://github.com/GabrielZanini04/smart-lock-app.git](https://github.com/GabrielZanini04/smart-lock-app.git)
cd smart-lock-app
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar a conexão com a API (_MUITO IMPORTANTE_)

Como o aplicativo rodará no seu celular físico, ele não consegue acessar localhost ou domínios locais do Laragon (como http://smart-lock-backend.test).

Você precisa configurar o IP da sua máquina na rede Wi-Fi:

Descubra o seu endereço IPv4 local (no Windows, abra o CMD e digite ipconfig).

Abra o arquivo src/services/api.js.

Altere a baseURL colocando o seu IP. Exemplo:

```JavaScript
const api = axios.create({
  // Substitua 192.168.x.x pelo seu IP real
  baseURL: '[http://192.168.1.15/smart-lock-backend/public/api](http://192.168.1.15/smart-lock-backend/public/api)',
});
```

### 4. Iniciar o servidor do Expo

```Bash
npx expo start
```

Após rodar o comando, um QR Code aparecerá no seu terminal.

### 5. Testar no Celular

Certifique-se de que o seu celular e o seu computador estão conectados na mesma rede Wi-Fi.

Abra o aplicativo Expo Go no seu celular.

Escaneie o QR Code exibido no terminal do computador.

O aplicativo será carregado no seu dispositivo.

## ⚠️ Observações para Testes (Hardware)

**Leitor NFC**: A leitura de tags NFC não funciona em emuladores de computador (Android Studio/Xcode). Para testar o fluxo da tela de NFC, é obrigatório rodar o aplicativo em um celular físico compatível com a tecnologia.

**Câmera**: O aplicativo solicitará permissão de uso da câmera frontal na primeira vez que a tela de Reconhecimento Facial for aberta. Permita o acesso para capturar a biometria.

**Autenticação**: O login só funcionará se o banco de dados do seu backend estiver rodando e com as rotas de API acessíveis pelo IP configurado no passo 3.
