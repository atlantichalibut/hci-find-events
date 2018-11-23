var allEvents = [];
var allInterests = [];
var allEvents = [];
var allInterests = [];


function createEvents(){
    var inEvents = document.getElementsByClassName("event");

    for(var i = 0; i < inEvents.length; i++){
        var newTitle = inEvents[i].getElementsByTagName("h2")[0]; //get the h2 (title)
        var newImg = inEvents[i].getElementsByTagName("img")[0]; //get the img 
        var newDesc = inEvents[i].getElementsByTagName("p")[0];
        var newDate = inEvents[i].getElementsByTagName("p")[1];
        var newLoc = inEvents[i].getElementsByTagName("p")[2];
        
        var newEvent = new Event(newTitle.innerHTML, newImg.src, newDesc.innerHTML, i, newDate.innerHTML, newLoc.innerHTML);
        allEvents.push(newEvent);

        //
            //Add a new list item (with id corresponding to an array of images) and have a sub-p with the title 
        
    }
}

/*
    Create Interests objects based on given HTML class interestsInformation
*/
function createInterests(){
    var inInterests = document.getElementsByClassName("interest");

    for(var i = 0; i < inInterests.length; i++){
        var newTitle = inInterests[i].getElementsByTagName("h2")[0]; //get the h2 (title)
        var newImg = inInterests[i].getElementsByTagName("img")[0]; //get the img 
        
        var newInterest = new Interest(newTitle.innerHTML, i, newImg.src);
        allInterests.push(newInterest);
            //Add a new list item (with id corresponding to an array of images) and have a sub-p with the title
    }
}

function addToSessionStorage(){
    var doIt = sessionStorage.getItem('locallyAdded');
    
    if(doIt == null){
        sessionStorage.setItem('interestArray', JSON.stringify(allInterests));
        sessionStorage.setItem('eventArray', JSON.stringify(allEvents));

        // SET A FLAG SO WE KNOW WE'VE ALRADY EXECUTED THIS CODE!
        sessionStorage.setItem('locallyAdded', true);
    }
}

function start(){
    createEvents();
    createInterests();
    addToSessionStorage();
}

function Event(title, img, description, pos, date, location) {
    this.title = title;
    this.imageFile = img;
    this.description = description;
    this.arrPos = pos;
    this.date = date;
    this.location = location;
    this.selected = false;
    this.registered = false;
}

//constructor for an interest
function Interest(title, pos, img) {
    this.title = title;
    this.imageFile = img;
    this.arrPos = pos;
    this.selected = false;
    this.yourInt = false;
}