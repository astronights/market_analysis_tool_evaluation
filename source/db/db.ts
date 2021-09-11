import admin from "firebase-admin";

var serviceAccount = require("../../mate-db-firebase-adminsdk-vekns-52206f7281.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
