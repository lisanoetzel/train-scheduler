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
        
   //Adding listener that will post FIREBASE data to html
        database().ref().on("child_added"), function(childSnapshot){
            console.log(childSnapshot.val());

        // Train information stored in variable
            var trainNumber = childSnapshot.val().number;
            var trainName = childSnapshot.val().name;
            var trainDestination = childSnapshot.val().destination;
            var trainArrival = childSnapshot.val().arrival;
            var trainFrequency = childSnapshot.val().frequency;
            var trainTrack = childSnapshot.val().track;

            // Console Logs
                console.log(trainNumber);
                console.log(trainName);
                console.log(trainDestination);
                console.log(trainArrival);
                console.log(trainFrequency);
                console.log(trainTrack);

    // ************** TIME CALCULATIONS ********************//

            //CURRENT TIME
                var currentTime = moment();
                    console.log("Current Time is " + moment(currentTime).format("HH:mm:ss"));

            //Appending Current Time
                $("#current-time").append("<h2> </h2");

            //Appending Train Data to HTML
                $("#train-data-area").append(
                    "<tr>" +
                        "<th scope='row'>" + trainNumber + "</th>" +
                        "<td>" + trainName + "</td>" +
                        "<td>" + trainDestination + "</td>" +
                        "<td>" + trainArrival + "</td>" +
                        "<td>" + trainFrequency + "</td>" +
                        "<td>" + trainTrack + "</td>" +
                    "</tr>"
                );

        };
             
