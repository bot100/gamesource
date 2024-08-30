import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyChCBdwAGFSDpV92Eqg-SNG4TVvW6tw4RA',
  authDomain: 'gamesource-ad97f.firebaseapp.com',
  projectId: 'gamesource-ad97f',
  storageBucket: 'gamesource-ad97f.appspot.com',
  messagingSenderId: '250561353247',
  appId: '1:250561353247:web:75f1513bad19f2c5b6272a'
}

initializeApp(firebaseConfig)

const DB = getFirestore()
const AUTH = getAuth()

export { DB, AUTH }
