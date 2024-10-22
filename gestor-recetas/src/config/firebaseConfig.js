// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Tu configuración desde Firebase console
const firebaseConfig = {
    apiKey: "AIzaSyBc3whERS8lvoFgl3jvLh-bRmZfm8bd_K0",
    authDomain: "e-commerce-7e682.firebaseapp.com",
    projectId: "e-commerce-7e682",
    storageBucket: "e-commerce-7e682.appspot.com",
    messagingSenderId: "1069636679097",
    appId: "1:1069636679097:web:eef65fc1be835b92677268"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);