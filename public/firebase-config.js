// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js"; // Downgraded to 9.22.0
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-xGLUiAjUx7PR-UTp2uXgKIT3-YkcOWo",
  authDomain: "budget-banking-proj.firebaseapp.com",
  projectId: "budget-banking-proj",
  storageBucket: "budget-banking-proj.firebasestorage.app",
  messagingSenderId: "221922223081",
  appId: "1:221922223081:web:d0ee8cd366e27d601ee178"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the storage instance here if you plan to use it in this file
const storage = getStorage(app);

// Export the initializeApp function and the app instance
export { initializeApp, app, storage };