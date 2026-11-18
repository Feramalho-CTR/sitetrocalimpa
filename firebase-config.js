// firebase-config.js - Configuração e Inicialização do Firebase v10+ (Modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc,
  setDoc,
  deleteDoc, 
  updateDoc, 
  query, 
  where,
  orderBy, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Credenciais fornecidas pelo Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBK53-o0IsL9Dt77XVp9b_GCsqAHoez1Ms",
  authDomain: "trocalimpa-632f1.firebaseapp.com",
  projectId: "trocalimpa-632f1",
  storageBucket: "trocalimpa-632f1.firebasestorage.app",
  messagingSenderId: "491873286379",
  appId: "1:491873286379:web:53e2f23a81a78bc16626ae",
  measurementId: "G-74RD715Z1P"
};

// Inicialização da aplicação principal
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Função auxiliar para o Admin criar novos usuários (com senha provisória)
// sem deslogar a sessão atual do administrador, usando uma instância secundária
async function criarUsuarioSecundario(email, senha) {
  const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp_" + Date.now());
  const secondaryAuth = getAuth(secondaryApp);
  try {
    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, senha);
    await signOut(secondaryAuth);
    return userCredential.user;
  } finally {
    // encerra sessão secundária
  }
}

export { 
  app, 
  auth, 
  db, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  criarUsuarioSecundario,
  updatePassword,
  sendPasswordResetEmail,
  signOut, 
  onAuthStateChanged,
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc,
  setDoc,
  deleteDoc, 
  updateDoc, 
  query, 
  where,
  orderBy, 
  serverTimestamp 
};
