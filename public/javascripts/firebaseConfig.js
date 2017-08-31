// Initialize Firebase
var config = {
  apiKey: "AIzaSyAr1ic8lr_asYZTwwIjBNp3uiqFdu1QJKI",
  authDomain: "shield-dev-91210.firebaseapp.com",
  databaseURL: "https://shield-dev-91210.firebaseio.com",
  projectId: "shield-dev-91210",
  storageBucket: "shield-dev-91210.appspot.com",
  messagingSenderId: "514816655617"
};
firebase.initializeApp(config);

const auth = firebase.auth();
const database = firebase.database();
var authId;

// log in status
if(window.location.pathname === '/login' || window.location.pathname === '/signup'){
  auth.onAuthStateChanged(user => {
    if(user){
      setTimeout(() => {
        window.location = '/';
      }, 2000)
    } else {
      console.log('need to sign in');
    }
  });
} else {
  auth.onAuthStateChanged(user => {
    if(user){
      authId = user.uid
    } else {
      window.location = '/login';
    }
  });
}

// functions
function logout(){
  auth.signOut()
  .then(response => {
    window.location = '/login';
  })
}

function getAuthId(){
  return authId;
}
