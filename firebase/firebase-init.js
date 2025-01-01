const FirebaseAdmin = require("firebase-admin");
require("dotenv").config();
console.log("process.env.FIREBASE_PROJECT_ID",process.env.FIREBASE_PROJECT_ID)

module.exports = FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY
    }),
    projectId: process.env.FIREBASE_PROJECT_ID
  });
   