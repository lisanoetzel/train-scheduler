// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDwHoTL_q9zEZlFyinO9oQAFUTzW1JIrV4",
    authDomain: "train-scheduler-f4a74.firebaseapp.com",
    databaseURL: "https://train-scheduler-f4a74.firebaseio.com",
    projectId: "train-scheduler-f4a74",
    storageBucket: "",
    messagingSenderId: "14892813162",
    appId: "1:14892813162:web:4b13c320d03391f8"
  };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

  //Variables related to input form
    var number;
    var name;
    var destination;
    var arrival;
    var frequency;
    var track;
        
        console.log("number", "name");

  //On click listener for Submit button  
    $("#add-train").on("click", function(){
        var number = $("#number-input").val().trim();
        var name = $("#name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var arrival = $("#arrival-input").val().trim();
        var frequency = $("#frequency-input").val().trim();
        var track = $("#track-input").val().trim();

            console.log(number+" "+ name +" "+ destination);
            
// Push data to FIREBASE
        firebase.database.ref().push ( {
            number: number,
            name: name,
            destination: destination,
            arrival: arrival,
            frequency: frequency,
            track: track,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

            //Adding listener that will post FIREBASE data to html
            firebase.database().ref().orderByChild("dateAdded").limitToLast(1).on("child_added"), function(snapshot){

                //Dispay area changes according to data
                $("#train-data-area").html(snapshot.val().add-train);

            })

    

        $("#train-data-area").append("<hr>"); 
        $("#train-data-area").append("<tr>"+snapshot.val().add-train+"</tr>");
        $("#train-data-area").append("<hr>"); 

            })

        }) 

    })

