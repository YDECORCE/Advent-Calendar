var myCal = document.getElementById("adventCal");
var currentDate = new Date();

function shuffle(array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
	}

var myCase=[];
if(!localStorage.getItem('TableCase')) {
		myCase = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];
		shuffle(myCase);
		localStorage.setItem("TableCase", JSON.stringify(myCase));}

else{
    	myCase=JSON.parse(localStorage.getItem('TableCase'))
   }

function Door(calendar, Boite, j) {
	this.jour = j;
	this.width = ((0.9 * calendar.width)/4) * 0.95;
	this.height = ((0.9 * calendar.height)/6) * 0.95;
	this.adventPicture = messages[j-1];
	this.x = ( 0.04 * calendar.width + ((Boite) % 4) * (1.1 * this.width) );
	this.y = -( 0.96 * calendar.height - Math.floor((Boite) / 4) * (1.1 * this.height) );
	
		this.content = function() { 
			// créé une div positionné selon les calculs précédents
			var node = document.createElement("div");
			document.getElementById("adventDoors").appendChild(node);
			node.id = "door" + this.jour;
			node.style.cssText = "width: " + this.width + "px; height: " + this.height + "px; top: " + this.y + "px; left: " + this.x + "px;";
			// Ajoute un lien dans la div précédente
			var innerNodenumber = document.createElement("a");
			document.getElementById("door" + this.jour).appendChild(innerNodenumber);
			innerNodenumber.innerHTML = this.jour;
			innerNodenumber.href = "#";
			// Crée une div display:none avec la photo background dedans; si la case a déjà été ouverte (cookie), le Display passe à Block
			var Nodepicture = document.createElement("div");
			document.getElementById("adventDoors").appendChild(Nodepicture);
			// Mise en forme de la div cachée
			Nodepicture.style.cssText = "width: " + this.width + "px; height: " + this.height + "px; top: " + this.y + "px; left: " + this.x + "px;";
			Nodepicture.style.backgroundImage="url("+this.adventPicture+")";
			Nodepicture.style.borderRadius='0px 10px 10px 0px';
			// Test sur le cookie pour vérifier si la case a déjà été ouverte ou pas
			if(!localStorage.getItem("jour"+j+"")){
					Nodepicture.style.display='none';}
			else{
					Nodepicture.style.display='block';}
			
			
			// Test pour savoir si une case peut être ouverte et comportement du navigateur à l'ouverture (animation porte, delai avant fade-in de l'image, music Oh Oh Oh )
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
						// création du cookie de case ouverte
						localStorage.setItem("jour"+j+"","ok");
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
		doors[i] = new Door(myCal, i , j);
		doors[i].content();
	}

	return doors;
})();