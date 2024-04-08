import {initializeApp} from "firebase/app"
import {collection, getFirestore, getDocs, addDoc, deleteDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp} from 'firebase/firestore'
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

   const q = query(colref, orderBy('createdAt'))

   // get collection data

    onSnapshot(q, (snapshot) => {
      let books = []
      snapshot.docs.forEach((doc) => {
        books.push({...doc.data(), id: doc.id})
      })
      console.log(books)
    })

    //add
    const addBookForm = document.querySelector('.add'); 
    addBookForm.addEventListener('submit', (e) =>{
      e.preventDefault();
      addDoc(colref, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
      })
      .then(() => {
        addBookForm.reset()
      })

    })


    //delete
    const deleteBookForm = document.querySelector('.delete'); 
    deleteBookForm.addEventListener('submit', (e) =>{
      e.preventDefault()
      const docRef = doc(db, 'books', deleteBookForm.id.value)
      deleteDoc(docRef)
      .then(() => {
        deleteBookForm.reset();
      }) 

    })

    
    let names = [];
    const addName = document.querySelector('.name')
    addName.addEventListener('submit', (e) => {
      e.preventDefault()
      
      let fullNamne =
      {
        firstName: addName.first_name.value,
        lastName: addName.last_name.value
      }
      names.push(fullNamne)
      console.log(names)
      addName.reset()
    })
    