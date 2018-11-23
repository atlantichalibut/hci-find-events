var allGroups = [];


function selectGroup(inputName, listName){
    var input, filter, ol, li, a;
    input = document.getElementById(inputName);
    filter = input.value.toUpperCase();

    ol = document.getElementById(listName);
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

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", ""); //classname loses the active suffix
    }
    evt.currentTarget.className += " active";   //add the classname "active" suffix

    showTab(tabName);
}

function showTab(tabName) {

    $("#"+tabName).css('display', 'inline-block');
}

function createGroups(){
    var inGroups = document.getElementsByClassName("group");

    for(var i = 0; i < inGroups.length; i++){
        var newTitle = inGroups[i].getElementsByTagName("h2")[0]; //get the h2 (title)
        var newImg = inGroups[i].getElementsByTagName("img")[0]; //get the img 
        var newDesc = inGroups[i].getElementsByTagName("p")[0];
        
        var newGroup = new Group(newTitle.innerHTML, newImg.src, newDesc.innerHTML, i);
        allGroups.push(newGroup);

        $("#otherGroupList").append('<li id="'+i+'"onclick="displayGroup(this)"><p>'+newGroup.title+'<p></li>');
            //Add a new list item (with id corresponding to an array of images) and have a sub-p with the title 
    }
}

function displayGroup($this){
    $("#joinButton").css('display', 'inline-block');
    var postingTitle = document.getElementById("newOtherDisplay");
    postingTitle.innerHTML = $this.innerHTML;

    var idPos = $this.id;
    var currGroup = allGroups[idPos];

    var image = currGroup.imageFile;
    var descript = currGroup.description;
    $("#newGroupImg").css("display", "inline-block");
    $("#newGroupImg").attr("src",image);
    
    $("#groupDescription").html('<p class="descript">'+descript+'</p>');

    document.getElementById(idPos).style.backgroundColor = "antiquewhite";  //colour the interest back to "unselected"
    currGroup.selected = true;

    for(var i = 0; i < allGroups.length; i++){
        if(i != idPos){ //change the color of a list item after a press
            document.getElementById(i).style.backgroundColor = "lightblue";
            changeGroup = allGroups[i];
            changeGroup.selected = false;
        }
    }

}

function start(){
    createGroups();
}


function Group(title, img, description, pos) {
    this.title = title;
    this.imageFile = img;
    this.description = description;
    this.arrPos = pos;

    this.selected = false;
    this.inGroup = false;
}