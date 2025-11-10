// lib/firebaseAdmin.js
import admin from 'firebase-admin';

// Avoid re-initializing
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // important: replace \n with actual newlines
    }),
  });
}

export default admin;
