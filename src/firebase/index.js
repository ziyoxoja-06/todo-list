import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBl_0fnFUQ5dvzA9MgU6pCksz0LIFI-fZU",
  authDomain: "badass-todo-e0237.firebaseapp.com",
  projectId: "badass-todo-e0237",
  storageBucket: "badass-todo-e0237.appspot.com",
  messagingSenderId: "245259477453",
  appId: "1:245259477453:web:759bf7346fb45c78ab2484",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db
}


