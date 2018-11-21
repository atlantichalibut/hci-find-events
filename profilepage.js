
var allInterests = [];  //global interest array

/*
    Create Interests objects based on given HTML
*/
function createInterests(){
    var inInterests = document.getElementsByClassName("interest");

    for(var i = 0; i < inInterests.length; i++){
        var newTitle = inInterests[i].getElementsByTagName("h2")[0]; //get the h2 (title)
        //var newImg = inInterests[i].getElementsByTagName("img")[0]; //get the img 
        
        var newInterest = new Interest(newTitle.innerHTML, i); //later add pics here
        allInterests.push(newInterest);

        $("#otherIntList").append('<li id="'+i+'"onclick="select(this)"><p>'+newInterest.title+'<p></li>');
            //Add a new list item (with id corresponding to an array of images) and have a sub-p with the title 
    }
}


function select($this) {
	var idPos = $this.id;
	var currInt = allInterests[idPos];

	if(currInt.selected)
	{
		currInt.selected = false;

		var rmInt = document.getElementById(idPos);
		rmInt.parentNode.removeChild(rmInt);

		$("#otherIntList").append('<li id="'+idPos+'"onclick="select(this)"><p>'+currInt.title+'<p></li>');
	}
	else
	{
		currInt.selected = true;

		var rmInt = document.getElementById(idPos);
		rmInt.parentNode.removeChild(rmInt);

		$("#yourIntList").append('<li id="'+idPos+'"onclick="select(this)"><p>'+currInt.title+'<p></li>');
	}
}

function addSelected() {
	for(var i=0; i < allInterests.length(); i++ )
	{
		var currInt = allInterests[i];
		if(currInt.selected)
		{

		}
		else
		{
			var rmInt = document.getElementById(idPos);
			rmInt.parentNode.removeChild(rmInt);

			$("#yourIntList").append('<li id="'+idPos+'"onclick="select(this)"><p>'+currInt.title+'<p></li>');
		}

	}
}

function start() {
	createInterests();
	//hideInterests();
}

function Interest(title, pos) { //pics here too
    this.title = title;
    //this.imageFile = img;
    this.arrPos = pos;
    this.selected = false;
}
