var melody = [];
var looktime = 500;
var phase = "LOST";
var pointer = 0;
var highscore = wertHolen();

var iah1 = new Audio('sound/iah1.mp3');
var iah2 = new Audio('sound/iah2.mp3');
var iah3 = new Audio('sound/iah3.mp3');
var iah4 = new Audio('sound/iah4.mp3');

var ElProgress = document.getElementById("progress");
var ElEsel1 = document.getElementById("esel1");
var ElEsel2 = document.getElementById("esel2");
var ElEsel3 = document.getElementById("esel3");
var ElEsel4 = document.getElementById("esel4");
var ElZuhoeren = document.getElementById("zuhoeren");
var ElScore = document.getElementById("score");
var ElHighscore = document.getElementById("highscore")

for (var i = 1; i <= 4; i++) {
	document.getElementById("esel" + i).style.border = "thick solid #FFFFFF";
}

ElHighscore.innerHTML = "<b>Highscore:</b> " + highscore;

function start() {
	if (phase == "LOST") {
		document.getElementById("score").innerHTML = "<b>Score:</b> 0 ";
		ElZuhoeren.style.fontSize = "20px";
		melody = [];
		pointer = 0;
		show();
	}
}

function show() {
	phase = "SHOW";
	melody.push(Math.round(Math.random() * 3 + 1));
	ElZuhoeren.style.color = "#00AA00";
	ElZuhoeren.innerHTML = "ZUHÖREN";
	singesel(0);
}

function singesel(nr) {
	if (melody[nr] == 1) {
		sing1();
	} else if (melody[nr] == 2) {
		sing2();
	} else if (melody[nr] == 3) {
		sing3();
	} else {
		sing4();
	}
	ElProgress.style.width = 80 * (melody.length - nr) / melody.length + "%";
	setTimeout(function() {
		document.getElementById("esel" + melody[nr]).style.border = "thick solid #FFFFFF";
		if (melody.length - 1 > nr) {
			setTimeout(function() {
				singesel(nr + 1);
			}, 1000);
		} else {
			document.getElementById("progress").style.width = "0%";
			ElZuhoeren.style.color = "#AA0000";
			ElZuhoeren.innerHTML = "SINGEN";
			phase = "CLICK";
		}
	}, looktime);
}

function clickesel(nr) {
	if (phase == "CLICK") {
		if (nr == 1) {
			sing1();
		} else if (nr == 2) {
			sing2();
		} else if (nr == 3) {
			sing3();
		} else {
			sing4();
		}
		setTimeout(function() {
			document.getElementById("esel" + nr).style.border = "thick solid #FFFFFF";
		}, 200);
		if (nr == melody[pointer]) {
			if (pointer < melody.length - 1) {
				pointer++;
			} else {
				pointer = 0;
				phase = "UEBERGANG";
				// Set Highscore
				if (melody.length > highscore) {
					highscore = melody.length;
					ElHighscore.innerHTML = "<b>Highscore:</b> " + highscore;
					document.cookie = "highscore=" + melody.length;
				}
				ElScore.innerHTML = "<b>Score:</b> " + melody.length + " ";
				setTimeout(function() {
					show();
				}, 1300);
			}
		} else {
			ElZuhoeren.innerHTML = "Du hast dich verspielt. Versuche es nochmal von vorne.";
			ElZuhoeren.style.fontSize = "30px";
			phase = "LOST";
		}
	}
}

function sing1() {
	ElEsel1.style.border = "thick solid #0000FF";
	iah1.play();
}

function sing2() {
	ElEsel2.style.border = "thick solid #FF0000";
	iah2.play();
}

function sing3() {
	ElEsel3.style.border = "thick solid #00FF00";
	iah3.play();
}

function sing4() {
	ElEsel4.style.border = "thick solid #FFFF00";
	iah4.play();
}



function wertHolen() {
	if (document.cookie.indexOf("highscore=") < 0) {
		document.cookie = "highscore=0";
	}

	var regulExp = new RegExp(/highscore=.*[0-9]/g);
	var text = (document.cookie.match(regulExp) + '');
	var text_array = text.split("=");

	return text_array[1];
}