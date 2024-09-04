// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCINDORJtIhwTRj5Sl2Ef78E79Jm8cg5G8",
//   authDomain: "ecommerce-app-87bd8.firebaseapp.com",
//   databaseURL: "https://ecommerce-app-87bd8-default-rtdb.firebaseio.com",
//   projectId: "ecommerce-app-87bd8",
//   storageBucket: "ecommerce-app-87bd8.appspot.com",
//   messagingSenderId: "201414120975",
//   appId: "1:201414120975:web:2c2b8e41fcd5211cc7f57a",
//   measurementId: "G-SZZY1EL2T9"
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

import app from "./firebase.js";

import {
  getFirestore,
  doc,
  onSnapshot ,
  setDoc,
  serverTimestamp,
  collection,
  addDoc,
 query, where, getDocs
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";



const storage = getStorage(app);

const file = document.getElementById("inputFile");
let fileinput = inputFile.files[0];

const storageRef = ref(storage, fileinput.name);

uploadBytes(storageRef, file).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});

//Loader & Img Unshow
let imageUrl;
let loader = document.getElementById("loader");
loader.style.display='none'

let showImage = document.getElementById("showImage");
showImage.style.display='none'


// Sent Data In Firestore

let addData = async ()  => {
  let tittle = document.getElementById('tittle');
  let discription = document.getElementById('discription');
  console.log(tittle.value);
  console.log(discription.value);

  const docRef = await addDoc(collection(db, "cardData"), {
    tittle: tittle.value,
    discription: discription.value
  });
  console.log("Document written with ID: ", docRef.id);
  
}


let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', addData)



// Sent Image In Cloud Storage
// Show Image After Select

let inputFile = document.getElementById("inputFile");

inputFile.addEventListener("change", (e) => {
  let showImage = document.getElementById("showImage");
  loader.style.display = "block";

  // Sent Image Data

  let file = inputFile.files[0];
  console.log(file);
  
  const imagesRef = ref(storageRef, `images/${file.name}`);

  const uploadTask = uploadBytesResumable(imagesRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.log("error", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        imageUrl = downloadURL;
        console.log("File available at", imageUrl);
        loader.style.display = "none";

        showImage.src = URL.createObjectURL(e.target.files[0]);
        showImage.style.display = "block";
      });
    }
  );
});
