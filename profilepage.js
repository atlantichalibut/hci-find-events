
var allInterests = [];  //global interest array

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

        $("#otherIntList").append('<li id="'+i+'"onclick="select(this)"><img class="interestImg" src="'+newImg.src+'"><p>'+newInterest.title+'</p></li>');
            //Add a new list item (with id corresponding to an array of images) and have a sub-p with the title
    }
}



// This funnction is called whenever an interest in the "otherIntList" is clicked
// Basically toggles the colouring and "selected" value of the interest
//also toggles the colouring of the "ADD" button based if there are still "selected" interests

// $this is the interest we are toggling
function select($this) {
	var idPos = $this.id;
	var currInt = allInterests[idPos];

	if(currInt.selected)
	{
		allInterests[idPos].selected = false;
		document.getElementById(idPos).style.backgroundColor = "#011A27";

		//check if that was the last selected element, if so, discolour the ADD button
		if(Boolean(!anySelected())) {
			document.getElementById("addButton").style.color = "#8e4600";
			document.getElementById("addButton").style.backgroundColor = "#011A27";
			document.getElementById("addButton").style.cursor = "";
		}
	}
	else
	{
		if(Boolean(!currInt.yourInt)) {

			allInterests[idPos].selected = true;

			$("#colorDummy").css('color', "#8e4600");	//colorDummy is used to compare colors

			//check is ADD button already coloured, colour if not
			if($("#addButton").css('color') == $("#colorDummy").css('color'))
			{
				document.getElementById("addButton").style.color = "#F0810F";
				document.getElementById("addButton").style.backgroundColor = "#063852";
				document.getElementById("addButton").style.cursor = "pointer";
			}
			
			document.getElementById(idPos).style.backgroundColor = "#063852";	//colour the interest back to "unselected"
		}
	}
}

function searchInt(listBeingSearched, inputId){ //For the search function
    var input, filter, ol, li, a;
    input = document.getElementById(inputId);
    filter = input.value.toUpperCase();

    ol = document.getElementById(listBeingSearched);
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

function addSelected() {

    for(var i = 0; i < allInterests.length; i++){
        if( Boolean(allInterests[i].selected) ) {

        	var a = allInterests[i];
			var rmInt = document.getElementById(i);
			if( !Boolean(rmInt.yourInt))
			{
				rmInt.parentNode.removeChild(rmInt)

				allInterests[i].selected = false;
				allInterests[i].yourInt = true;

				$("#yourIntList").append('<li id="'+i+'"><img class="interestImg" src="'+a.imageFile+'"><p>'
					+a.title+'<img class="redX" src="intPics/redX.png" onclick="remove('+i+')"</p></li>');
			}
		}
	}
	document.getElementById("addButton").style.color = "#8e4600";
	document.getElementById("addButton").style.backgroundColor = "#011A27";
	document.getElementById("addButton").style.cursor = "";
}


//removes an interest from the  "yourIntList" when the redX is clicked
function remove(rmId) {
	var temp = allInterests[rmId];

	var rmInt = document.getElementById(rmId);
	rmInt.parentNode.removeChild(rmInt);
	allInterests[rmId].yourInt = false;
	allInterests[rmId].selected = false;

	$("#otherIntList").append('<li id="'+rmId+'" onclick="select(this)"><img class="interestImg" src="'+allInterests[rmId].imageFile+'"><p>'+allInterests[rmId].title+'</p></li>');

	document.getElementById(rmId).style.backgroundColor = "#011A27";
}


//returns a boolean, checks if any interests are currently selectedt to be added.
function anySelected() {
	var returnBool = false;

	for(var i=0; i < allInterests.length; i++) {

		if( Boolean(allInterests[i].selected) )
		{
			returnBool = true;
		}
	}
	return returnBool;
}


//starts the document
function start() {
	createInterests();
}


//constructor for an interest
function Interest(title, pos, img) {
    this.title = title;
    this.imageFile = img;
    this.arrPos = pos;
    this.selected = false;
    this.yourInt = false;
}
