import {
    getAuth, createUserWithEmailAndPassword, signInWithPopup,
    GoogleAuthProvider,  onAuthStateChanged,  signOut,


} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import app from './firebase.js'

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


const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();


//SIGN UP ACCOUNT

let signup = () => {
    let signupName = document.getElementById('signupName');
    let signupEmail = document.getElementById('signupEmail');
    let signupPassword = document.getElementById('signupPassword');

    if (signupName.value === "") {
        new AWN().alert("Name Field Required!");
    } else if (signupEmail.value == "") {
        new AWN().alert("Email Field Required!");
    } else if (signupEmail.value == "@") {
        new AWN().alert("Email Field Is Not Correct!");
    } else if (signupPassword.value == "") {
        new AWN().alert("Password Field Required!");
    } else if (signupPassword.value <= 8) {
        new AWN().alert("Password Should Not Be Grater Then 8");
    }

    let userName = signupName.value;
    let userEmail = signupEmail.value;
    let userPassword = signupPassword.value;
    if (
        signupName.value !== "" ||
        signupEmail.value !== "" ||
        signupPassword.length <= 8
    ) {


        createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("User===> ", user);

                async  function userDataSent() {
                    // const docRef = await addDoc(collection(db, "users" , user.uid), {
                    //   name:userName,
                    //   email:userEmail,
                    //   password:userPassword
                    // });
                    // console.log("Document written with ID: ", docRef.id);
        
                    await setDoc(doc(db, "users", user.uid), {
                      name:userName,
                     email:userEmail,
                     password:userPassword,
                     uid:user.uid
                    });
                          console.log("Document written with ID: ", user.uid);
                         
        
                  }
                  userDataSent()
                new AWN().success("Account SignUp Succesfully");
                setTimeout(() => {
                    window.location.href = "./dashboard.html";
                }, 5000);



               
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error==>", error);
                new AWN().alert(errorCode);
                // ..
            });

        signupName.value = "";
        signupEmail.value = "";
        signupPassword.value = "";

    }
}

let signupBtn = document.getElementById('signupBtn');
signupBtn.addEventListener('click', signup)


//SignUp With Google

let googleSignUp = document.getElementById("googleSignUp");

if (googleSignUp) {
    googleSignUp.addEventListener("click", () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                new AWN().success("Account SignUp Succesfully With Google");
                setTimeout(() => {
                    window.location.href = "./dashboard.html";
                }, 3000);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                new AWN().alert(errorCode);
            });
    });
}




//Sign In COde

let loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    let loginName = document.getElementById("loginName");
    let loginemail = document.getElementById("loginemail");
    let loginpassword = document.getElementById("loginpassword");

    if (loginName.value === "") {
      new AWN().alert("Name Field Required!");
    } else if (loginemail.value == "") {
      new AWN().alert("Email Field Required!");
    } else if (loginemail.value == "@") {
      new AWN().alert("Email Field Is Not Correct!");
    } else if (loginpassword.value == "") {
      new AWN().alert("Password Field Required!");
    } else if (loginpassword.value <= 8) {
      new AWN().alert("Password Should Not Be Grater Then 8");
    }

    if (
      loginName.value !== "" ||
      loginemail.value !== "" ||
      loginpassword.length <= 8
    ) {
      signInWithEmailAndPassword(auth, loginemail.value, loginpassword.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          new AWN().success("Account Sign In Succesfully!");
          setTimeout(() => {
            window.location.href = "./dashboard.html";
          }, 3000);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("account Register Failed");
          new AWN().alert(errorCode);
        });
    }

    loginName.value = "";
    loginemail.value = "";
    loginpassword.value = "";
  });
}

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
