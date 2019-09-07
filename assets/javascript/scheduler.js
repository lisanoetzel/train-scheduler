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

// //Variables related to input form
// var number;
// var name;
// var destination;
// var arrival;
// var frequency;
// var track;

console.log("number", "name");

//Listener for Submit button  
$("#add-train").on("click", function () {
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
    // alert("New train added");

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
database.ref().on("child_added", function (childSnapshot) {

    //Console Logs
    console.log(childSnapshot.val().number);
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(trainArrival = childSnapshot.val().arrival);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().track);

    var hypoFrequency = childSnapshot.val().frequency.split(":");
    var minuteFrequency = (parseInt(hypoFrequency[0] * 60) +  parseInt(hypoFrequency[1]));
        console.log(minuteFrequency);
    var firstTime = moment(childSnapshot.val().arrival, "HH:mm").subtract(1, "years");
    var totalMinutesYear = moment().diff(firstTime, "minutes");
        console.log(totalMinutesYear);
    var minutesFromLastTrain = totalMinutesYear % minuteFrequency;
        console.log(minutesFromLastTrain);  
    var minutesUntilNextTrain = minuteFrequency - minutesFromLastTrain;
        console.log(minutesUntilNextTrain); 
    var nextTrainArrival = moment().add(minutesUntilNextTrain, "minutes");
        console.log(nextTrainArrival);
    var timeAway = moment(nextTrainArrival).format("HH:mm");
       
       

    //Appending Train Data to Current Schedule Table in HTML
    $("#train-table").append(
        "<tr>" +
        "<th scope='row'>" + childSnapshot.val().number + "</th>" +
        "<td>" + childSnapshot.val().name + "</td>" +
        "<td>" + childSnapshot.val().destination + "</td>" +
        "<td>" + timeAway + "</td>" +
        "<td>" + childSnapshot.val().frequency + "</td>" +
        "<td>" + minutesUntilNextTrain + "</td>" +
        "<td>" + childSnapshot.val().track + "</td>" +
        "</tr>")
});

// ************** TIME CALCULATIONS ********************//

//CURRENT TIME
// var currentTime = moment();
console.log("Current Time is " + moment().format("HH:mm:ss"));
    //Appending Current Time
    $("#current-time").text(moment().format("HH:mm:ss"));
setInterval(function() {
    //Appending Current Time
    $("#current-time").text(moment().format("HH:mm:ss"));
}, 1000)
 