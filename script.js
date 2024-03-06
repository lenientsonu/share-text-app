const firebaseConfig = {
    apiKey: "AIzaSyBLAdYLxRjCSoTmKN_gvC4-uIBKHLaupzw",
    authDomain: "striking-canyon-311413.firebaseapp.com",
    projectId: "striking-canyon-311413",
    storageBucket: "striking-canyon-311413.appspot.com",
    messagingSenderId: "871681750584",
    appId: "1:871681750584:web:9a3d3d75c9266c3df8d8cd",
    measurementId: "G-PXXD31X8NE"
  };
var link;
    // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database().ref('messages');
 var unique;

document.getElementById("container2").style.display = "none";

 var url_string = window.location.href;
 var url = new URL(url_string);
 var unique = url.searchParams.get("unique");
 if(unique != null){
    
    // Make the form invisible
    document.getElementById("container").style.display = "none";
    // Make the message visible
    document.getElementById("container2").style.display = "block";

    // take the password from the user
    var password = prompt("Please enter the password", "");
    // Check if the password is correct


    var ref = firebase.database().ref("messages");
    
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        
        if(childData.number == unique){
            if (childData.number == unique){
                if(childData.password == password){
                    // Display the message
                    document.getElementById("create").style.display = "block";
                    document.getElementById("message").innerHTML = childData.text;
                }
                else{
                    // Display error message
                   document.getElementById("message").innerHTML = "Wrong password";
                }
            }
        }
       
            });

    }
    );


 }

// Make create button invisible
document.getElementById("create").style.display = "none";
function saveMessage(password, text){
    var newMessageRef = messagesRef.push();
    unique=createUniquenumber();
    newMessageRef.set({
        password: password,
        text: text,
        number: unique
    });
    // Show alert  mesasage with the unique number
    alert("Your unique number is: " + unique);
    // Clear form
    document.getElementById('password').value = '';
    document.getElementById('text').value = ''; 
    // Show the link to the share the message
    // Get link from the url
    var url_string = window.location.href;
    var url = new URL(url_string);
     link = url.origin + url.pathname + "?unique=" + unique;
    // Make the link clickable and also add share button
    document.getElementById("link").innerHTML = "<a href='" + link + "'>" + link + "</a>";
    document.getElementById("link").innerHTML += "<br><br><button onclick='share()'>Share</button>";

   
}
function saveText(){
  var password = document.getElementById('password').value;
    var text = document.getElementById('text').value;
    // Validate and check if password is not empty  and has minimum 3 characters
    if(password.length < 3){
        alert("Password must be at least 3 characters");
        return false;
    }
    // Save the message
    saveMessage(password, text);
}

function createUniquenumber(){
    // Create a unique 5 digit number for each image which is not in the database field number yet
    var number = Math.floor(10000 + Math.random() * 90000);
    var ref = firebase.database().ref("messages");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        if (childData.number == number){
            createUniquenumber();
        }
        });
    });
    return number;
    

}

function share(){
    // Share the link


    navigator.share({
        title: 'Secret message',
        text: 'Secret message',
        url: link,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
}

function savechanges(){
   document.getElementById("savechanges").innerHTML="Saving..."; 
    // get unique number from the url
    var url_string = window.location.href;
    var url = new URL(url_string);
    var unique = url.searchParams.get("unique");
    
    // Get the text  from message
    var text = document.getElementById('message').value;
    // save the text in the database
    var ref = firebase.database().ref("messages");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        if (childData.number == unique){
            
            firebase.database().ref('messages/' + childSnapshot.key).update({
                text: text
            });
            document.getElementById("savechanges").innerHTML="Saved"; 

        
        }
        });
    }
    );
}

function createNew(){
    // Make the form visible
    document.getElementById("container").style.display = "block";
    // Make the message invisible
    document.getElementById("container2").style.display = "none";
    document.getElementById("create").style.display = "none";
    window.history.pushState({}, document.title, "/" + "index.html" );

}

function shareshare(){
    // get url and share it
    var url_string = window.location.href;
    navigator.share({
        title: 'Secret message',
        text: 'Secret message',
        url: url_string,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
}



