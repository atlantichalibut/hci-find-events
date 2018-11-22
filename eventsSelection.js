
var allEvents = []; //global event array

function selectEvent(){
    var input, filter, ol, li, a;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();

    ol = document.getElementById("orderedList");
    li = ol.getElementsByTagName("li");

    for(var i = 0; i < li.length; i++){
        a = li[i].getElementsByTagName("p")[0]; //get the first part of the list item

        if(a.innerHTML.toUpperCase().indexOf(filter) > -1){
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function registerEvent(){
    var currEvent;
    
    for(var i = 0; i < allEvents.length; i++){
        currEvent = allEvents[i];

        if(currEvent.selected) { // if it's selected and not already registered
            if(!currEvent.registered){
                currEvent.registered = true; // register for the event
                changeRegButton(currEvent);
            } else {
                currEvent.registered = false; // register for the event
                changeRegButton(currEvent);
            }
        }
    }
}



/*
    Create Event objects based on given HTML
*/
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

        $("#orderedList").append('<li id="'+i+'"onclick="displayEvent(this)"><p>'+newEvent.title+'<p></li>');
            //Add a new list item (with id corresponding to an array of images) and have a sub-p with the title 
    }
}

function displayEvent($this){
    var postingTitle = document.getElementById("newDisplay");
    postingTitle.innerHTML = $this.innerHTML;
    var idPos = $this.id;
    var currEvent = allEvents[idPos];

    var image = currEvent.imageFile;
    var descript = currEvent.description;
    var date = currEvent.date;
    var loc = currEvent.location;

    $("#newEventImg").css("display", "inline-block");
    $("#newEventImg").attr("src",image);
    
    //$("#newDisplay").append("<img class='eventImg' src='"+image+"'>");
    $("#eventDescription").html('<p class="descript">'+descript+'</p>');
    $("#eventDate").html(date);
    $("#eventLocation").html(loc);

    document.getElementById(idPos).style.backgroundColor = "antiquewhite";	//colour the interest back to "unselected"
    currEvent.selected = true;

    for(var i = 0; i < allEvents.length; i++){
        if(i != idPos){ //change the color of a list item after a press
            document.getElementById(i).style.backgroundColor = "lightblue";
            changeEvent = allEvents[i];
            changeEvent.selected = false;
        }
    }

    changeRegButton(currEvent);
}

function changeRegButton(event) {
    if(event.selected && event.registered){
        $("#registerButton").html("REGISTERED");
        $("#registerButton").css("background-color", "red");
    } else {
        $("#registerButton").html("REGISTER");
        $("#registerButton").css("background-color", "green");
    }
}

function start(){
    createEvents();
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

