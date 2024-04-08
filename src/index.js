import {initializeApp} from "firebase/app"
import {collection, 
  getFirestore, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  serverTimestamp, 
  updateDoc} from 'firebase/firestore'
  import {getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword

  } from 'firebase/auth'

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

    //get a single doc
    const docref = doc(db, 'books', "CLgsXcLWn6vIMCLwn7TA")
    onSnapshot(docref, (doc) =>{
      console.log(doc.data())
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
    
    //update
    const updateBookForm = document.querySelector('.update'); 
    updateBookForm.addEventListener('submit', (e) =>{
      e.preventDefault()
      const docRef = doc(db, 'books', updateBookForm.id.value)
      updateDoc(docRef, {
        title: 'no problem'
      })
      .then(() => {
        updateBookForm.reset()
      })
    })


    //init auth
    const auth = getAuth();

    //signup user
    const signupForm = document.querySelector('.signup')
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const email = signupForm.email.value;
        const password = signupForm.password.value;
        createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log('user created', cred.user);
          signupForm.reset()
        })
        .catch((err) => {
          console.log(err.message)
        })
    })

    //log in and out
    const logoutButton = document.querySelector('.logout')
    logoutButton.addEventListener('click', (e) =>{
       signOut(auth)
       .then(() => {
        console.log("user signed out")
       })
       .catch((err) => {
        console.log(err.message)
       })
    })

    const loginForm = document.querySelector('.login')
    loginForm.addEventListener('submit', (e) =>{
      e.preventDefault()
      const email = loginForm.email.value;
      const password = loginForm.password.value;
      signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log('user loged in:', cred.user)
      })
      .catch(err => console.log(err.message))
    })