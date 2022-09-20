import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"

const base_app = initializeApp({
  apiKey: "AIzaSyAmVZkuTzJ1dvRCJeArrGUkHoAWZOj7pw0",
  authDomain: "react-workshop-eba4b.firebaseapp.com",
  projectId: "react-workshop-eba4b",
  storageBucket: "react-workshop-eba4b.appspot.com",
  messagingSenderId: "623600921001",
  appId: "1:623600921001:web:3d3300e5d0a217151b3cb8"
})

export const base_auth = getAuth(base_app)

export default base_app

export const register = (login, pass) =>{
  return createUserWithEmailAndPassword(base_auth, `${login}@lp.pl`, pass)
}