var firebaseConfig = {
    //Put your creds here
    apiKey: "AIzaSyAs48uthGM74LqCjpOZXJydOGd0l-oUNYI",
    authDomain: "train-schedule-32a08.firebaseapp.com",
    databaseURL: "https://train-schedule-32a08.firebaseio.com",
    projectId: "train-schedule-32a08",
    storageBucket: "",
    messagingSenderId: "329129705019",
    appId: "1:329129705019:web:5e04810580245fdf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
​
// Create a variable to reference the database.
var database = firebase.database();
trainName ="",
destination = "",
frequency = 0,
nextArrival = 0,
minutessAaway = 0,
trainData = [];

​
$('#submitBtn').on("click", function(e) {
    e.preventDefault();
    var input = $('input');

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#train-time").val().trim();
    frequency = $("#frequency").val().trim();
​
    // Code for handling the push
    database.ref().push({
        TRAIN_NAME : trainName, 
        DESTINATION : destination, 
        TRAIN_TIME : trainTime,
        FREQUENCY : frequency
      });
​
    input.val('');
});
​
database.ref().on("child_added", function(snapshot) {
// storing the snapshot.val() in a variable for convenience

console.log(snapshot.val());

var data = snapshot.val();
​​
var now = moment();
var date = moment(data.time);
​
var overdue = now.diff(date, 'minutes');
​
var newToDo = $('<div>')
newToDo.addClass('toDoItem');
var descDiv = $('<div>').text(data.description);
newToDo.append(descDiv);
var overdueDiv = $('<div>').text(overdue + " minutes overdue");
newToDo.append(overdueDiv);
$('#to-do-holder').append(newToDo);
​
// Handle the errors
}, function(errorObject) {
console.log("Errors handled: " + errorObject.code);
});