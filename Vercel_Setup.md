# Guia de Implantação no Vercel - PPH BJJ Academy Suite

OSS, Sensei! Para colocar sua academia online no Vercel, siga estes passos simples:

## 1. Preparação do Repositório
O sistema já foi ajustado com os arquivos necessários:
- `vercel.json`: Garante que as rotas do aplicativo funcionem corretamente em links diretos.
- `firebase.ts`: Atualizado para aceitar variáveis de ambiente caso o arquivo de configuração local não esteja presente.

## 2. Configuração no Painel do Vercel
Ao criar o projeto no Vercel, você deve adicionar as seguintes **Environment Variables** (Variáveis de Ambiente):

| Nome da Variável | Descrição | Exemplo (Pegue no seu Firebase) |
|---|---|---|
| `GEMINI_API_KEY` | Chave da IA Gemini | `AIza...` |
| `VITE_FIREBASE_API_KEY` | Firebase API Key | `AIza...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `projeto.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | ID do Projeto Firebase | `projeto-123` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage Bucket | `projeto.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Sender ID | `123456789` |
| `VITE_FIREBASE_APP_ID` | App ID | `1:123...` |
| `VITE_FIREBASE_DATABASE_ID` | Firestore DB ID | `(default)` ou similar |

## 3. Build & Deployment
O comando de build padrão do Vercel deve ser automaticamente detectado:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

OSS! Se precisar de ajuda com os segredos do Firebase, estarei pronto para o micro-ajuste.
