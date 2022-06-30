const d = new Date();
var date = moment().startOf('day').fromNow(); 
var dateElement = document.getElementById("currentDay")
dateElement.innerText = date