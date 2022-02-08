// Use a CSS framework other than Bootstrap.
// Be deployed to GitHub Pages.
// Be interactive (i.e., accept and respond to user input).
// Use at least two server-side APIs.
// Does not use alerts, confirms, or prompts (use modals).
// Use client-side storage to store persistent data.
// Be responsive.
// Have a polished UI.

//declare the containers so that we can reference them later
var mainWindow = $("main")
var startContainer = $("#startContainer")
var questionContainer = $("#questionContainer")
var endContainer = $("#endContainer")

//Music Preload
var myAudio = document.getElementById("myAudio");
var isPlaying = false;

function togglePlay() {
  isPlaying ? myAudio.pause() : myAudio.play();
};

myAudio.onplaying = function() {
  isPlaying = true;
};
myAudio.onpause = function() {
  isPlaying = false;
};

//Sound Effects preload
var audDamage = new Audio('./assets/sounds/damage.wav')
audDamage.volume = 0.2

//Declare a 'playerInfo' object so that we can track of ALL player information in one place.
var playerInfo = {
    name: "",
    questionNum: 1,
    repeats: [],
    typePoints: {
        water: 0,
        fire: 0,
        fighting: 0,
        grass: 0,
        flying: 0,
        psychic: 0,
        rock: 0,
        ground: 0,
        normal: 0,
        electric: 0
    }
}
console.log("test");

var questions = [
    {
        question: "In front of you is a thug threatening to take your money. What do you do?",
        answers: [{
            answer: "Splash",
            points: [{ "water": 1 }]
        },
        {
            answer: "Punch",
            points: [{ "fighting": 1, "rock": 1 }]
        },
        {
            answer: "Run Away",
            points: [{ "fighting": 1, "rock": 1 }]
        },
        {
            answer: "Solar Beam",
            points: [{ "grass": 1 }]
        }
        ]
    },
    {
        question: "Which country would you rather travel to?",
        answers: [{
            answer: "The Bahamas",
            points: [{ "water": 1, "normal": 1, "fire": 1 }]
        },
        {
            answer: "Japan",
            points: [{ "fighting": 1, "rock": 1, "ground": 1 }]
        },
        {
            answer: "New Zealand",
            points: [{ "grass": 1, "ground": 1 }]
        },
        {
            answer: "Mexico",
            points: [{ "fire": 2 }]
        }
        ]
    },
    {
        question: "Which would you rather eat?",
        answers: [{
            answer: "Ice cream",
            points: [{ "water": 1, "normal": 1}]
        },
        {
            answer: "Cheeseburger",
            points: [{ "fire": 1, "normal": 1, "ground": 1 }]
        },
        {
            answer: "French Fries",
            points: [{ "fire": 1, "ground": 1 }]
        },
        {
            answer: "Spaghetti & Meatballs",
            points: [{ "psychic": 2 }]
        }
        ]
    },
    {
        question: "Where would you go on a vacation?",
        answers: [
            {
                answer: "Mountains",
                points: [{ "rock": 1 }]
            },
            {
                answer: "The beach",
                points: [{ "water": 1 }]
            },
            {
                answer: "New York City",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Chicago",
                points: [{ "Flying": 1 }]
            }
        ]
    },
    {
        question: "Where would you choose to live?",
        answers: [
            {
                answer: "The mountains",
                points: [{ "rock": 1 }]
            },
            {
                answer: "An island",
                points: [{ "water": 1 }]
            },
            {
                answer: "Big City",
                points: [{ "electric": 1 }]
            },
            {
                answer: "The country",
                points: [{ "grass": 1 }]
            }
        ]
    },
    {
        question: "What is your preferred choice of travel?",
        answers: [
            {
                answer: "Train",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Airplane",
                points: [{ "flying": 1 }]
            },
            {
                answer: "Walking",
                points: [{ "ground": 1 }]
            },
            {
                answer: "Boat",
                points: [{ "water": 1 }]
            }
        ]
    },
    {
        question: "Someone makes you very angry, how do you react?",
        answers: [
            {
                answer: "Fight them",
                points: [{ "fighting": 1 }]
            },
            {
                answer: "Try to set them on Fire",
                points: [{ "fire": 1 }]
            },
            {
                answer: "Run away",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Throw sand in their eyes and hit them",
                points: [{ "ground": 1, "fighting": 1 }]
            }
        ]
    },
    {
        question: "What is your favorite meal?",
        answers: [
            {
                answer: "Breakfast",
                points: [{ "rock": 1 }]
            },
            {
                answer: "Brunch",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Lunch",
                points: [{ "water": 1 }]
            },
            {
                answer: "Dinner",
                points: [{ "fire": 1 }]
            }
        ]
    },
    {
        question: "How fast do you get angry?",
        answers: [
            {
                answer: "Eh, I just brush stupid people off",
                points: [{ "Water": 1 }]
            },
            {
                answer: "Don't start with ME",
                points: [{ "normal": 1 }]
            },
            {
                answer: "You look at me wrong, I'm swinging on YOU",
                points: [{ "fighting": 1 }]
            },
            {
                answer: "In order to get angry I'd have to care",
                points: [{ "psychic": 1 }]
            }
        ]
    },
    {
        question: "What is your dream job?",
        answers: [
            {
                answer: "Construction",
                points: [{ "rock": 1 }]
            },
            {
                answer: "Business owner",
                points: [{ "fire": 1 }]
            },
            {
                answer: "Doctor",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "Pilot",
                points: [{ "Flying": 1 }]
            }
        ]
    },
    {
        question: "What do you look forward to most on a normal day?",
        answers: [
            {
                answer: "Going to sleep",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Watching TV",
                points: [{ "water": 1 }]
            },
            {
                answer: "Playing video games",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Hanging out with friends",
                points: [{ "grass": 1 }]
            }
        ]
    },
    {
        question: "What is your favorite sport to watch?",
        answers: [
            {
                answer: "Football",
                points: [{ "fighting": 1 }]
            },
            {
                answer: "Swimming",
                points: [{ "water": 1 }]
            },
            {
                answer: "Basketball",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Soccer",
                points: [{ "grass": 1 }]
            }
        ]
    },
    {
        question: "How would you navigate your way to the other side of a mountain?",
        answers: [
            {
                answer: "Hike up then back down",
                points: [{ "rock": 1 }]
            },
            {
                answer: "Use the lift up then down the other side",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Walk around it following the river",
                points: [{ "water": 1 }]
            },
            {
                answer: "Sprout wings and soar to your destination",
                points: [{ "Flying": 1 }]
            }
        ]
    },
    {
        question: "What is your favorite drink?",
        answers: [
            {
                answer: "Soda",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Water",
                points: [{ "water": 1 }]
            },
            {
                answer: "Coffee",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Energy drinks",
                points: [{ "rock": 1 }]
            }
        ]
    },
    {
        question: "How much time do you spend a day watching TV?",
        answers: [
            {
                answer: "None",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "1 hour",
                points: [{ "fighting": 1 }]
            },
            {
                answer: "3 hours",
                points: [{ "normal": 1 }]
            },
            {
                answer: "5 or more hours",
                points: [{ "electric": 1 }]
            }
        ]
    },
    {
        question: "What type of TV do you watch most?",
        answers: [
            {
                answer: "Horror",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "Drama",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Anime",
                points: [{ "fighting": 1 }]
            },
            {
                answer: "Comedy",
                points: [{ "fire": 1 }]
            }
        ]
    },
    {
        question: "Favorite snack for a movie?",
        answers: [
            {
                answer: "Popcorn",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Chocolate",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "Soda",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Nachos",
                points: [{ "fire": 1 }]
            }
        ]
    },
    {
        question: "What is your idea of a good date?",
        answers: [
            {
                answer: "Dinner and a movie",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Picnic",
                points: [{ "ground": 1, "grass": 1 }]
            },
            {
                answer: "Flying to another country",
                points: [{ "flying": 1 }]
            },
            {
                answer: "Go cruising",
                points: [{ "electric": 1 }]
            }
        ]
    },
    {
        question: "Pick a color?",
        answers: [
            {
                answer: "Blue",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Red",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "Green",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Purple",
                points: [{ "fire": 1 }]
            }
        ]
    },
 {
        question: "If you could start over, which profession would you choose?",
        answers: [
            {
                answer: "Psychologist",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Developer",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "Lawyer",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Doctor",
                points: [{ "fire": 1 }]
            }
        ]
    },
 {
        question: "Your personality is?",
        answers: [
            {
                answer: "Calm and Collected",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Anxious",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "Outgoing",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Aloft",
                points: [{ "fire": 1 }]
            }
        ]
    },
 {
        question: "Favorite family member?",
        answers: [
            {
                answer: "Mother",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Father",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "Brother/Sister",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Grandma/Grandpa",
                points: [{ "fire": 1 }]
            }
        ]
    },
 {
        question: "Favorite kind of pizza?",
        answers: [
            {
                answer: "Cheese",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Pepperoni",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "Veggie",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Meat-lover",
                points: [{ "fire": 1 }]
            }
        ]
    },
 {
        question: "Favorite type of car?",
        answers: [
            {
                answer: "Coupe",
                points: [{ "normal": 1 }]
            },
            {
                answer: "SUV",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "Sedan",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Soccer mom",
                points: [{ "fire": 1 }]
            }
        ]
    },
 {
        question: "Favorite sport?",
        answers: [
            {
                answer: "Basketball",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Football",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "Boxing",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Soccer",
                points: [{ "fire": 1 }]
            }
        ]
    },
 {
        question: "What would be your perfect date would be?",
        answers: [
            {
                answer: "Standing in a parking lot talking and looking bored and complicated.",
                points: [{ "normal": 1 }]
            },
            {
                answer: "A movie and ice cream. Classic.",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "Going out on a hike.",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Go out to dinner.",
                points: [{ "fire": 1 }]
            }
        ]
    },
 {
        question: "What's your favorite school subject?",
        answers: [
            {
                answer: "Math",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Social studies",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "Science",
                points: [{ "electric": 1 }]
            },
            {
                answer: "P.E.",
                points: [{ "fire": 1 }]
            }
        ]
    },
 {
        question: "What do you value most?",
        answers: [
            {
                answer: "Adventure",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Relaxation",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "Knowledge",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Power",
                points: [{ "fire": 1 }]
            }
        ]
    },
 {
        question: "What's one thing you can't leave the house without?",
        answers: [
            {
                answer: "Phone",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Wallet/purse",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "Glasses",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Headphones",
                points: [{ "fire": 1 }]
            }
        ]
    },
 {
        question: "What's your favorite season?",
        answers: [
            {
                answer: "Spring",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Winter",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "Summer",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Fall",
                points: [{ "fire": 1 }]
            }
        ]
    },
 {
        question: "Favorite type of music?",
        answers: [
            {
                answer: "Hip hop",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Rock",
                points: [{ "psychic": 1 }]
            },
            {
                answer: "Country",
                points: [{ "electric": 1 }]
            },
            {
                answer: "Pop",
                points: [{ "fire": 1 }]
            }
          ]
       },
]

//function that loads a random question
var loadRandomQuestion = function () {
    //use the helper function to get a number
    var num = getRandomIntInclusive(0, questions.length - 1)
    while (playerInfo.repeats.includes(num.toString())) {
    num = getRandomIntInclusive(0, questions.length - 1)
    }
    //set the question text to the random question
    $("#question").text(questions[num].question)

    //store our question num
    $("#question").attr("data-num", num)

    //Set each answer
    $("#btn-1").text(questions[num].answers[0].answer)
    $("#btn-2").text(questions[num].answers[1].answer)
    $("#btn-3").text(questions[num].answers[2].answer)
    $("#btn-4").text(questions[num].answers[3].answer)
}

//helper function that gets a random integer between two numbers
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

//when the start button is clicked do this stuff
$("#start").on("click", function (e) {

    //prevent form submission
    e.preventDefault();

    //reset the player info
    playerInfo = {
        name: "",
        questionNum: 1,
        repeats: [],
        typePoints: {
            water: 0,
            fire: 0,
            fighting: 0,
            grass: 0,
            flying: 0,
            psychic: 0,
            rock: 0,
            ground: 0,
            normal: 0,
            electric: 0
        }
    }

    //set the playerInfo name to what they typed
    console.log($("#userName").val());
    playerInfo.name = $("#userName").val();

    //remove the start container
    startContainer.detach();

    //add the question container
    mainWindow.append(questionContainer);

    //start playing the music
    myAudio.currentTime = 1;
    myAudio.volume = 0.2;
    myAudio.play();

    //run the loadRandomQuestion function
    loadRandomQuestion();
})


//When an answer is clicked
questionContainer.on("click", "button", function (e) {
    //get which question we answered
    var num = $("#question").attr("data-num");
    //get which answer we picked
    var ans = this.getAttribute("data-answer");

    //log out which question was clicked and what answer was picked
    console.log("Quesiton " + num + " Answer: " + ans)

    //play the damage noise
    audDamage.currentTime = 0;
    audDamage.play()

    playerInfo.repeats.push(num);
    console.log(playerInfo.repeats);

    //add the points to playerInfo by looping through the answer's points types
    questions[num].answers[ans - 1].points.forEach(element => {
        Object.keys(element).forEach(key => {
            console.log(key + "+" + element[key]); //print out what element had what amount of points added to it.
            playerInfo.typePoints[key] += element[key];
        })
    });

    //print the type points so we can see what our points are at
    console.log(playerInfo.typePoints);

    //load another random question if we have done less than 10 questions
    if (playerInfo.questionNum < 10) {
        loadRandomQuestion();
        //increment the questionNum
        playerInfo.questionNum++;
    }
    else //once we've answered 10 questions end the quiz
    {
        //stop the music
        myAudio.pause();
        //remove the question container
        questionContainer.detach();
        //add the end container
        mainWindow.append(endContainer);
        //run the checkType function (see below)
        checkType();
    }

});


// function that checks which type has the most points
var checkType = function () {
    //declare the variables and their defaults
    var type = "normal";
    var maxPoints = 0;

    //loop through each type
    Object.keys(playerInfo.typePoints).forEach(key => {
        //compare the type to maxPoints. if its greater than maxPoints set maxPoints to it and set the type.
        if (playerInfo.typePoints[key] > maxPoints) {
            maxPoints = playerInfo.typePoints[key];
            type = key;
        }
    })
    //set the type.text on the page
    $("#type").text(type);
}

//set up what happens when the end button is clicked
$("#end").on("click", function (e) {
    //remove the end quiz container
    endContainer.detach();
    //add back in the start container
    mainWindow.append(startContainer);
})


//Remove all other containers in the beginning (detach does not remove assignments)
questionContainer.detach();
endContainer.detach();