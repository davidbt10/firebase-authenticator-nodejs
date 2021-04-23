const firebase = require('firebase');

var config = {
     apiKey: "AIzaSyDBYrkOJ5sbhStLMTuN2rBlI6Vd7KW71x8"
    // authDomain: "poc-estudo-616a6.firebaseapp.com",
    // projectId: "poc-estudo-616a6",
    // storageBucket: "poc-estudo-616a6.appspot.com",
    // messagingSenderId: "328300004776",
    // appId: "1:328300004776:web:f00e727ed3757a79be099d",
    // measurementId: "G-3X26J1LJKQ"
};

firebase.initializeApp(config);

module.exports.SignUpWithEmailAndPassword = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        return JSON.stringify(user)
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            return {err: 'The password is too weak.'}
        } else {
          return {err: errorMessage }
        }
        return {err: error}
    });
}

module.exports.SignInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                return userCredential.user;
            })
           .catch(function(error) {
             // Handle Errors here.
             var errorCode = error.code;
             var errorMessage = error.message;
             if (errorCode === 'auth/wrong-password') {
               return {err: 'Wrong password.'}
             } else {
               return {err: errorMessage}
             }
             return {err: error}
           });
   }
