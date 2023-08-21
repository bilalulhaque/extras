import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import serviceAccount from "./firebase-admin.json" assert { type: "json" };
import admin from "firebase-admin";
import app_route from "./src/route/app.router.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://firestore.googleapis.com/v1/projects/payment-reminder-app-atompoint/databases/(default)/documents/',
});


dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();

app.use(cors());
app.use(express.json());
const port = 3002;

app_route(app);

app.listen(port, function () {
  console.log("App is running on port " + port);
});

export {admin};
