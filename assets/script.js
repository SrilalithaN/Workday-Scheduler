// creating variable for current date
var now = moment();

var currentDate = moment().format("DD MMM YYYY");

// adding current date to the page
$("#currentDay").text("Today's Date: " + currentDate);

$(document).ready(function () {
  // loop for diplaying the saved tasks by getting them from local storage
  timeArr = $(".hour").toArray();
  for (var i = 0; i < timeArr.length; i++) {
    $(timeArr[i])
      .siblings("textarea")
      .text(localStorage.getItem($(timeArr[i]).attr("data-time")));
  }
});

//loop to print the time-slot,tasks and save buttons for 9am to 5pm

for (var i = 0; i < 9; i++) {
  //making a row for every-time slot
  var rowBlock = $("<div>").addClass("row");
  //  creating a variable for time-slot
  var timeSlot = $("<div>")
    .addClass("hour col-md-2")
    .text(moment("9.00 A.M", "hh:mm A").add(i, "hours").format("hA"));
  timeSlot.attr(
    "data-time",
    moment("9.00 AM", "hh:mm A").add(i, "hours").format("hA")
  );
  // creating a variable for tasks
  var tasks = $("<textarea>").addClass("col-md-9");
  // creating a variable for save button
  var saveButton = $("<button>")
    .addClass("saveBtn col-md-1")
    .html('<i class= "fas fa-save"></i>');

  // Adding all the elements in order to the row
  $(".container").append(rowBlock);
  $(rowBlock).append(timeSlot);
  $(timeSlot).after(tasks);
  $(tasks).after(saveButton);

  //colour coding the rows to indicate past,present and future times
  //if time is same as current-time display the block in red
  if (now.isSame(moment("9.00 AM", "hh:mm A").add(i, "hours"), "hour")) {
    $(tasks).addClass("present");
  } // if time is in past ,display the block in gray colour
  else if (now.isAfter(moment("9.00 AM", "hh:mm A").add(i, "hours"), "hour")) {
    $(tasks).addClass("past");
  }
  // if time is in future, display the block green
  else if (now.isBefore(moment("9.00 AM", "hh:mm A").add(i, "hours"), "hour")) {
    $(tasks).addClass("future");
  }
}
//adding click event to save button to store data in local storage on click.
$(".saveBtn").on("click", function () {
  localStorage.setItem(
    $(this).siblings("div.hour").attr("data-time"),
    $(this).siblings("textarea").val()
  );
});
