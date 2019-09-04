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

  //Listener for Submit button  
    $("#add-train").on("click", function(){
        // $("#add-train").submit(function(event){

            //User Input
            var trainNumber = $("#number-input").val().trim();
            var trainName = $("#name-input").val().trim();
            var trainDestination = $("#destination-input").val().trim();
            var trainArrival = moment($("#arrival-input").val().trim(), "HH:mm:ss").format("HH:mm:ss");
            var trainFrequency = $("#frequency-input").val().trim();
            // var trainNext = moment($("#next-input").val().trim(), "HH:mm:ss").format("HH:mm:ss");
            var trainTrack = $("#track-input").val().trim();

            //Object for above data
            var newTrain = {
                number: trainNumber,
                name: trainName,
                destination: trainDestination,
                arrival: trainArrival,
                frequency: trainFrequency,
                // next: trainNext,
                track: trainTrack
            };

            // Push data to FIREBASE
                database.ref().push(newTrain); 

            //Console Logs 
                console.log("Button has been clicked");
                console.log(newTrain.number);
                console.log(newTrain.name);
                console.log(newTrain.destination);
                console.log(newTrain.arrival);
                console.log(newTrain.frequency);
                // console.log(newTrain.next);
                console.log(newTrain.track);
            
            //Alert
                alert("New train added");

            //Clear User-input form
                $("#number-input").val("");
                $("#name-input").val("");
                $("#destination-input").val("");
                $("#arrival-input").val("");
                $("#frequency-input").val("");
                $("#track-input").val("");

            //Next train arrives
                return false;   
        });
        
   //Pull data from FIREBASE to send to HTML
        database.ref().on("child_added", function(childSnapshot){

            //Console Logs
           console.log(childSnapshot.val().number);
           console.log(childSnapshot.val().name);
           console.log(childSnapshot.val().destination);
           console.log(trainArrival = childSnapshot.val().arrival);
           console.log(childSnapshot.val().frequency);
           console.log(childSnapshot.val().track);

        //Appending Train Data to HTML
        $("#train-data-area").append(
            "<tr>" +
                "<th scope='row'>" + childSnapshot.val().number + "</th>" +
                "<td>" + childSnapshot.val().name + "</td>" +
                "<td>" + childSnapshot.val().destination + "</td>" +
                "<td>" + childSnapshot.val().arrival + "</td>" +
                "<td>" + childSnapshot.val().frequency + "</td>" +
                "<td>" + childSnapshot.val().track + "</td>" +
            "</tr>"
        
         , function (errorObject) {
                console.log("Errors handled: " + errorObject);

        });
            database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
                $("#number-display").text(snapshot.val().number); 
                $("#name-display").text(snapshot.val().name); 
                $("#destination-display").text(snapshot.val().destination); 
                $("#arrival-display").text(snapshot.val().arrival);
                $("#frequency-display").text(snapshot.val().frequency);
                $("#away-display").text(snapshot.val().away);
                $("#track-display").text(snapshot.val().track);

            });
        ;
        });

    // ************** TIME CALCULATIONS ********************//

            //CURRENT TIME
                var currentTime = moment();
                    console.log("Current Time is " + moment(currentTime).format("HH:mm:ss"));

              //Appending Current Time
                $("#current-time").append("<h2></h2");

            //First Arrival
                var firstArrival =  moment(arrival, "HH:mm:ss");
                    console.log("First arrival is " + moment(arrival).format("HH:mm:ss"));
            
            //First Time Away
                var firstAway = moment().diff(currentTime - firstArrival, "HH:mm:ss");

            //Subsequent Time Away
                var timeAway = moment().diff(firstAway + frequency, "HH:mm:ss"); 