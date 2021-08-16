import firebaseApp from 'firebase/app'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERI,
    appId: process.env.REACT_APP_FIREBASE_APPID
}

firebaseApp.initializeApp(firebaseConfig)

export const auth = firebaseApp.auth()
export default firebaseApp
