const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com"
});

const db = admin.firestore(); // Firestore database
const app = express();

app.use(cors());
app.use(express.json());

// Public route
app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

// Protected route (requires Firebase user token)
app.get('/secure-data', async (req, res) => {
  const idToken = req.headers.authorization;

  if (!idToken) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Now you can access user-specific data
    res.json({ message: `Hello, user ${uid}` });
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
});

// Save some data
app.post('/save-data', async (req, res) => {
  const { userId, data } = req.body;

  try {
    await db.collection('users').doc(userId).set({ data });
    res.send('Data saved successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving data.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
