import {initializeApp} from "firebase/app"
import {collection, getFirestore, getDocs} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyC2fqLhKS07epe4OT-LGxenPkRx7angaBU",
    authDomain: "firbase-9-dojo-4a929.firebaseapp.com",
    projectId: "firbase-9-dojo-4a929",
    storageBucket: "firbase-9-dojo-4a929.appspot.com",
    messagingSenderId: "150431557500",
    appId: "1:150431557500:web:d369f336288d5f680926f9"
  };

  initializeApp(firebaseConfig);

  //int service
   const db = getFirestore();

   //collection ref

   const colref = collection(db, 'books');

   // get collection data

   getDocs(colref)
    .then((snapshot) => {
      let books = []
      snapshot.docs.forEach((doc) => {
        books.push({...doc.data(), id: doc.id})
      })
      console.log(books)
    })
    .catch(err => {
      console.log(err.message)
    })

