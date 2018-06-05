var firebase = require('firebase')


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAwF92I_MyIAk-AW8GStQ4l3XFEgzq4o-U",
    authDomain: "doorsystem-e54b5.firebaseapp.com",
    databaseURL: "https://doorsystem-e54b5.firebaseio.com",
    projectId: "doorsystem-e54b5",
    storageBucket: "doorsystem-e54b5.appspot.com",
    messagingSenderId: "639988780856"
  };
  firebase.initializeApp(config);


  console.log("hello")

  var database = firebase.database()

  firebase.database().ref('doorOpen').set({
 	  open : false
  })

var change = firebase.database().ref('doorOpen');
change.on('value', function(snapshot){
	console.log(snapshot.val())

});

