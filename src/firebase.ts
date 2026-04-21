import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 1. Definição das variáveis de ambiente (Vercel/Produção)
const envConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID
};

// 2. Carregamento da configuração final
let finalConfig: any = {};

try {
  // Carrega o config local (AI Studio)
  // @ts-ignore
  const local = await import('../firebase-applet-config.json');
  finalConfig = { ...(local.default || local) };
  console.log('📦 Configuração local (JSON) carregada.');
} catch (e) {
  console.warn('⚠️ Configuração local não encontrada, usando variáveis de ambiente.');
}

// 3. Sobrescreve apenas se as variáveis de ambiente existirem e forem válidas
Object.entries(envConfig).forEach(([key, value]) => {
  if (value && value !== 'undefined' && value !== '') {
    finalConfig[key] = value;
  }
});

// 4. Verificação de ID do Banco de Dados
const dbId = finalConfig.firestoreDatabaseId || (finalConfig as any).databaseId;

if (!dbId || dbId === '(default)') {
  console.error('❌ ERRO CRÍTICO: ID do Banco de Dados não encontrado na configuração!');
} else {
  console.log(`✅ Conectando ao Banco de Dados: ${dbId}`);
}

// 5. Inicialização
const app = getApps().length === 0 ? initializeApp(finalConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app, dbId || '(default)');

// 6. Teste de conexão (Sonda)
import { doc, getDocFromServer } from 'firebase/firestore';
async function testConnection() {
  try {
    await getDocFromServer(doc(db, '_internal_', 'probe'));
  } catch (error: any) {
    if (error.code === 'permission-denied') {
      console.log("🔥 Tatame Online: Conexão com Firestore validada.");
    } else {
      console.warn("ℹ️ Info Sonda:", error.message);
    }
  }
}
testConnection();
