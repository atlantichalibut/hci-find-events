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

        if(i%9 == 0){
            newEvent.registered = true;
        }
        allEvents.push(newEvent);        
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

        if(i < 2){
            newInterest.yourInt = true;
        }
        allInterests.push(newInterest);
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

/******** EVENTS *********/

function displayEvents(){
    var listings = JSON.parse(sessionStorage.getItem('eventArray'));

    for(var i = 0; i < listings.length; i++){
        var currEvent = listings[i];

        if(currEvent.registered){
            $("#eventsList").append('<li id="'+i+'" onclick="redirectToEvents('+currEvent.arrPos+')"><p>'+currEvent.title+'<p></li>');
        }
    }
}

function redirectToEvents(eventPos){
    var listings = JSON.parse(sessionStorage.getItem('eventArray'));

    for(var i = 0; i < listings.length; i++){
        var currEvent = listings[i];
        if(currEvent.arrPos == eventPos){
            currEvent.homeAccess = true;
        }
    }

    sessionStorage.setItem('eventArray', JSON.stringify(listings)); // store again
    window.location.href='events.html';
}

/*********** INTERESTS ***********/

function displayInterests(){
    var listings = JSON.parse(sessionStorage.getItem('interestArray'));

    for(var i = 0; i < listings.length; i++){
        var currInterest = listings[i];
        var newImg = currInterest.imageFile;

        if(currInterest.yourInt){
            $("#interestsList").append('<li id="'+i+'" onclick="redirectToInterests()"><img class="interestImg" src="'+newImg+'"><p>'+currInterest.title+'</p></li>');
        }
    }
}

function redirectToInterests(){
    window.location.href='profilepage.html';
}

/************* STARTUP AND CLASSES *************/
function start(){
    createEvents();
    createInterests();
    addToSessionStorage();

    displayEvents();
    displayInterests();
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
    this.homeAccess = false;
}

//constructor for an interest
function Interest(title, pos, img) {
    this.title = title;
    this.imageFile = img;
    this.arrPos = pos;
    this.selected = false;
    this.yourInt = false;
}
