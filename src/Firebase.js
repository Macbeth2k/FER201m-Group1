import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyB_K2vHjdDPRepEFYHUSIShlAzL5Fvjp40",
  authDomain: "thermal-advice-404103.firebaseapp.com",
  projectId: "thermal-advice-404103",
  storageBucket: "thermal-advice-404103.appspot.com",
  messagingSenderId: "278131061834",
  appId: "1:278131061834:web:0db7289bbb1c4b933a22b3",
  measurementId: "G-YK873E0HCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)
export const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
    signInWithPopup(auth,provider)
    .then(result => {
        const name = result.user.displayName
        const email = result.user.email
        const avatar = result.user.photoURL
        console.log(name)
        console.log(email)
        console.log(avatar)
        
    }).catch(err => {
        console.log(err)
    })
}