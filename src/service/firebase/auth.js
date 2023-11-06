// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// import firebase from 'firebase';
import {
 
  query
} from "firebase/database";
// import * as firebase from 'firebase';


import { getAuth } from "firebase/auth";

import {
  getDocs,
  getFirestore,
  where,
  doc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

// import { getDatabase } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCi4qmd3cQpzHQGiCu_JGu54bEaLaXV77g",
  authDomain: "puzzle-application-70b2e.firebaseapp.com",
  databaseURL: "https://puzzle-application-70b2e-default-rtdb.firebaseio.com",
  projectId: "puzzle-application-70b2e",
  storageBucket: "puzzle-application-70b2e.appspot.com",
  messagingSenderId: "675248316988",
  appId: "1:675248316988:web:3f2724f27969ad10ce9939",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const database = getDatabase(app);
const db = getFirestore(app);


export async function register(username, email, password) {
  // Get all our input fields
  // email = document.getElementById('email').value
  // password = document.getElementById('password').value
  // full_name = document.getElementById('full_name').value
  // favouritename = document.getElementById('favouritename').value
  // phonenumber = document.getElementById('phonenumber').value

  //   Validate input fields
  console.log(
    "emai " +
      validate_email(email) +
      "passwrd" +
      validate_password(password) +
      "   " +
      email
  );
  if (validate_email(email) === false || validate_password(password) === false) {
    console.log("Email or Password is incorrect.");
    return false;
    // Don't continue running the code
  }
  // Move on with Auth
  createUserWithEmailAndPassword(auth, email, password)
    .then(function(res) {
      console.log("sign up res ", res.user.uid);
      // Declare user variable
      var user = auth.currentUser;

      userid = user.uid;

      // Add this user to Firebase Database
      // var database_ref = ref(database,'user/'+)

      // Create User data
      var user_data = {
        username: username,
        email: email,
        games_played: 0,
        score: 0,
        coins: 0,
        isadmin: false,
        uid: user.uid,
        gamesplayed: 0,
        time: 0,
      };

      //push to firestore
      pushtostore(user_data);
      addleaderbord(user_data);
      console.log("leader board updated")
      // user_data.push({score: 0 , coins : 0,time:0});
      //addgame(user_data);
      // Push to Firebase Database
      //set(ref(database, 'users/' + user.uid + '/'), user_data);

      //const storageref=ref(storage,user.uid);
      // DOne
      console.log("User Created!!");
    })
    .catch(function(error) {
      // Firebase will use this to console.log of its errors
    //  var error_code = error.code;
      var error_message = error.message;

      console.log(error_message);
    });
  return true;
}

var userid;
export async function login(email, password) {

  // Get all our input fields
  // email = document.getElementById('email').value
  // password = document.getElementById('password').value

  // Validate input fields
  console.log(validate_email(email),validate_password(password))
  if (validate_email(email) === false || validate_password(password) === false) {
    console.log("Email or Password is incorrect");
    return false;
    // Don't continue running the code
  }
  // var udata = {};
  return signInWithEmailAndPassword(auth, email, password)
    .then(()=> {
      // Declare user variable
      var user = auth.currentUser;

      userid = user.userid;
     
      
      update_user(user);

    //  var data = getfirestore(user.uid);

      return get1user(user.uid).then((data) => {
        return data
      });
      //console.log("this is user data",data);
      //console.log("this is 1 user "+get1user(user.uid))
      //data.remove(gamesplayed)
      //data.push({score: 0 , coins : 0,time:0});
      //addleaderbord(data);
      //    leaderbord();
      //addleaderbrd(user);
      //updateleadboard(user.uid,50,140)
      // PushtoStore(user)
      // console.log("User Logged In!!");
      // return true;
    })
    .catch(function(error) {
      // Firebase will use this to console.log of its errors
    //  var error_code = error.code;
      var error_message = error.message;

      console.log(error_message);
      return false;
    });
}
export function getusername(id) {}
export function Isadmin(userinfo) {
  if (userinfo.isadmin) {
    return true;
  }
  return false;
}

export async function getfirestore(id) {
  const q = query(collection(db, "users"), where("uid", "==", id));
  const docSnap = await getDocs(q);
  const docs = [];
  docSnap.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    docs.push(doc);
  });
  return docs[0];
}

export async function get1user(id) {
  const q = query(collection(db, "users"), where("uid", "==", id));

  const docSnap = await getDocs(q);
  const docs = [];
  docSnap.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    docs.push(doc.data());
  });
  console.log("This is current user data", docs[0]);
  return docs[0];
}


console.log("this is from firebase : ",userid);

export function userId() {

  
  var user = auth.currentUser;
  console.log("This is new user",user);
  return user;

}

export async function getuserdata() {
  const q = query(collection(db, "users"));
  const docSnap = await getDocs(q);
  const data = [];
  docSnap.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });

  return data;
}

// firebaseAuth = FirebaseAuth.getInstance();

// firebase.auth().onAuthStateChanged(user => { if(user) {
//    console.log(user.email)  }
// })




export async function update_user(userinfo) {

  
  var oldrec = await getfirestore(userinfo.uid);
  var user_data = oldrec.data();
  user_data.gamesplayed = user_data.gamesplayed + 1;
  await deleteDoc(doc(db, "users", oldrec.id));
  pushtostore(user_data);
}
export async function pushtostore(userinfo) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      email: userinfo.email,
      uid: userinfo.uid,
      username: userinfo.username,
      score: userinfo.score,
      coins: userinfo.coins,
      gamesplayed: userinfo.gamesplayed,
      isadmin: userinfo.isadmin,    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export async function addgame(userinfo, time, score) {
  try {
    const docRef = await addDoc(collection(db, "gamedata"), {
      uid: userinfo.uid,
      gametime: time,
      score: score,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) === true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}
function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

// function validate_field(field) {
//   if (field == null) {
//     return false;
//   }

//   if (field.length <= 0) {
//     return false;
//   } else {
//     return true;
//   }
// }

//leader board functions
export async function addleaderbord(userinfo) {
  try {
    const docRef = await addDoc(collection(db, "leaderbord"), {
      username: userinfo.username,
      uid: userinfo.uid,
      time: userinfo.time,
      score: userinfo.score,
      coins: userinfo.coins,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export async function updateleadboard(docid, newscore, newtime,newcoins) {
  console.log(docid,newscore,newtime,newcoins);
  const res =await getleaddoc(docid)
  console.log('..............res',res)
  const data = res.data()
  const id = res.id
    userid = data.username;
    console.log("This is updatelead", data,newscore);
    if (data.score <= newscore)
    {
      await deleteDoc(doc(db, "leaderbord",id));
      data.score = newscore;
      data.time = newtime;
      data.coins=newcoins;
      console.log("this is esd doc ",data)
      await addleaderbord(data);
      console.log("updated");
    }
  
}
export async function getleaddoc(id) {
  const q = query(collection(db, "leaderbord"), where("uid", "==", id));
  const docSnap = await getDocs(q);
  var p;
  docSnap.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    p = doc;
  });
  return p;
}
export async function leaderbord() {
  const q = query(collection(db, "leaderbord"), orderBy("score", "desc"));
  const docSnap = await getDocs(q);
  const data = [];
  docSnap.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}
