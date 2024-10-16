var percents = Array.prototype.slice.call(document.getElementsByTagName("h3"), 0);
for (var i = 0; i < percents.length; i++) {
	if (percents[i].childElementCount < 2) {percents[i] = 0} else {
		percents[i] = parseInt(percents[i].children[1].innerText.slice(1,percents[i].children[1].innerText.length-18));
	}
}


var sections = Array.prototype.slice.call(document.getElementsByClassName("list-group list-group-data"), 0);
for (var i = 0; i < sections.length; i++) {
	if (sections[i].className == "list-group list-group-data") {
		sections[i] = 0;
	} else {
		sections[i] = sections[i].childElementCount;
	}
}

var grades = Array.prototype.slice.call(document.getElementsByClassName("margin-left-10"), 0);
grades = grades.filter(grade => grade.className === "margin-left-10");
var newGrade = [];
for (var i = 0; i < grades.length; i++) {
	newGrade[i] = [0,0];
}
for (var i = 0; i < grades.length; i++) {
	var index = sections[0];
	var j = 0;
	while(i >= index) {
		j++;
		index+=sections[j];
	}
	grades[i] = grades[i].innerText.split("/");
	if (grades[i].length == 1) {
		grades[i] = grades[i][0]/4;
	} else if (grades[i][1] == 0) {
		grades[i] = 0;
	} else{
		grades[i] = grades[i][0]/grades[i][1]
	}
	newGrade[i][0] = ((grades[i]*percents[j])/sections[j]);
	newGrade[i][1] = (percents[j]/sections[j]);
}

grades = Array.prototype.slice.call(document.getElementsByClassName("margin-left-10"), 0);
grades = grades.filter(grade => grade.className === "margin-left-10");
for (var i = 0; i < grades.length; i++) {
	grades[i].innerHTML = grades[i].innerText + " (" + newGrade[i][0].toFixed(2) + "% / " + newGrade[i][1].toFixed(2) + "%)";
}

var total = 0;
var newSections = 0;

percentElements = document.getElementsByTagName("h3")

// This is a loop that shows what the total percent that each section is earning.
for (var i = 0; i < sections.length; i++) { // Goes through every section
	for (var j = 0; j < sections[i]; j++) {
		
		if (sections.length > 1) { // If there is only one section, this breaks the code. This didn't actually fix it unfortunately.
			newSections = sections.slice(0, i) // This makes sure that for section other than the first one, the values are correct.
			newSections = newSections.reduce((accumulator, currentValue) => accumulator + currentValue, 0); // This adds all the values of the slice together.
		} else {
			newSections = 0;
		}
		
		total += newGrade[j + newSections][0] //This repeats through and increases the grade
	}
	
	percentElements[i].innerText += " " + Math.round(total * 100) / 100 + "%/" + percents[i] + "%" // This displays the percent. For some reason it changes the styling. NEEDS TO BE FIXED.
	
	total = 0; // Resets the total back to zero.
}
