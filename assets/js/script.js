
var water = 0;
var fire = 0;
var fighting = 0;
var grass = 0;
var flying = 0;

var questions = [
	{
		"question":"In front of you is a thug threatening to take your money. What do you do?",
		"answers":[{
				"answer":"Splash",
				"points":[{"water":1}]
			},
			{
				"answer":"Punch",
				"points":[{"fighting":1,"rock":1}]
			},
			{
				"answer":"Run Away",
				"points":[{"fighting":1,"rock":1}]
			},
			{
				"answer":"Solar Beam",
				"points":[{"grass":1}]
			}
		]
	},
	{
		"question":"In front of you is a thug threatening to take your money. What do you do?",
		"answers":[{
				"answer":"Splash",
				"points":[{"water":1}]
			},
			{
				"answer":"Punch",
				"points":[{"fighting":1,"rock":1}]
			},
			{
				"answer":"Run Away",
				"points":[{"fighting":1,"rock":1}]
			},
			{
				"answer":"Solar Beam",
				"points":[{"grass":1}]
			}
		]
	}
]


var addPoints = function(answerIndex,answersArray) {    
    answersArray[answerIndex].points.forEach(element => {
        console.log(element);
    });
}





console.log("QUESTION 1:" + questions[0].question)

addPoints(1,questions[0].answers)

addPoints(1,questions[1].answers)
