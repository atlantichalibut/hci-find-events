
var allEvents = []; //global event array

function addToSessionStorage(){
    sessionStorage.setItem('eventArray', JSON.stringify(allEvents));
}

function addToEventList(){
    var listings = JSON.parse(sessionStorage.getItem('eventArray'));
    allEvents = listings;

    for(var i = 0; i < allEvents.length; i++){
        var newEvent = allEvents[i];
        $("#orderedList").append('<li id="'+i+'"onclick="displayEvent(this)"><p>'+newEvent.title+'<p></li>');
    }
}

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
    addToSessionStorage();
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
    $("#eventDate").html("<b> Date: </b>"+date);
    $("#eventLocation").html("<b>Location: </b>"+loc);

    $("#eventDate").css("border-bottom", "1px dotted black");
    $("#eventLocation").css("border-bottom", "1px dotted black");

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
        $("#registerButton").css("background-color", "#6D7993");
    } else {
        $("#registerButton").html("REGISTER");
        $("#registerButton").css("background-color", "#C7CEDB");
    }
}


function start(){
    addToEventList(); 
}