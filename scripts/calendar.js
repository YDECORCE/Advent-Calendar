var myCal = document.getElementById("adventCal");
var currentDate = new Date();

function Door(calendar, day, j) {
	this.jour = j;
	this.width = ((calendar.width - 0.1 * calendar.width) / 4) * 0.95;
	this.height = ((calendar.height - 0.1 * calendar.height) / 6) * 0.95;
	this.adventPicture = messages[j-1][0];
	this.x = ( 0.04 * calendar.width + ((day- 1) % 4) * (1.1 * this.width) );
	this.y = - ( 0.96 * calendar.height - Math.floor((day - 1) / 4) * (1.1 * this.height) );
	
	this.content = function() { 
		
		var node = document.createElement("div");
		document.getElementById("adventDoors").appendChild(node);
		node.id = "door" + this.jour;
		node.style.cssText = "width: " + this.width + "px; height: " + this.height + "px; top: " + this.y + "px; left: " + this.x + "px;";
		

		var innerNodenumber = document.createElement("a");
		document.getElementById("door" + this.jour).appendChild(innerNodenumber);
		innerNodenumber.innerHTML = this.jour;
		innerNodenumber.href = "#";

		
				
		var Nodepicture = document.createElement("div");
		document.getElementById("adventDoors").appendChild(Nodepicture);
		Nodepicture.style.cssText = "width: " + this.width + "px; height: " + this.height + "px; top: " + this.y + "px; left: " + this.x + "px;";
		Nodepicture.style.backgroundImage="url("+this.adventPicture+")";
		Nodepicture.style.display='none';
		Nodepicture.style.borderRadius='0px 10px 10px 0px';
		

		if( ( currentDate.getMonth() + 1 ) < 12 || currentDate.getDate() < this.jour ) {
			innerNodenumber.className = "disabled";
			innerNodenumber.onclick = function() {
				return false;
			}
		} else {
				innerNodenumber.onclick = function() {
				window.setTimeout(ShowPicture,500)
				function ShowPicture(){
					Nodepicture.classList="fade-in"
					Nodepicture.style.display='block'
					let audioPlayer = document.createElement("audio");
  					audioPlayer.loop = false;
					audioPlayer.src = "images/VOXMale_Santa claus oh oh oh 4 (ID 2077)_BSB.mp3";
					audioPlayer.type = 'audio/mpeg';
					audioPlayer.autoplay = true;
					audioPlayer.style = "display:none;";

  					document.body.appendChild(audioPlayer);

				}
				return false;
			}
		}	
	};

}

(function() {
	// console.log(myCase)
	var doors = [];
	var j=0;
	for(var i = 0; i < 24; i++) {
		j=myCase[i]
		// console.log(j);
		doors[i] = new Door(myCal, i+1 , j);
		doors[i].content();

	}

	return doors;
})();