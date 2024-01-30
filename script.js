// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {

var currentDayEl = $("#currentDay");//Defines the variable with the current date.
var today = dayjs().format("dddd, MMM D [ || Clock: ] h:mm:ss a");//Returns the date and time in the specified format, and saves it in the 'var=today' by using 'day.js'.
currentDayEl.text(today);//Fills the text content inside the <p id="currentDay"> in the HTML, with the value obtained in the 'var=today'.

//Helps to refresh the value of the 'var=today', every second, and updates the string inside 'currentDayEl'.
function updateClock() {
  setInterval(function() {
    today = dayjs().format("dddd, MMM D [ || Clock: ] h:mm:ss a");
    currentDayEl.text(today);
  }, 1000);
};

updateClock(); //Calls the function to display and update 'date and time' in a 12 hour format.

const arraysOfHourId = ["hour-9","hour-10","hour-11","hour-12","hour-13","hour-14","hour-15","hour-16","hour-17"];
const currentHour = dayjs().hour(); //Defines the current time in hours only '24 hrs format'

//checks every hourId inside the array, and applies the statement to all of them.
for (const hourId of arraysOfHourId) {
  const element = document.getElementById(hourId);

  if (element) {
    const numericValue12HrFormat = parseInt(element.querySelector(".hour").textContent);//Gets the value inside every element that has the ".hour" in it, in text format.

    if (currentHour > numericValue12HrFormat) { //set hours format to "past" if the actual clock time hour allready passed the shown hour in the list.
      element.classList.remove("future", "present");
      element.classList.add("past");
    } else if (currentHour === numericValue12HrFormat){ //set hours format to "present" if the actual clock time hour is the same as the shown hour in the list.
      element.classList.remove("past", "future");
      element.classList.add("present");
    } else { //set hours format to "future" if the actual clock time hour has not pass the shown hour in the list.
      element.classList.remove("present", "past");
      element.classList.add("future");
    };
  };
};

//The next 'consts', are define by the id's in the html.
const changeTime9 = document.getElementById("hour-9");
const changeTime10 = document.getElementById("hour-10");
const changeTime11 = document.getElementById("hour-11");
const changeTime12 = document.getElementById("hour-12");
const changeTime13 = document.getElementById("hour-13");
const changeTime14 = document.getElementById("hour-14");
const changeTime15 = document.getElementById("hour-15");
const changeTime16 = document.getElementById("hour-16");
const changeTime17 = document.getElementById("hour-17");

//This select the content string inside the elements selected in the 'consts' before, and change the display string of each one.
//By doing this, the code in the HTML is not modified, and it dosen's affect the JavaScript.
changeTime9.querySelector(".hour").textContent = "9 a.m";
changeTime10.querySelector(".hour").textContent = "10 a.m";
changeTime11.querySelector(".hour").textContent = "11 a.m";
changeTime12.querySelector(".hour").textContent = "12 a.m";
changeTime13.querySelector(".hour").textContent = "1 p.m";
changeTime14.querySelector(".hour").textContent = "2 p.m";
changeTime15.querySelector(".hour").textContent = "3 p.m";
changeTime16.querySelector(".hour").textContent = "4 p.m";
changeTime17.querySelector(".hour").textContent = "5 p.m";

//Waits for the document to be ready.
$(document).ready(function() { //Saves the contents in the localStorage
  $(".saveBtn").on("click", function() { //Adds an 'eventListener' for the buttons.
    var textValue = $(this).siblings("textarea").val(); //Gets the value of the textarea within the same parent element (they are siblings).
    var id = $(this).closest(".row").attr("id"); //Gets the unique "id" associated with the saveBtn.
    localStorage.setItem("text inside " + id, textValue); //Stores the value in the local storage with a key based on each ID.
  });

  $(".row").each(function() {
    var id = $(this).attr("id");
    var savedText = localStorage.getItem("text inside " + id);
    $(this).find("textarea").val(savedText); //Starts the page by filling the rows besides the saved buttons with the saved info of each key inside the localstorage
    //in this case, "this", refers of the saveBtn (the current element that triggered the event).
  });
});

});
