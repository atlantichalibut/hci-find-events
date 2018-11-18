
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

/*
    Create Event objects based on given HTML
*/
function createEvents(){
    var inEvents = document.getElementsByClassName("event");

    for(var i = 0; i < inEvents.length; i++){
        var newTitle = inEvents[i].getElementsByTagName("h2")[0]; //get the h2 (title)
        var newImg = inEvents[i].getElementsByTagName("img")[0]; //get the img 
        var newDesc = inEvents[i].getElementsByTagName("p")[0];
        
        var newEvent = new Event(newTitle.innerHTML, newImg.src, newDesc.innerHTML, i);
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

    $("#newDisplay").append("<img class='eventImg' src='"+image+"'>");
    $("#eventDescription").html('<p class="descript">'+descript+'</p>');
    //$this.style.backgroundColor = "lightgreen";
}

function hideEvents(){
    var showNum = 3;
    $('#orderedList li:gt('+showNum+')').hide();
}


function showEvents(){
    $('#orderedList li:gt(3)').toggle();
    $(this).html('Show Less'); // Flip the More/Less sign
}

function start(){
    createEvents();
    hideEvents(); 
}

function Event(title, img, description, pos) {
    this.title = title;
    this.imageFile = img;
    this.description = description;
    this.arrPos = pos;
}

