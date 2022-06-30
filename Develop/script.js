/**
 * Time slot class
 */

class TimeSlot {
    name = ""
    time = 0
    slotState = {
        past: false,
        present: false,
        future: false
    }

    constructor(index) {
        if (index == 0) {
            this.name = "9 am"
            this.time = 9
        }
        if (index == 1) {
            this.name = "10 am"
            this.time = 10
        }
        if (index == 2) {
            this.name = "11 am"
            this.time = 11
        }
        if (index == 3) {
            this.name = "12 pm"
            this.time = 9
        }
        if (index == 4) {
            this.name = "1 pm"
            this.time = 1
        }
        if (index == 5) {
            this.name = "2 pm"
            this.time = 2
        }
        if (index == 6) {
            this.name = "3 pm"
            this.time = 3
        }
        if (index == 7) {
            this.name = "4 pm"
            this.time = 4
        }
        if (index == 8) {
            this.name = "5 pm"
            this.time = 5
        }
    }
}


/**
 * App State
 */

class AppState {
    currentDate = new Date()
    timeSlots = []

    constructor() {
        this.generateTimeSlots()
    }
    generateTimeSlots() {
        for ( let i=0; i<=8; i++) {
            const timeSlot = new TimeSlot(i)
            this.timeSlots.push(timeSlot)
        }
    }
}


const state= new AppState()
console.log(state.timeSlots)


printDate(state.currentDate)
var dateElement = document.getElementById("currentDay")
dateElement.innerText = state.currentDate.toDateString()
 

var timeBlock = document.getElementById("timeBlock")
 for (let timeSlot of state.timeSlots){
    let item = document.createElement ("li")
    item.className = "list-group-item"
    item.innerHTML = timeSlot.name
    timeBlock.appendChild(item)
 }

/**
 * Logs
 */

function printDate(date) {
    const year = date.getFullYear();
    const day = date.getDay();
    const month = date.getMonth();
    const dateString = date.toDateString();
    const dateJson = date.toJSON();

    console.log ("-------------------------------")
    console.log("Date Infomration")
    console.log("date:", date)
    console.log("year:", year)
    console.log("day:", day)
    console.log("month:", month)
    console.log("dateString:", dateString)
    console.log("dateJson:", dateJson)
    console.log("----------------------------------")
}