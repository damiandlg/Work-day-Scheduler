/**
 * Event Class
 */

 class CalEvent {
    name = ""
    constructor(name) {
        this.name = name
    }
}

/**
 * Time Slot Class
 */

class TimeSlot {
    timeSlotId = ""
    name = ""
    hour = 0
    calEvent = null
    time = 0

    slotState = {
        past: false,
        present: false,
        future: false
    }

    constructor(hour, time) {
        //set hour
        this.hour = hour
        this.time = time

        //generate standard time from military
        const timeOfDay = (hour > 12) ? "PM" : "AM"
        const t = ((hour + 11) % 12 + 1)

        //set display name
        this.name = `${t} ${timeOfDay}`

        //set time slot id
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
            return "green"
        if(this.slotState.past)
            return "gray"
        if(this.slotState.future)
            return "white"
    }

    getTimeSlotName() {
        if (this.calEvent == null) {
            return this.name
        } else {
            //Fomated to: 9 AM: My Event Name
            return `${this.name}: ${this.calEvent.name}`
        }
    }
}


/**
 * App State
 */

class AppState {
    currentDate = null
    timeSlots = {}
    currentTimeSlotId = ""

    constructor(date) {
        this.currentDate = date
        this.generateTimeSlots()
    }

    generateTimeSlots() {
        for(let i=9; i<=17; i++) {
            const timeSlot = new TimeSlot(i, this.currentDate.getHours())
            this.timeSlots[timeSlot.timeSlotId] = timeSlot
        }
    }
}

//Initialize AppState
const state = getAppState()

/**
 * Render App State on UI
 */

var dateElement = document.getElementById("currentDay")
dateElement.innerText = state.currentDate.toDateString()

//Grab UL element from our HTML DOM
var timeBlock = document.getElementById("timeBlock")

//Generate an li element for each timeSlot in out state time slot list
for (const [key, timeSlot] of Object.entries(state.timeSlots)) {
    const timeSlotElement = createTimeSlotElement(timeSlot)
    timeBlock.appendChild(timeSlotElement)
}

//creats unique timeslot elements
function createTimeSlotElement(timeSlot) {
    let item = document.createElement("li")
    item.id = timeSlot.timeSlotId
    item.className = "list-group-item"
    item.innerHTML = timeSlot.getTimeSlotName()
    item.style.background = timeSlot.getColor()

    //Handle Click Events
    item.addEventListener('click', (e) => {
        const timeSlotId = e.srcElement.id
        $('#exampleModal').modal('show');
        state.currentTimeSlotId = timeSlotId
    })

    return item
}

function render() {
   const items = timeBlock.getElementsByTagName("li");
   for (item of items) {
        const timeSlotId = item.id
        const timeSlot = state.timeSlots[timeSlotId]
        item.innerHTML = timeSlot.getTimeSlotName()
   }
}


/**
 * Save 
 */

const eventNameElement = document.getElementById("eventName")

const saveButton = document.getElementById("save")
saveButton.addEventListener('click', (e) => {
    //Get active slot id
    const timeSlotId = state.currentTimeSlotId

    //Get value from input element
    const name = eventNameElement.value
    //clear input field
    eventNameElement.value = ""

    //create and save a new CalEvent with the input value and save to state
    state.timeSlots[timeSlotId].calEvent = new CalEvent(name)

    //Hide Modal
    $('#exampleModal').modal('hide');
    console.log(state.timeSlots[timeSlotId].calEvent)
    render()
    store()
})


/**
 * Local Storge
 */

function getAppState() {

    //get saved state
    const savedState = localStorage.getItem('appState')

    //Fetch Current Date 
    const date = new Date()

    if (savedState === null) {
        return new AppState(date)
    } else {
        return load(savedState, date)
    }
}
    //converts class into string so we can store it
function store() {
    const json = JSON.stringify(state).toString()
    localStorage.setItem('appState', json)
    
}

function load(savedState, date) {

    //Parse saved state
    let json = JSON.parse(savedState);

    //Assign to AppState Class
    let newState = Object.assign(AppState.prototype, json)
    newState.currentDate = date

    //Load time slots as TimeSlot class
     Object.entries(newState.timeSlots).forEach(([key, value]) => {
        //create new timeSlot instance from json values
        const timeSlot = new TimeSlot(value.hour, date.getHours())

        //if calEvents exist load up data
        const event = value.calEvent
        if (event !== null) {
            const calEvent = new CalEvent(event.name)
            timeSlot.calEvent = calEvent
        }

        //update state
        newState.timeSlots[key] = timeSlot
      });

      //return loaded state
   return newState
}

function remove() {
    localStorage.removeItem("appState")
}

/**
 * Logs
 */

 
function printDate(date) {
    const year = date.getFullYear();
    const day = date.getDay();
    const month = date.getMonth()
    const hour = date.getHours();
    const dateString = date.toDateString()
    const dateJson = date.toJSON()

    console.log("--------------------------------")
    console.log("DATE INFORMATION")
    console.log("date: ", date)
    console.log("year: ", year)
    console.log("day: ", day)
    console.log("month: ", month)
    console.log("hour: ", hour)
    console.log("dateString: ", dateString)
    console.log("dateJson: ", dateJson)
    console.log("--------------------------------")
}