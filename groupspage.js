
var allGroups = []; //global Group array

function selectGroup(){
    var input, filter, ol, li, a;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();

    ol = document.getElementById("groupsList");
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

function addToMyGroups(){
    var toAdd = document.getElementById("groupDisplay").textContent;
    var group = searchGroups(toAdd);
    group.isMyGroup = true;
    toggleDisplayButtons(group);
    $("#yourGroupsList").append('<li class="myGroup" id="'+group.arrPos+'"onclick="displayMyGroup(this)"><p>'+group.title+'<p></li>');
}

function acceptInvite(){
    var toAdd = document.getElementById("inviteDisplay").textContent;
    var group = searchGroups(toAdd);
    group.isMyGroup = true;
    toggleDisplayButtons(group);
    $("#yourGroupsList").append('<li class="myGroup" id="'+group.arrPos+'"onclick="displayMyGroup(this)"><p>'+group.title+'<p></li>');
    deleteInvite();

}

function deleteInvite(){
    var list = document.getElementById("inviteList");
    var toDel = document.getElementsByClassName("inviteLI")[0];
    list.removeChild(toDel);
}


function leaveGroup(){
    var name = document.getElementById("yourgroupDisplay").innerText;
    var list = document.getElementById("yourGroupsList");
    var toDel;
    var groupList= document.getElementsByClassName("myGroup");
    var groupText;
    for(var i = 0; i<groupList.length; i++){
        groupText =  groupList[i].getElementsByTagName("p")[0].innerText;
        if(groupText == name){
            toDel = groupList[i];
        }
    }
    list.removeChild(toDel);
}

function searchGroups(find){
    var found;
    for(var i = 0; i< allGroups.length; i++){
        if (allGroups[i].title == find){
            found = allGroups[i];
        }
    }
    return found
}

// function clearTabs(dontClear){
//     if(dontClear == "yourgroupDisplay"){
//         document.getElementById("yourgroupDisplay").innerText="";
//         document.getElementById("yourgroupDescription").innerText="";
//     }
//     if(dontClear == "inviteDisplay"){
//         document.getElementById("inviteDisplay").innerText="";
//         document.getElementById("inviteDescription").innerText="";
//     }
//     if(dontClear == "yourgroupDisplay"){
//         document.getElementById("groupDisplay").innerText="";
//         document.getElementById("yourgroupDescription").innerText="";
//     }
// }

function displayGroup($this){
    var postingTitle = document.getElementById("groupDisplay");
    postingTitle.innerHTML = $this.innerHTML;
    var idPos = $this.id;
    var currGroup = allGroups[idPos];

    var image = currGroup.imageFile;
    var descript = currGroup.description;

    toggleDisplayButtons(currGroup);    
    $("#groupDisplay").append("<img class='groupImg' src='"+image+"'>");
    $("#groupDescription").html('<p class="descript">'+descript+'</p>');
    //$this.style.backgroundColor = "lightgreen";
}

function toggleDisplayButtons(group){
    if(group.isMyGroup){
        document.getElementById("leaveMyGroupButton").style.display = "inline-block";
        document.getElementById("joinGroupButton").style.display = "none";

    }else{
    document.getElementById("joinGroupButton").style.display = "inline-block";
    document.getElementById("leaveMyGroupButton").style.display = "none";
    }   
}

function displayMyGroup($this){
    var postingTitle = document.getElementById("yourgroupDisplay");
    postingTitle.innerHTML = $this.innerHTML;
    var idPos = $this.id;
    var currGroup = allGroups[idPos];

    var image = currGroup.imageFile;
    var descript = currGroup.description;

    document.getElementById("leaveGroupButton").style.display = "inline-block";

    $("#yourgroupDisplay").append("<img class='groupImg' src='"+image+"'>");
    $("#yourgroupDescription").html('<p class="descript">'+descript+'</p>');
    //$this.style.backgroundColor = "lightgreen";
}


function displayInvite($this){
    var postingTitle = document.getElementById("inviteDisplay");
    postingTitle.innerHTML = $this.innerHTML;
    var idPos = $this.id;
    var currGroup = allGroups[idPos];

    var image = currGroup.imageFile;
    var descript = currGroup.description;

    document.getElementById("acceptInvite").style.display = "inline-block";
    document.getElementById("declineInvite").style.display = "inline-block";

    $("#inviteDisplay").append("<img class='groupImg' src='"+image+"'>");
    $("#inviteDescription").html('<p class="descript">'+descript+'</p>');
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
    this.isMyGroup = false;
}







