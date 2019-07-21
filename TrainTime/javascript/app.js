//Initialize Firebase
var config = {
    apiKey: "AIzaSyASGHa04XvJPPWW9xUden9u4Yg1oLxDcbY",
    authDomain: "tryguy-b7bef.firebaseapp.com",
    databaseURL: "https://tryguy-b7bef.firebaseio.com",
    projectId: "tryguy-b7bef",
    storageBucket: "tryguy-b7bef.appspot.com",
    messagingSenderId: "954742182212"
};

firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTime = "";
var frequency = 0;

//current time function
function currentTime() {
    var current = moment().format('LT');
    $("#currentTime").html(current);
    setTimeout(currentTime, 1000);
};

$(".form-control").on("keyup", function() {
    var trainTemp = $("#train-name").val().trim();
    var destTemp = $("#destination").val().trim();
    var timeTemp = $("#first-train").val().trim();
    var freqTemp = $("#frequency").val().trim();
  
    sessionStorage.setItem("train", trainTemp);
    sessionStorage.setItem("destination", destTemp);
    sessionStorage.setItem("time", timeTemp);
    sessionStorage.setItem("frequency", freqTemp);
});

$("#train-name").val(sessionStorage.getItem("train"));
$("#destination").val(sessionStorage.getItem("destination"));
$("#first-train").val(sessionStorage.getItem("time"));
$("#frequency").val(sessionStorage.getItem("frequency"));

$("#submit").on("click", function(event) {
    event.preventDefault();

    if ($("#train-name").val().trim() === "" || $("#destination").val().trim() === "" ||
    $("#first-train").val().trim() === "" || $("#frequency").val().trim() === "") {

        alert("Complete Blank Fields");
    }
    else {
        
        trainName = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTime = $("#first-train").val().trim();
        frequency = $("#frequency").val().trim();

        $(".form-control").val("");

        database.ref().push({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            firstTime: firstTime,
      
        });

        sessionStorage.clear();
    }

});

database.ref().on("child_added", function(childSnapshot) {
    var converted = moment(childSnapshot.val().firstTime, "hh:mm");
    var differ = moment().diff(moment(converted), "minutes");
    var remaining = differ % childSnapshot.val().frequency;
    var arrival = childSnapshot.val().frequency - remaining;
    var nextTrain = moment().add(arrival, "minutes");
  
    var addNew = $("<tr>");
    addNew.append($("<td>" + childSnapshot.val().trainName + "</td>"));
    addNew.append($("<td>" + childSnapshot.val().destination + "</td>"));
    addNew.append($("<td>" + childSnapshot.val().frequency + "</td>"));
    addNew.append($("<td>" + moment(nextTrain).format("LT") + "</td>"));
    addNew.append($("<td>" + arrival + "</td>"));
  
    $("#table-rows").append(addNew);
  
});

currentTime();
