
// Your web app's Firebase configuration
var firebaseConfig = {
    //Put your creds here
};
​
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
​
// Create a variable to reference the database.
var database = firebase.database();
​
$('#submitBtn').on("click", function(e) {
    e.preventDefault();
    var input = $('input');
​
    // Code for handling the push
    database.ref().push({
        description: input[0].value,
        time: Date.now()
    });
​
    input.val('');
});
​
database.ref().on("child_added", function(snapshot) {
// storing the snapshot.val() in a variable for convenience
var data = snapshot.val();
​
console.log(data);
​
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