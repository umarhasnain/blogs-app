import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCINDORJtIhwTRj5Sl2Ef78E79Jm8cg5G8",
  authDomain: "ecommerce-app-87bd8.firebaseapp.com",
  databaseURL: "https://ecommerce-app-87bd8-default-rtdb.firebaseio.com",
  projectId: "ecommerce-app-87bd8",
  storageBucket: "ecommerce-app-87bd8.appspot.com",
  messagingSenderId: "201414120975",
  appId: "1:201414120975:web:2c2b8e41fcd5211cc7f57a",
  measurementId: "G-SZZY1EL2T9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app}