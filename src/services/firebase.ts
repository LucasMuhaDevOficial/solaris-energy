// import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCJ1Gz9URMIKS5Mi_vj2LDnCvyUL7Gy6CM',
  authDomain: 'solariaenergy-dbca1.firebaseapp.com',
  projectId: 'solariaenergy-dbca1',
  storageBucket: 'solariaenergy-dbca1.appspot.com',
  messagingSenderId: '672056652553',
  appId: '1:672056652553:web:c5964c70a1d506c40319d8',
  measurementId: 'G-W59VZ7MBM3',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
// export const analytics = getAnalytics(app)
