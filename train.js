$(document).ready(function() {

	// the lines below were taken from my firebase account that we made during class.and by doing this we will activate firebase.
  var config = {
    apiKey: "AIzaSyCZLJ8P2Mggf91co-1UFvPkPJ9iOUkblDo",
    authDomain: "marzu-db9c0.firebaseapp.com",
    databaseURL: "https://marzu-db9c0.firebaseio.com",
    projectId: "marzu-db9c0",
    storageBucket: "marzu-db9c0.appspot.com",
    messagingSenderId: "601963852861"
  }; 
  firebase.initializeApp(config);
  var database = firebase.database();
   
  // the lines below are made to add any buttons to check the times of the trains.
  $("#add-train-btn").on("click", function(event) {
  		event.preventDefault();

	 // the lines blow will grab the whatever the person using the webpage enters into the text boxes
	  var trainName = $("#train-name-input").val().trim();
	  var trainDest = $("#dest-input").val().trim();
	  var firstTrain = $("#firstTrain-input").val().trim();
	  var trainFreq = $("#freq-input").val().trim();

	  // the line below will HOLD whatever the user enters into those boxes, an acts a short term holder for them.
	  var newTrain = {
	  	name: trainName,
	  	destination: trainDest,
	  	start: firstTrain,
	  	frequency: trainFreq
	  };
  		database.ref().push(newTrain);
  		alert("Train successfully added");

	 // the line below will clear all the text boxes when done
	  $("#train-name-input").val("");
	  $("#dest-input").val("");
	  $("#firstTrain-input").val("");
	  $("#freq-input").val("");
  	});

	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	  console.log(childSnapshot.val());

	  // put everything in a variable 
	  var trainName = childSnapshot.val().name;
	  var trainDest = childSnapshot.val().destination;
	  var firstTrain = childSnapshot.val().start;
	  var trainFreq = childSnapshot.val().frequency;

  		var trainFreq;
   		var firstTime = 0;

	   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	    console.log(firstTimeConverted);
	    var currentTime = moment();
	    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));


		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);


	    var tRemainder = diffTime % trainFreq;
	    console.log(tRemainder);

	    var tMinutesTillTrain = trainFreq - tRemainder;
	    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


		// this line will added each line into the data table

	  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + 
	   "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
	});

});