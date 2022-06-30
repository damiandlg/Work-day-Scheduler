/**
 * Time slot class
 */

class TimeSlot {
    timeSlotId = ""
    name = ""
    hour = 0
    slotState = {
        past: false,
        present: false,
        future: false
    }

    constructor(hour, time) {
        //set hour
        this.hour = hour

        //generate standard military time
        const timeOfDay = (hour > 12) ? "PM" : "AM"
        const t = ((hour + 11) % 12 + 1)
        
        //set display name
        this.name = `${t} ${timeOfDay}`

        //set time slot Id
        this.timeSlotId = `${t}-${timeOfDay}`

        //set slot state
       this.setSlotState(time)
    }

    setSlotState(time) {
      this.slotState.present = (this.hour === time)
      this.slotState.past = (this.hour < time)
      this.slotState.future = (this.hour > time)
      } 
      getColor() {
        if(this.slotState.present)
            return "red"
        if(this.slotState.future)
            return "green"
        if(this.slotState.past)
            return"gray"
    }
    }

  



/**
 * App State
 */

class AppState {
    currentDate = new Date()
    timeSlots = {}

    constructor() {
        this.generateTimeSlots()
    }
    generateTimeSlots() {
        for (let i=9; i<=17; i++) {
            //For submission remember to pass this.currentDate.getHours()
            //into our TimeSlot class instead of dummy data
            const timeSlot = new TimeSlot(i, 15)
            this.timeSlots[timeSlot.timeSlotId] = timeSlot
        }
    }
}

//Initialize AppState
const state= new AppState()




/**
 * Render App State on UI
 */
var dateElement = document.getElementById("currentDay")
dateElement.innerText = state.currentDate.toDateString()
 
//Grab UL elemnt from HTMl dom
var timeBlock = document.getElementById("timeBlock")

//Generate an li element for ach timeSlot in out state time slot list
 for (const [key, timeSlot] of Object.entries(state.timeSlots)){
    const timeSlotElement = createTimeSlotElement(timeSlot)
    timeBlock.appendChild(timeSlotElement)
 }


 //Create unique time slot elements
 function createTimeSlotElement(timeSlot) {
 let item = document.createElement ("li")
    item.id = timeSlot.timeSlotId
    item.className = "list-group-item"
    item.innerHTML = timeSlot.name
    item.style.background = timeSlot.getColor()

    //Handle Click Events
    item.addEventListener('click', (e) => {
        const timeSlotId = e.srcElement.id
        console.log(timeSlotId)
        $('#exampleModal').modal('show');
        const modal = document.getElementById("modalBody")
       // modal.innerHTML = state.timeSlots[timeSlotId].name
    })


    return item
 }

/**
 * Logs
 */
 console.log(state.timeSlots)
 printDate(state.currentDate)


function printDate(date) {
    const year = date.getFullYear();
    const day = date.getDay();
    const month = date.getMonth();
    const hour = date.getHours();
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