
var allGroups = []; //global Group array

function selectGroup(){
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
    Create Group objects based on given HTML
*/
function createGroups(){
    var inGroups = document.getElementsByClassName("group");

    for(var i = 0; i < inGroups.length; i++){
        var newTitle = inGroups[i].getElementsByTagName("h2")[0]; //get the h2 (title)
        var newImg = inGroups[i].getElementsByTagName("img")[0]; //get the img 
        var newDesc = inGroups[i].getElementsByTagName("p")[0];
        
        var newGroup = new Group(newTitle.innerHTML, newImg.src, newDesc.innerHTML, i);
        allGroups.push(newGroup);

        $("#groupList").append('<li id="'+i+'"onclick="displayGroup(this)"><p>'+newGroup.title+'<p></li>');

            //Add a new list item (with id corresponding to an array of images) and have a sub-p with the title 
    }
}

function displayGroup($this){
    var postingTitle = document.getElementById("groupDisplay");
    postingTitle.innerHTML = $this.innerHTML;
    var idPos = $this.id;
    var currGroup = allGroups[idPos];

    var image = currGroup.imageFile;
    var descript = currGroup.description;

    $("#groupDisplay").append("<img class='groupImg' src='"+image+"'>");
    $("#groupDescription").html('<p class="descript">'+descript+'</p>');
    //$this.style.backgroundColor = "lightgreen";
}

function hideGroups(){
    var showNum = 3;
    $('#groupList li:gt('+showNum+')').hide();
}


function showGroups(){
    $('#groupList li:gt(3)').toggle();
    $(this).html('Show Less'); // Flip the More/Less sign
}

function GroupStart(){
    createGroups();
    hideGroups(); 
}

function Group(title, img, description, pos) {
    this.title = title;
    this.imageFile = img;
    this.description = description;
    this.arrPos = pos;
}







