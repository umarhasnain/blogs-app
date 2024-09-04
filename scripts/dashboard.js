import app from "./firebase.js";

import {
  getAuth, 
  onAuthStateChanged,  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);



//onAuthStateChanged

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(user);
    // ...
  } else {
    // User is signed out
    console.log("user Sign Out");

    // ...
  }
});

// Image Show & Hide & Image URL
let imageUrl;
let showImage1 = document.getElementById("showImage");
showImage1.style.display = "none";

let loader = document.querySelector("#loader");

loader.style.display = "none";

// Send Image In Cloud Fire Storage

// Show Image After Select

let inputFile = document.getElementById("inputFile");

inputFile.addEventListener("change", (e) => {
  let showImage = document.getElementById("showImage");
  loader.style.display = "block";

  // Sent Image Data

  let file = inputFile.files[0];
  const imagesRef = ref(storage, `images/${file.name}`);

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

// Sent Data In Fire Store

let sentData = async () => {
  let tittle = document.getElementById("tittle");
  let discription = document.getElementById("discription");
 let date = new Date().toDateString()
 let timestamp = new Date().toLocaleTimeString()
  console.log(timestamp);
  console.log(date);
  
  const docRef = await addDoc(collection(db, "cardData"), {
    tittle: tittle.value,
    discription: discription.value,
    imageUrl: imageUrl,
    time: timestamp,
    date:date,
    userName: "hi"

  });

  imageUrl = "";
  tittle.value = "";
  discription.value = "";
  inputFile.value = "";
  showImage1.style.display = "none";
  console.log("Document written with ID: ", docRef.id);
  const modalElement = document.getElementById("exampleModal");
  const modal = bootstrap.Modal.getInstance(modalElement); // Get the existing modal instance
  modal.hide();

 
};

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", sentData);

// Get Data From Firestore




function createCard(data) {
    // Create card elements
    const card = document.createElement('div');
    card.className = 'height=200px'
    card.innerHTML = `
        <div class="card">
            <img src="${data.imageUrl || 'https://via.placeholder.com/150'}" id="imageinnerdiv" alt="Image">
            <div class="card-body">
                <h5 class="card-title">${data.tittle || 'No Title'}</h5>
                <p class="card-text">${data.discription || 'No Description'}</p>
                <p class="card-text">${data.date || 'No Description'} ${data.time}</p>
            </div>
        </div>
    `;
    return card;
}

function displayCards(data) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; // Clear existing cards
    data.forEach(item => {
        const card = createCard(item);
        cardContainer.appendChild(card);
    });
}


let showData = () => {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(user,uid);
      const q = query(collection(db, "cardData") , where("uid", "==", uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        console.log("Current data in CA: ",data);
        console.log("Current data in CA: ", data);
        displayCards(data)
      //   let posts = document.getElementById("posts");
        
      });
      
      // ...
    } else {
      // User is signed out
      console.log("user Sign Out");
      // ...
    }
  });
  

    // const q = query(collection(db, "cardData") , where("uid", "==", uid));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const data = [];
    //   querySnapshot.forEach((doc) => {
    //     data.push(doc.data());
    //   });
    //   console.log("Current data in CA: ", data);
    //   displayCards(data)
    // //   let posts = document.getElementById("posts");
      
    // });
  };
  
  showData();
                                                                                                  


//onAuthStateChanged

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(user);
    
    // ...
  } else {
    // User is signed out
    console.log("user Sign Out");
    // ...
  }
});


// Sign Out

let signoutBtn = document.querySelector("#signoutBtn");

if (signoutBtn) {
  signoutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful");
        new AWN().success("SignOut Succesfully");
        setTimeout(() => {
          window.location.href = "../index.html";
        }, 2000);
      })
      .catch((error) => {
        console.log("Sign-out Error");
        new AWN().alert(errorCode);
      });
  });
}
