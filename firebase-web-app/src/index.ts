// This file is the entry point of the application. It initializes the Firebase app and sets up any necessary configurations or services.

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from './firebase/config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Authentication
const db = getFirestore(app);
const auth = getAuth(app);

// Export the initialized services for use in other parts of the application
export { app, db, auth };