$(document).ready(function() {

  // get times from moment
  const now = moment().format("MMMM Do YYYY");
  var nowHour24 = moment().format("H");
  //display current date
  var dateHeading = $("#currentDate");
  dateHeading.text(now);
  //display current time
  function update() {
    $("#currentTime").html(moment().format("h:mm:ss a"));
  }
  setInterval(update, 1000);
  // Get stored todos from localStorage
  var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

  // retrieve storage if available
  if (storedPlans !== null) {
    planTextArr = storedPlans;
    } else {
    planTextArr = new Array(12);
    planTextArr[3] = "Lunch";
  }

  // set variable referencing planner element
  var planDiv = $("#planContainer");
  // clear existing elements
  planDiv.empty();
  // build calendar by row for hours starting at 9
  for (var hour = 9; hour <= 17; hour++) {
    var index = hour - 9;

    // rows
    var divRow = $("<div>");
    divRow.addClass("row");
    divRow.addClass("plannerRow");
    divRow.attr("hour-index", hour);

    // Div with time
    var timeDiv = $("<div>");
    timeDiv.addClass("col-md-2");
    var timeSpn = $("<span>");
    timeSpn.attr("class", "timeBox");

    // format hours for display
    var displayHour = 0;
    var timeOFDay = "";
    if (hour > 12) {
      displayHour = hour - 12 + ":00";
      timeOFDay = "pm";
    } else {
      displayHour = hour + ":00";
      timeOFDay = "am";
    }

    // populate timeBox
    timeSpn.text(`${displayHour} ${timeOFDay}`);
    divRow.append(timeDiv);
    timeDiv.append(timeSpn);

    // build row components
    var planSpn = $("<input>");
    planSpn.attr("id", `input-${index}`);
    planSpn.attr("hour-index", index);
    planSpn.attr("type", "text");
    planSpn.attr("class", "dailyPlan");

    // access index from data array for hour
    planSpn.val(planTextArr[index]);

    // create coloumn to control width
    var inputDiv = $("<div>");
    inputDiv.addClass("col-md-9");

    divRow.append(inputDiv);
    inputDiv.append(planSpn);

    // Save row with button
    var saveDiv = $("<div>");
    saveDiv.addClass("col-md-1");
    var saveBtn = $("<i>");
    saveBtn.attr("id", `saveid-${index}`);
    saveBtn.attr("save-id", index);
    saveBtn.attr("class", "fas fa-lock saveBtn");

    // add col width and row component to row
    divRow.append(saveDiv);
    saveDiv.append(saveBtn);

    // set row color based on time and add row
    updateRowColor(divRow, hour);
    planDiv.append(divRow);
  }
  // update function to color to hour of the day accordingly
  function updateRowColor($hourRow, hour) {
    if (hour < nowHour24) {
      $hourRow.css("background-color", "#d3d3d3");
    } else if (hour > nowHour24) {
      $hourRow.css("background-color", "#90EE90");
    } else {
      $hourRow.css("background-color", "#ff6347");
    }
  }
  // saves to local storage
  $(document).on("click", "i", function(event) {
    event.preventDefault();
    var index = $(this).attr("save-id");
    var inputId = "#input-" + index;
    var value = $(inputId).val();
    planTextArr[index] = value;
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
  });
});
