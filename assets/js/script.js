
//Music Preload
var audMusic = new Audio('./assets/audio/Pokemon Red, Yellow, Blue Battle Music- Trainer_360P - Copy.mp4')
audMusic.volume = 0.5

//global point values
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
		"question":"Which country would you rather travel to?",
		"answers":[{
				"answer":"The Bahamas",
				"points":[{"water":1,"normal":1,"fire":1}]
			},
			{
				"answer":"Japan",
				"points":[{"fighting":1,"rock":1,"ground":1}]
			},
			{
				"answer":"New Zealand",
				"points":[{"grass":1,"ground":1}]
			},
			{
				"answer":"Mexico",
				"points":[{"fire":2}]
			}
		]
	},
    {
		"question":"Which country would you rather travel to?",
		"answers":[{
				"answer":"The Bahamas",
				"points":[{"water":1,"normal":1,"fire":1}]
			},
			{
				"answer":"Japan",
				"points":[{"fighting":1,"rock":1,"ground":1}]
			},
			{
				"answer":"New Zealand",
				"points":[{"grass":1,"ground":1}]
			},
			{
				"answer":"Mexico",
				"points":[{"fire":2}]
			}
		]
	}
]


var answerQuestion = function(answerIndex,answersArray) {    
    answersArray[answerIndex].points.forEach(element => {
        console.log(element);
    });
}




// A bunch of tests on pulling data from the array
console.log("QUESTION 1:" + questions[0].question)

answerQuestion(1,questions[0].answers)
answerQuestion(1,questions[1].answers)
