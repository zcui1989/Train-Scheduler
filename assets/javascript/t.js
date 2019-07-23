var firebaseConfig = {
    apiKey: "AIzaSyAs48uthGM74LqCjpOZXJydOGd0l-oUNYI",
    authDomain: "train-schedule-32a08.firebaseapp.com",
    databaseURL: "https://train-schedule-32a08.firebaseio.com",
    projectId: "train-schedule-32a08",
    storageBucket: "",
    messagingSenderId: "329129705019",
    appId: "1:329129705019:web:5e04810580245fdf"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";
var minutesAway = 0;

$("#add-train").on("click", function() {
  event.preventDefault();

trainName = $("#train-input").val().trim();
destination = $("#destination-input").val().trim();
firstTrainTime = moment($("#time-input").val().trim(), "hh:mm").format("X");
frequency = $("#minutes-input").val().trim();

var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
};

  database.ref().push(newTrain);

  $("#train-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#minutes-input").val("");

}); 

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var frequency = childSnapshot.val().frequency;

  var trainArrival = moment.unix(firstTrainTime).format("hh:mm a");

  var timeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(timeConverted), "minutes");
  var tRemainder = diffTime % frequency;
  var tMinutesTillTrain = frequency - tRemainder;

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + trainArrival + "</td><td>" + tMinutesTillTrain + "</td><td>");

}, function(errorObject){
console.log("The read failed: " + errorObject.code)
});