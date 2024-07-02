
//declare the containers so that we can reference them later
var mainWindow = $("main")
var startContainer = $("#startContainer")
var questionContainer = $("#questionContainer")
var processingContainer = $("#processingContainer")
var endContainer = $("#endContainer")

var pokedexContainer = $("#pokedex-entries")
var statsContainer = $("#statsContainer")


//Music Preload
var audBattle = new Audio('./assets/audio/pokemon-battle.mp3')
audBattle.volume = 0.2

var audVictory = new Audio('./assets/audio/pokemon-victory.mp3')
audVictory.volume = 0.2

//the max number of questions to ask the user
var maxQuestions = 12;

var isMuted = false;

function toggleMute() {
    if (isMuted == false) {
        audBattle.pause();
        audVictory.pause();
        //utilize the icon api to change the icon to mute
        $("#iconapi").attr("src", "https://img.icons8.com/material/48/FFFFFF/mute")
        isMuted = true;
    }
    else {
        //if we are in the middle of questions play the battle music
        if ($("#questionContainer").length)
            audBattle.play();
        //if we are in the middle of results play the victory music
        if ($("#endContainer").length)
            audVictory.play();

        //utilize the icon api to change the icon to audio
        $("#iconapi").attr("src", "https://img.icons8.com/material/48/FFFFFF/audio")
        isMuted = false;
    }
};


//Sound Effects preload
var audDamage = new Audio('./assets/sounds/damage.wav')
audDamage.volume = 0.2
var audSuperEffective = new Audio('./assets/sounds/super-effective.mp3')
audSuperEffective.volume = 0.2

//Declare a 'playerInfo' object so that we can track of ALL player information in one place.
var playerInfo = {
    name: "",
    questionNum: 1,
    repeats: [],
    typePoints: {
        normal: 0,
        fire: 0,
        water: 0,
        grass: 0,
        electric: 0,
        ice: 0,
        fighting: 0,
        poison: 0,
        ground: 0,
        flying: 0,
        psychic: 0,
        bug: 0,
        rock: 0,
        ghost: 0,
        dark: 0,
        dragon: 0,
        steel: 0,
        fairy: 0
    }
}

var questions = [
    {
        question: "In front of you is a guy threatening to take your money. What do you do?",
        answers: [{
            answer: "Throw your drink in his face, and take off",
            points: [{ "water": 1, "fairy": 1, "flying": 1, "rock": 1 }]
        },
        {
            answer: "Punch him, and hold him down until the cops come",
            points: [{ "fighting": 2, "rock": 1, "ice": 1, "dark": 1, "dragon": 2 }]
        },
        {
            answer: "Sprint away while crying and whimpering",
            points: [{ "flying": 1, "bug": 1, "fairy": 2, "ghost": 2 }]
        },
        {
            answer: "Talk him out of mugging you, and asking him 'deep' questions about his life",
            points: [{ "grass": 1, "psychic": 2, "fairy": 1, "ground": 1 }]
        }
        ]
    },
    {
        question: "Which country would you rather travel to?",
        answers: [{
            answer: "The Bahamas",
            points: [{ "water": 1, "ground": 1, "fire": 1, "dragon": 1 }]
        },
        {
            answer: "Japan",
            points: [{ "fighting": 1, "rock": 1, "ground": 1, "steel": 1, "dragon": 2 }]
        },
        {
            answer: "New Zealand",
            points: [{ "grass": 2, "ground": 1, "dragon": 2, "rock": 1 }]
        },
        {
            answer: "Mexico",
            points: [{ "fire": 2, "electric": 1, "ghost": 1 }]
        }
        ]
    },
    {
        question: "Which would you rather eat?",
        answers: [{
            answer: "🍦 Ice cream",
            points: [{ "water": 1, "normal": 1, "ice": 1, "electric": 1 }]
        },
        {
            answer: "🍔 Cheeseburger with a side of fries",
            points: [{ "fire": 1, "ground": 1, "steel": 1 , "rock": 1 }]
        },
        {
            answer: "🥗 A really nice salad",
            points: [{ "grass": 2, "ground": 1, "bug": 1 }]
        },
        {
            answer: "🍝 Spaghetti with meatballs",
            points: [{ "psychic": 1, "flying": 1, "fairy": 1}]
        }
        ]
    },
    {
        question: "Who is your favorite marvel superhero?",
        answers: [{
            answer: "Iron Man",
            points: [{ "electric": 2, "steel": 2, "flying": 1, "psychic": 1, "fire": 1 }]
        },
        {
            answer: "Spider-Man",
            points: [{ "bug": 3, "fighting": 1, "flying": 1, "grass": 1 }]
        },
        {
            answer: "Captain America",
            points: [{ "normal": 1, "ground": 1, "fighting": 1, "dragon": 2}]
        },
        {
            answer: "The Hulk",
            points: [{ "fighting": 2, "dragon": 1, "grass": 1, "poison": 2 }]
        }
        ]
    },
    {
        question: "Who is your favorite marvel supervillain?",
        answers: [{
            answer: "Thanos",
            points: [{ "fighting": 1, "dark": 2, "poison": 2 }]
        },
        {
            answer: "Loki",
            points: [{ "psychic": 1, "dark": 2, "poison": 3, "grass": 1 }]
        },
        {
            answer: "Ultron",
            points: [{ "steel": 2, "electric": 2, "psychic": 1 }]
        },
        {
            answer: "Killmonger",
            points: [{ "fighting": 2, "dragon": 1, "dark": 1, "poison": 1 }]
        }
        ]
    },
    {
        question: "Who is your favorite DC superhero?",
        answers: [{
            answer: "Aquaman",
            points: [{ "water": 2, "ground": 1, "psychic": 1, "bug": 1 }]
        },
        {
            answer: "Batman",
            points: [{ "dark": 1, "fighting": 1, "rock": 1 , "poison": 1}]
        },
        {
            answer: "Superman",
            points: [{ "normal": 1, "flying": 1, "fighting": 1, "steel": 1 }]
        },
        {
            answer: "Wonder Woman",
            points: [{ "fairy": 1, "dragon": 1, "fire": 1, "dragon": 2 }]
        }
        ]
    },
    {
        question: "Who is your favorite DC supervillain?",
        answers: [{
            answer: "Mr Freeze",
            points: [{ "ice": 2, "water": 1, "electric": 1 }]
        },
        {
            answer: "Joker",
            points: [{ "dark": 1, "poison": 1, "grass": 1 , "poison": 1}]
        },
        {
            answer: "Lex Luthor",
            points: [{ "normal": 1, "steel": 1, "psychic": 1, "rock": 1 }]
        },
        {
            answer: "Bane",
            points: [{ "fighting": 1, "psychic": 1, "fire": 1, "poison": 1 }]
        }
        ]
    },
    {
        question: "If you were attending Hogwarts what house would you be sorted into?",
        answers: [{
            answer: "Gryffindor - Bravery, daring, nerve, chivalry",
            points: [{ "fire": 1, "dragon": 1, "flying": 1, "rock": 1 }]
        },
        {
            answer: "Hufflepuff - Hard work, dedication, patience, loyalty, fair play",
            points: [{ "ground": 1, "fairy": 2, "grass": 1, "bug": 1 }]
        },
        {
            answer: "Ravenclaw - Intelligence, knowledge, curiosity, creativity, wit",
            points: [{ "flying": 1, "steel": 1, "psychic": 1, "normal": 1 }]
        },
        {
            answer: "Slytherin - Ambition, self-preservation, cunning, resourcefulness",
            points: [{ "water": 1, "fighting": 1, "dark": 2, "poison": 2, "electric": 1, "ghost": 2 }]
        }
        ]
    },
    {
        question: "What's your biggest goal in life?",
        answers: [{
            answer: "Making loads of cash! 🤑",
            points: [{ "steel": 1, "ice": 1, "poison": 1, "ghost": 1, "dragon": 1 }]
        },
        {
            answer: "Starting a family 👪",
            points: [{ "normal": 1, "fairy": 2, "flying": 1, "bug": 1, "grass": 1 }]
        },
        {
            answer: "Finding my true love 💖",
            points: [{ "fairy": 3, "flying": 1, "bug": 2, "normal": 1 }]
        },
        {
            answer: "Leading a fulfilling life 🥇",
            points: [{ "fighting": 1, "dragon": 1, "ground": 1, "psychic": 1 }]
        }
        ]
    },
    {
        question: "What's your favorite sleeping position?",
        answers: [{
            answer: "I sleep on my back",
            points: [{ "poison": 1, "ice": 1, "ghost": 1, "rock": 1, "steel": 1 }]
        },
        {
            answer: "I sleep on my side",
            points: [{ "normal": 1, "fighting": 1, "flying": 1, "bug": 1, "grass": 1 }]
        },
        {
            answer: "I sleep on my stomach.",
            points: [{ "fairy": 1, "bug": 2, "poison": 1, "ghost": 1 }]
        },
        {
            answer: "Sleep? What's sleep?",
            points: [{ "ghost": 2, "dragon": 1, "poison": 1, "psychic": 1 }]
        }
        ]
    },
    {
        question: "What's your favorite taste?",
        answers: [{
            answer: "Salty / Savory",
            points: [{ "fighting": 1, "steel": 1, "rock": 1, "ground": 1 }]
        },
        {
            answer: "Sour",
            points: [{ "ghost": 1, "grass": 1, "water": 1, "ice": 1 }]
        },
        {
            answer: "Sweet",
            points: [{ "fairy": 1, "bug": 1, "grass": 1, "flying": 1 }]
        },
        {
            answer: "Spicy",
            points: [{ "fire": 1, "dragon": 1, "poison": 1, "steel": 1 }]
        }
        ]
    },
    {
        question: "What is the best kind of pet?",
        answers: [{
            answer: "🐱 Cats, the obvious choice.",
            points: [{ "psychic": 1, "fairy": 1, "dark": 1, "dragon": 1, "ice": 1, "rock": 1 , "steel": 1 }]
        },
        {
            answer: "🐶 Dogs, they are man's best friend!",
            points: [{ "grass": 1, "normal": 1, "ground": 1, "fire": 1, "fighting": 1 }]
        },
        {
            answer: "🐦 Birds, they chirp, duh.",
            points: [{ "flying": 2, "bug": 1, "grass": 1, "fairy": 1 }]
        },
        {
            answer: "🚫 Um, I can barely take care of myself!",
            points: [{ "ghost": 2, "poison": 2, "ice": 1, "dark": 1 }]
        }
        ]
    },
    {
        question: "How do you get along with people?",
        answers: [{
            answer: "Man, most people suck!",
            points: [{ "dark": 1, "ghost": 1, "dragon": 1, "ice": 1, "rock": 1 }]
        },
        {
            answer: "I love everyone!",
            points: [{ "grass": 1, "fairy": 2, "ground": 1, "fire": 1 }]
        },
        {
            answer: "I get along with most people just fine!",
            points: [{ "normal": 2, "ground": 1, "psychic": 2 }]
        },
        {
            answer: "I hate everyone and everything.",
            points: [{ "poison": 2, "ghost": 2, "ice": 1, "rock": 1 }]
        }
        ]
    },
    {
        question: "How would you describe your work-ethic?",
        answers: [{
            answer: "Eh! I do the work that I am given.",
            points: [{ "ice": 1, "water": 1, "ground": 1 }]
        },
        {
            answer: "I am a workaholic.",
            points: [{ "steel": 1, "psychic": 1, "rock": 1, "fire": 1 }]
        },
        {
            answer: "So uh, I procrastinate until I start to panic.",
            points: [{ "bug": 1, "flying": 1, "normal": 1 }]
        },
        {
            answer: "Work? Gross! I am ALLERGIC to work.",
            points: [{ "poison": 2, "ghost": 2, "ice": 1, "rock": 1 }]
        }
        ]
    },
    {
        question: "Which of these emoji best describes you?",
        answers: [{
            answer: "😀",
            points: [{ "normal": 1, "ground": 1, "fairy": 1 }]
        },
        {
            answer: "😭",
            points: [{ "water": 1, "psychic": 1, "bug": 1 }]
        },
        {
            answer: "😡",
            points: [{ "fire": 2, "dragon": 1, "poison": 1, "dark": 1 }]
        },
        {
            answer: "🤡",
            points: [{ "electric": 2, "grass": 2, "ghost": 1 }]
        }
        ]
    },
    {
        question: "You are building a house. What materials do you grab first?",
        answers: [{
            answer: "Bricks",
            points: [{ "rock": 2, "ground": 1, "fairy": 1 }]
        },
        {
            answer: "Wood",
            points: [{ "grass": 2, "psychic": 1, "bug": 1 }]
        },
        {
            answer: "Stucco / Clay",
            points: [{ "fire": 1, "water": 1, "ground": 1}]
        },
        {
            answer: "Metal",
            points: [{ "electric": 1, "dark": 1, "steel": 1, "rock": 1 }]
        }
        ]
    },
    {
        question: "What kind of career path sounds good to you?",
        answers: [{
            answer: "Corporate life in a big city.",
            points: [{ "electric": 1, "steel": 1, "dark": 1, "fire": 1 }]
        },
        {
            answer: "Having a simple mediocre job that just gets me by.",
            points: [{ "normal": 2, "psychic": 1, "bug": 1, "water": 1 }]
        },
        {
            answer: "Living off the grid using my own garden and land.",
            points: [{ "fairy": 1, "grass": 1, "bug": 1, "water": 1, "electric": -1 }]
        },
        {
            answer: "Career? Yikes!! No thanks.",
            points: [{ "dragon": 1, "dark": 1, "ghost": 1, "poison": 2}]
        }
        ]
    },
    {
        question: "When it comes to temperature, I like it _____.",
        answers: [{
            answer: "🌞 Hot as the sun. Gotta get my tan on somehow.",
            points: [{ "fire": 2, "ground": 1, "dragon": 1, "fighting": 1, "ice": -1}]
        },
        {
            answer: "🌅 Warm and cozy.",
            points: [{ "normal": 1, "fire": 1, "bug": 1, "fairy": 1 }]
        },
        {
            answer: "🍃 Cool and breezy lemon squeezy.",
            points: [{ "water": 1, "grass": 1, "ice": 1, "water": 1 }]
        },
        {
            answer: "⛄ So cold that there's ice in my veins.",
            points: [{ "ice": 2, "water": 1, "ghost": 1, "dark": 1, "fire": -1}]
        }
        ]
    },
    {
        question: "Where would you go on a vacation?",
        answers: [
            {
                answer: "🗻 Mountains",
                points: [{ "rock": 1, "ground": 1, "ghost": 1, "dragon": 1, "ice": 1 }]
            },
            {
                answer: "🏐 The Beach",
                points: [{ "water": 1, "fairy": 1, "ground": 1 }]
            },
            {
                answer: "🏙 New York City",
                points: [{ "electric": 1, "steel": 1, "dark": 1 }]
            },
            {
                answer: "🌆 Chicago",
                points: [{ "flying": 1, "ice": 1,  "water": 1,  "normal": 1 }]
            }
        ]
    },
    {
        question: "Where would you choose to live?",
        answers: [
            {
                answer: "🗻In the Mountains",
                points: [{ "rock": 1, "ground": 1, "ghost": 1, "ice": 1, "dragon": 1 }]
            },
            {
                answer: "🌴 On a tropical island",
                points: [{ "water": 1, "grass": 1, "ground": 1, "bug": 1, "flying": 1, "fire": 1 }]
            },
            {
                answer: "🏙 In a Big City",
                points: [{ "electric": 1, "steel": 1, "fairy": 1, "dark": 1, "poison": 1 }]
            },
            {
                answer: "🌻 The countryside",
                points: [{ "grass": 1, "ground": 1, "fire": 1 }]
            }
        ]
    },
    {
        question: "What is your preferred choice of travel?",
        answers: [
            {
                answer: "🚅 By Train, I like the scenery",
                points: [{ "electric": 1, "fire": 1, "ground": 1 }]
            },
            {
                answer: "🛫 Airplane, its the quickest",
                points: [{ "flying": 1, "ice": 1, "dragon": 1, "bug": 1 , "ground": -1}]
            },
            {
                answer: "🚶‍♂️ I kind of just like Walking.",
                points: [{ "ground": 1, "normal": 1, "fighting": 1, "grass": 1, "flying": -1 }]
            },
            {
                answer: "🚤 By Boat, the smell of the sea calms me.",
                points: [{ "water": 2, "ice": 1, "psychic": 1 }]
            }
        ]
    },
    {
        question: "You make a mistake that makes someone upset... You _____?",
        answers: [
            {
                answer: "Apologize profusely.",
                points: [{ "bug": 1, "fairy": 1, "ground": 1, "fighting": -1 }]
            },
            {
                answer: "Make it up to them by getting them something nice",
                points: [{ "grass": 1, "water": 1, "fairy": 1, "normal": 1 }]
            },
            {
                answer: "Don't care. They can just deal with it.",
                points: [{ "ice": 1, "dark": 2, "poison": 1, "steel": 1 }]
            },
            {
                answer: "Pretend someone else did it.",
                points: [{ "bug": 1, "dark": 1, "ghost": 1, "poison": 2 }]
            }
        ]
    },
    {
        question: "The zombie apocalypse becomes reality. You ____?",
        answers: [
            {
                answer: "Die almost immediately.",
                points: [{ "bug": 1, "fairy": 1, "ghost": 2, "fighting": -1 }]
            },
            {
                answer: "Find shelter somewhere safe and try to wait it out.",
                points: [{ "normal": 1, "water": 1, "grass": 1, "ground": 1, "electric": 1 }]
            },
            {
                answer: "Lead and start a community of zombie fighting civilians",
                points: [{ "fire": 1, "dragon": 1, "steel": 1, "ice": 1, "fighting": 1 }]
            },
            {
                answer: "Live in the forest, far away from it all.",
                points: [{ "grass": 2, "bug": 1, "flying": 1 }]
            }
        ]
    },
    {
        question: "In a crowd, would you rather ______?",
        answers: [
            {
                answer: "Blend in and not draw any attention to myself.",
                points: [{ "bug": 1, "ice": 1, "ghost": 1, "dark": 1 }]
            },
            {
                answer: "Make as many friends as possible",
                points: [{ "fairy": 1, "water": 1, "grass": 1, "psychic": 1 }]
            },
            {
                answer: "Be the center of attention.",
                points: [{ "fire": 1, "dragon": 1, "poison": 1, "electric": 1, "flying": 1 }]
            },
            {
                answer: "Try to stand out, but not do anything too crazy.",
                points: [{ "electric": 1, "steel": 1, "flying": 1, "psychic": 1 }]
            }
        ]
    },
    {
        question: "My friends describe me as...",
        answers: [
            {
                answer: "Friendly and outgoing!",
                points: [{ "fire": 1, "grass": 1, "water": 1, "electric": 1 }]
            },
            {
                answer: "Shy and soft-spoken.",
                points: [{ "fairy": 1, "bug": 1, "grass": 1, "psychic": 1 }]
            },
            {
                answer: "Funny and entertaining.",
                points: [{ "grass": 1, "rock": 1, "fairy": 1, "flying": 1, "fire": 1 }]
            },
            {
                answer: "Friends? What's that? 😢",
                points: [{ "water": 1, "fairy": 1, "bug": 1, "rock": 1, "ground": 1 }]
            }
        ]
    },
    {
        question: "Which fantasy theme most appeals to you?",
        answers: [
            {
                answer: "🏰 Medieval times with wizards, kings, and castles.",
                points: [{ "dragon": 2, "grass": 1, "rock": 1, "fairy": 1, "flying": 1 }]
            },
            {
                answer: "🚂 Steampunk with retrofuturistic steam powered machinery.",
                points: [{ "fire": 1, "steel": 1, "ground": 1, "fighting": 1 }]
            },
            {
                answer: "🤖 Futuristic with flying cars, robots, and lasers.",
                points: [{ "electric": 2, "psychic": 1, "steel": 1 }]
            },
            {
                answer: "❌ I don't want to live in a fantasy world.",
                points: [{ "normal": 2, "fairy": 1, "dark": 1 }]
            }
        ]
    },
    {
        question: "Which of these fantasy characters most appeals to you?",
        answers: [
            {
                answer: "🧙‍♂️ Mage / Witch / Warlock / Wizard",
                points: [{ "dragon": 1, "water": 1, "dark": 1, "fairy": 1, "ghost": 1 }]
            },
            {
                answer: "🤺 Knight / Fighter / Barbarian / Tank",
                points: [{ "fighting": 1, "rock": 1, "steel": 1 }]
            },
            {
                answer: "🏹 Rogue / Ranger / Thief / Druid",
                points: [{ "dark": 2, "grass": 1, "flying": 1, "poison": 1, "ghost": 1 }]
            },
            {
                answer: "🪕 Bard / Cleric / Paladin / Healer",
                points: [{ "fairy": 1, "psychic": 1, "water": 1 }]
            }
        ]
    },
    {
        question: "Someone makes you very angry, how do you react?",
        answers: [
            {
                answer: "Fight them",
                points: [{ "fighting": 1, "dark": 1, "ghost": 1 }]
            },
            {
                answer: "Try to set them on Fire",
                points: [{ "fire": 2, "dark": 2 }]
            },
            {
                answer: "Run away crying",
                points: [{ "normal": 1, "flying": 1, "bug": 2, "fairy": 1 }]
            },
            {
                answer: "Throw pocket sand into their eyes",
                points: [{ "ground": 2, "fighting": 1, "poison": 1 }]
            }
        ]
    },
    {
        question: "What is your favorite meal?",
        answers: [
            {
                answer: "🍳 Breakfast",
                points: [{ "rock": 1, "dragon": 1, "psychic": 1 , "flying": 1 }]
            },
            {
                answer: "🍞 Brunch",
                points: [{ "normal": 1, "fairy": 1, "bug": 1 }]
            },
            {
                answer: "🥪 Lunch",
                points: [{ "water": 1, "ice": 1, "ground": 1 }]
            },
            {
                answer: "🍗 Dinner",
                points: [{ "fire": 1, "dragon": 1, "dark": 1, "fighting": 1 }]
            }
        ]
    },
    {
        question: "How fast do you get angry?",
        answers: [
            {
                answer: "Eh, I just brush stupid people off",
                points: [{ "water": 1, "normal": 1, "ice": 1, "bug": 1, "fairy": 1 }]
            },
            {
                answer: "Don't start with ME",
                points: [{ "fire": 1, "poison": 1, "ice": 2 }]
            },
            {
                answer: "You look at me wrong, I'm swinging on YOU",
                points: [{ "fighting": 2, "fire": 2, "dark": 2 }]
            },
            {
                answer: "In order to get angry I'd have to care",
                points: [{ "psychic": 1, "normal": 1, "water": 1, "grass": 2 }]
            }
        ]
    },
    {
        question: "What is your dream job?",
        answers: [
            {
                answer: "👷‍♂️ Construction",
                points: [{ "rock": 1, "steel": 1, "ground": 1 }]
            },
            {
                answer: "👨‍💼 Business owner",
                points: [{ "fire": 1, "dragon": 1 }]
            },
            {
                answer: "👩‍⚕️ Doctor",
                points: [{ "psychic": 1, "fairy": 1 , "water": 1 }]
            },
            {
                answer: "👨‍✈️ Pilot",
                points: [{ "flying": 2, "bug": 1 }]
            }
        ]
    },
    {
        question: "What do you look forward to most on a normal day?",
        answers: [
            {
                answer: "💤 Going to sleep",
                points: [{ "normal": 1, "ghost": 2, "psychic": 1, "poison": 1 }]
            },
            {
                answer: "📺 Watching TV",
                points: [{ "water": 1, "electric": 1, "ghost": 1 }]
            },
            {
                answer: "🎮 Playing video games",
                points: [{ "electric": 1, "steel": 1, "poison": 1 }]
            },
            {
                answer: "👥 Hanging out with friends",
                points: [{ "grass": 1, "fairy": 1, "water": 1 }]
            }
        ]
    },
    {
        question: "What is your favorite sport to watch?",
        answers: [
            {
                answer: "🏈 Football",
                points: [{ "fighting": 1, "steel": 1 }]
            },
            {
                answer: "🏊‍♀️ Swimming",
                points: [{ "water": 2, "ice": 1 }]
            },
            {
                answer: "🏀 Basketball",
                points: [{ "normal": 1, "flying": 1 }]
            },
            {
                answer: "⚽ Soccer",
                points: [{ "grass": 2, "ground": 1 }]
            }
        ]
    },
    {
        question: "How would you navigate your way to the other side of a mountain?",
        answers: [
            {
                answer: "Hike up then back down",
                points: [{ "rock": 2, "fighting": 1, "ground": 1 }]
            },
            {
                answer: "Use the lift up then down the other side",
                points: [{ "electric": 1, "ice": 1, "electric": 1 }]
            },
            {
                answer: "Walk around it following the river",
                points: [{ "water": 2, "grass": 1, "bug": 1 }]
            },
            {
                answer: "Sprout wings and soar to your destination",
                points: [{ "flying": 2, "dragon": 1, "bug": 1 }]
            }
        ]
    },
    {
        question: "What is your favorite drink?",
        answers: [
            {
                answer: "Soda",
                points: [{ "normal": 1, "ice": 1, "ground": 1 }]
            },
            {
                answer: "Water",
                points: [{ "water": 2, "ice": 1, "ghost": 1, "psychic": 1 }]
            },
            {
                answer: "Coffee",
                points: [{ "electric": 2, "fire": 1, "grass": 2, "ground": 1 }]
            },
            {
                answer: "Energy drinks",
                points: [{ "rock": 1, "electric": 2 }]
            }
        ]
    },
    {
        question: "How much time do you spend a day watching TV?",
        answers: [
            {
                answer: "None",
                points: [{ "psychic": 1, "steel": 1, "fighting": 1, "normal": 1, "grass": 1 }]
            },
            {
                answer: "1 hour",
                points: [{ "fighting": 1, "ground": 1, "fairy": 1 }]
            },
            {
                answer: "3 hours",
                points: [{ "normal": 1, "water": 1, "electric": 1 }]
            },
            {
                answer: "5 or more hours",
                points: [{ "electric": 1, "ghost": 1, "poison": 1 }]
            }
        ]
    },
    {
        question: "What type of TV do you watch most?",
        answers: [
            {
                answer: "Horror",
                points: [{ "psychic": 1, "ghost": 2, "dark": 2 }]
            },
            {
                answer: "Drama",
                points: [{ "normal": 1, "water": 1, "fairy": 1 }]
            },
            {
                answer: "Anime",
                points: [{ "fighting": 1, "rock": 1, "bug": 1, "ground": 1 }]
            },
            {
                answer: "Comedy",
                points: [{ "fire": 1, "grass": 1, "ground": 1, "poison": 1 }]
            }
        ]
    },
    {
        question: "Favorite snack for a movie?",
        answers: [
            {
                answer: "🍿 Popcorn",
                points: [{ "normal": 1, "bug": 1, "rock": 1 }]
            },
            {
                answer: "🍫 Chocolate",
                points: [{ "psychic": 1, "fairy": 1 }]
            },
            {
                answer: "🥤 Soda",
                points: [{ "electric": 1, "ice": 1, "water": 1 }]
            },
            {
                answer: "🌮 Nachos",
                points: [{ "fire": 1, "rock": 1 }]
            }
        ]
    },
    {
        question: "What is your idea of a good date?",
        answers: [
            {
                answer: "Dinner and a movie",
                points: [{ "normal": 1, "water": 1, "ice": 1 }]
            },
            {
                answer: "Picnic",
                points: [{ "ground": 1, "grass": 1, "flying": 1, "bug": 1 }]
            },
            {
                answer: "Flying to another country",
                points: [{ "flying": 1, "bug": 1 , "dragon": 1 }]
            },
            {
                answer: "Go cruising",
                points: [{ "electric": 1, "water": 1, "fairy": 1 }]
            }
        ]
    },
    {
        question: "Pick a color.",
        answers: [
            {
                answer: "Blue",
                points: [{ "water": 1, "ice": 1 , "flying": 1 }]
            },
            {
                answer: "Red",
                points: [{ "fire": 1, "fighting": 1, "dragon": 1 }]
            },
            {
                answer: "Green",
                points: [{ "electric": 1, "grass": 2, "poison": 1 }]
            },
            {
                answer: "Purple",
                points: [{ "fire": 1, "psychic": 1, "ghost": 1, "dark": 1, "poison": 1 }]
            }
        ]
    },
    {
        question: "If you could start over, which field of study would you work in?",
        answers: [
            {
                answer: "Simple Labor",
                points: [{ "fighting": 1, "rock": 1, "ghost": 1 }]
            },
            {
                answer: "Computer Science",
                points: [{ "steel": 1, "ghost": 1, "electric": 1 }]
            },
            {
                answer: "Law",
                points: [{ "dark": 1, "ghost": 1, "steel": 1 }]
            },
            {
                answer: "Healthcare",
                points: [{ "fire": 1, "fairy": 2, "psychic": 1 }]
            }
        ]
    },
    {
        question: "Your personality is?",
        answers: [
            {
                answer: "Calm and Collected",
                points: [{ "normal": 1, "ice": 1, "steel": 1, "dragon": 1 }]
            },
            {
                answer: "Anxious",
                points: [{ "psychic": 1, "fairy": 1, "bug": 1 }]
            },
            {
                answer: "Outgoing",
                points: [{ "electric": 1, "fire": 1, "fairy": 1 }]
            },
            {
                answer: "Aloft",
                points: [{ "flying": 1, "dragon": 1, "grass": 1, "water": 1 }]
            }
        ]
    },
    {
        question: "Favorite family member?",
        answers: [
            {
                answer: "Mother",
                points: [{ "normal": 1, "fairy": 1, "water": 1, "ice": 1 }]
            },
            {
                answer: "Father",
                points: [{ "psychic": 1, "fighting": 1, "dark": 1 }]
            },
            {
                answer: "Brother/Sister",
                points: [{ "electric": 1, "water": 1, "grass": 1, "fire": 1 }]
            },
            {
                answer: "Grandma/Grandpa",
                points: [{ "fairy": 1, "ghost": 1 }]
            }
        ]
    },
    {
        question: "Favorite kind of pizza?",
        answers: [
            {
                answer: "🧀 Cheese",
                points: [{ "normal": 1, "water": 1 }]
            },
            {
                answer: "🍕 Pepperoni",
                points: [{ "psychic": 1, "electric": 1 }]
            },
            {
                answer: "🥦 Veggie",
                points: [{ "fairy": 1, "grass": 2 }]
            },
            {
                answer: "🍖 Meat-lover",
                points: [{ "fire": 1, "fighting": 1 }]
            }
        ]
    },
    {
        question: "Favorite type of car?",
        answers: [
            {
                answer: "Coupe",
                points: [{ "electric": 1, "flying": 1 }]
            },
            {
                answer: "SUV",
                points: [{ "psychic": 1, "fairy": 1, "rock": 1 }]
            },
            {
                answer: "Sedan",
                points: [{ "normal": 1 }]
            },
            {
                answer: "Soccer mom",
                points: [{ "fire": 1, "fairy": 1, "grass": 1 }]
            }
        ]
    },
    {
        question: "Favorite sport?",
        answers: [
            {
                answer: "🏀 Basketball",
                points: [{ "normal": 1, "flying": 1, "bug": 1 }]
            },
            {
                answer: "🏈 Football",
                points: [{ "steel": 1, "ice": 1 }]
            },
            {
                answer: "🥊 Boxing",
                points: [{ "fighting": 1, "dragon": 1, "rock": 1 }]
            },
            {
                answer: "⚽ Soccer",
                points: [{ "grass": 1, "ground": 1 }]
            }
        ]
    },
    {
        question: "What would be your perfect date would be?",
        answers: [
            {
                answer: "Standing in a parking lot talking and looking bored and complicated.",
                points: [{ "steel": 1, "ice": 2, "ghost": 2 }]
            },
            {
                answer: "A movie and ice cream. Classic.",
                points: [{ "ice": 1, "electric": 1, "psychic": 1 }]
            },
            {
                answer: "Going out on a hike.",
                points: [{ "grass": 2, "bug": 2, "flying": 1, "rock": 1 }]
            },
            {
                answer: "Go out to dinner.",
                points: [{ "fire": 1, "normal": 2, "water": 1 }]
            }
        ]
    },
    {
        question: "What's your favorite school subject?",
        answers: [
            {
                answer: "Math",
                points: [{ "normal": 1, "psychic": 1, "ice": 1 }]
            },
            {
                answer: "Social studies",
                points: [{ "psychic": 1, "steel": 1, "grass": 1, "fairy": 1 }]
            },
            {
                answer: "Science",
                points: [{ "electric": 1, "steel": 1, "bug": 1 }]
            },
            {
                answer: "P.E.",
                points: [{ "fire": 1, "fighting": 1, "rock": 1 }]
            }
        ]
    },
    {
        question: "What do you value most?",
        answers: [
            {
                answer: "Adventure",
                points: [{ "normal": 1, "flying": 1 }]
            },
            {
                answer: "Relaxation",
                points: [{ "psychic": 1, "ice": 1, "normal": 1 }]
            },
            {
                answer: "Knowledge",
                points: [{ "electric": 1, "psychic": 2 }]
            },
            {
                answer: "Power",
                points: [{ "fire": 1, "fighting": 1, "dragon": 2, "dark": 2, "poison": 2 }]
            }
        ]
    },
    {
        question: "What's one thing you can't leave the house without?",
        answers: [
            {
                answer: "Phone",
                points: [{ "electric": 1, "rock": 1, "fairy": 1, "normal": 1 }]
            },
            {
                answer: "Wallet / purse",
                points: [{ "psychic": 1, "poison": 1 }]
            },
            {
                answer: "Glasses",
                points: [{ "electric": 1, "bug": 1, "psychic": 1 }]
            },
            {
                answer: "Headphones",
                points: [{ "electric": 1, "ground": 1, "rock": 1 }]
            }
        ]
    },
    {
        question: "What's your favorite season?",
        answers: [
            {
                answer: "🌻 Spring",
                points: [{ "normal": 1, "grass": 2, "bug": 1, "ground": 1 }]
            },
            {
                answer: "⛄ Winter",
                points: [{ "ice": 2, "water": 1, "dark": 1, "ghost": 1, "steel": 1 }]
            },
            {
                answer: "🌞 Summer",
                points: [{ "fire": 1, "grass": 1, "dragon": 1 }]
            },
            {
                answer: "🍂 Fall",
                points: [{ "flying": 1, "ice": 1, "ground": 1, "ghost": 1 }]
            }
        ]
    },
    {
        question: "Favorite type of music?",
        answers: [
            {
                answer: "Hip hop",
                points: [{ "fighting": 1, "dark": 1 }]
            },
            {
                answer: "Rock",
                points: [{ "rock": 2, "ground": 1, "fighting": 1 }]
            },
            {
                answer: "Country",
                points: [{ "grass": 1, "ice": 1, "ice": 1 }]
            },
            {
                answer: "Pop",
                points: [{ "normal": 1, "fairy": 1 }]
            }
        ]
    }
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
            normal: 0,
            fire: 0,
            water: 0,
            grass: 0,
            electric: 0,
            ice: 0,
            fighting: 0,
            poison: 0,
            ground: 0,
            flying: 0,
            psychic: 0,
            bug: 0,
            rock: 0,
            ghost: 0,
            dark: 0,
            dragon: 0,
            steel: 0,
            fairy: 0
        }
    }


    //set the playerInfo name to what they typed
    playerInfo.name = $("#userName").val();
    localStorage.setItem("Player Name", playerInfo.name);

    //remove the start container
    startContainer.detach();

    //add the question container
    mainWindow.append(questionContainer);

    //reset the progress bar
    $("#question-count").text("Question " + playerInfo.questionNum + " of "+maxQuestions)
    $("#question-progress").attr("value", playerInfo.questionNum - 1)
    $("#question-progress").attr("max", maxQuestions)

    //resets the answers
    $("#answers").fadeTo(0,1).removeClass("disabled");


    //start playing the music if not muted
    audBattle.currentTime = 0.7;
    audBattle.volume = 0.2;
    if (isMuted == false) {
        audBattle.play();
    }


    //run the loadRandomQuestion function
    loadRandomQuestion();
})

var loadedName = localStorage.getItem("Player Name");
$("#userName").val(loadedName);

//When an answer is clicked
questionContainer.on("click", "button", function (e) {
    //get which question we answered
    var num = $("#question").attr("data-num");
    //get which answer we picked
    var ans = this.getAttribute("data-answer");

    //log out which question was clicked and what answer was picked
    console.log("Quesiton " + num + " Answer: " + ans)

    playerInfo.repeats.push(num);;

    //add the points to playerInfo by looping through the answer's points types
    questions[num].answers[ans - 1].points.forEach(element => {
        Object.keys(element).forEach(key => {
            playerInfo.typePoints[key] += element[key];
        })
    });

    //load another random question if we have done less than the max amount of questions
    if (playerInfo.questionNum < maxQuestions) {

        //play the damage noise
        audDamage.currentTime = 0;
        audDamage.play()

        loadRandomQuestion();
        //increment the questionNum
        playerInfo.questionNum++;

        //adjust the progress bar
        $("#question-count").text("Question " + playerInfo.questionNum + " of "+ maxQuestions)
        $("#question-progress").attr("value", playerInfo.questionNum - 1)
        $("#question-progress").attr("max", maxQuestions)
    }
    else //once we've answered the max amount of questions: end the quiz
    {
        //stop the battle music
        audBattle.pause();

        //start play the super-effective sound effect if not muted
        audSuperEffective.currentTime = 0;
        audSuperEffective.volume = 0.2;
        if (isMuted == false) {
            audSuperEffective.play();
        }
        //fill the progress bar
        $("#question-progress").attr("value", playerInfo.questionNum);
        $("#question-progress").attr("max", maxQuestions)

        //fade the answers
        $("#answers").fadeTo(200,0.33).addClass("disabled");

        //wait one second
        setTimeout(function () {
            //start playing the victory music if not muted
            audVictory.currentTime = 0;
            audVictory.volume = 0.2;
            if (isMuted == false) {
                audVictory.play();
            }

            //remove the question container
            questionContainer.detach();

            //run the checkType function (see below)
            checkType();

            //add the processing container
            mainWindow.append(processingContainer);

            //add the end container after 2.5 seconds
            setTimeout(function () {
                processingContainer.detach();
                endContainer.slideToggle( 1000);
            }, 2000);

        }, 2000);

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

    //pull all of the pokemon for that type from the pokemon API
    fetch('https://pokeapi.co/api/v2/type/' + type)
        .then(response => response.json())
        .then(data => {
            //generate a random number from the amount of pokemon returned from the api
            var randomPokemon = getRandomIntInclusive(0, data.pokemon.length)
            //get the pokemon name
            var pokemonName = data.pokemon[randomPokemon].pokemon.name;
            //get the pokemon url
            var pokemonURL = data.pokemon[randomPokemon].pokemon.url;
            //split
            var pokemonURLParts = pokemonURL.split('/')

            //limit to first two generations of pokemon
            while(pokemonURLParts[pokemonURLParts.length-2] > 251) {
                randomPokemon = getRandomIntInclusive(0, data.pokemon.length)
                pokemonName = data.pokemon[randomPokemon].pokemon.name;
                pokemonURL = data.pokemon[randomPokemon].pokemon.url;
                pokemonURLParts = pokemonURL.split('/')
            }

            console.log('pokemon index',pokemonURLParts[pokemonURLParts.length-2])

            //set the pokemon name
            $("#pokemon").text(pokemonName.toUpperCase());

            //get the image by making another API call
            fetch(pokemonURL)
                .then(response => response.json())
                .then(pokemonData => {
                    var pokeImage = pokemonData.sprites.front_default
                    var speciesURL = pokemonData.species.url

                    $("#randompokemonimage").attr("src", pokeImage);

                    //empty the pokedex entries
                    pokedexContainer.empty();

                    //FETCH the species pokedex entries
                    fetch(speciesURL)
                        .then(response => response.json())
                        .then(speciesData => {

                            //create a variable to store pokedex entries to make sure its not the same
                            var pokeDexEntries = []

                            //for each pokedex entry add it to the pokdex
                            speciesData.flavor_text_entries.forEach(entry => {
                                var entryText = entry.flavor_text.replace("\n", " ").replace("\f", " ").trim();
                                //only create a p element if its in english
                                if (entry.language.name == "en" && !pokeDexEntries.includes(entryText) && pokeDexEntries.length < 6) {

                                    //create a new p element
                                    var text = $("<p>").text(entryText)
                                    pokedexContainer.append(text);

                                    //push that entry into the checker array
                                    pokeDexEntries.push(entryText);
                                }
                            })

                            $("#randompokemonimage").attr("src", pokeImage);

                            console.log(pokemonData);
                        });

                });
        });

    //set the type.text on the page
    $("#type").text(type.toUpperCase());

    //set the attn to the player
    $("#attn").text(playerInfo.name.toUpperCase() + " , the results are in...");

    //add one point to the final type to prevent draws
    playerInfo.typePoints[type] += 1;
    maxPoints += 1;

    //empty the stats container to start fresh
    statsContainer.empty();

    //create the progress bars per type
    Object.keys(playerInfo.typePoints).sort(comparePoints).forEach(key => {
        //create the progress bar
        var progressText = $("<p>").text(key.toUpperCase()).addClass("has-text-weight-bold");
        var progressBar = $("<progress>").addClass("progress").addClass(key).attr("value", playerInfo.typePoints[key]).attr("max", maxPoints);
        statsContainer.append(progressText);
        statsContainer.append(progressBar);
    })

}

function RandomizePokemon(data) {

}

//helper function that compares
var comparePoints = function (a, b) {
    if (playerInfo.typePoints[a] < playerInfo.typePoints[b]) {
        return 1;
    }
    if (playerInfo.typePoints[a] > playerInfo.typePoints[b]) {
        return -1;
    }
    // a must be equal to b
    return 0;
}

//set up what happens when the end button is clicked
$("#end").on("click", function (e) {
    //pause the music
    audVictory.pause();
    //remove the end quiz container
    endContainer.hide();
    //add back in the start container
    mainWindow.append(startContainer);
})

//Remove all other containers in the beginning (detach() does not remove assignments whereas remove() does )
questionContainer.detach();
processingContainer.detach();
endContainer.hide();



//AUDIT the pokemon questions
// this checks how many points total are possible amongst all the questions

questions.forEach(question => {
    question.answers.forEach(answer => {

        answer.points.forEach(element => {
            Object.keys(element).forEach(key => {
                playerInfo.typePoints[key] += element[key];
            })
        });

    })

})

console.log(playerInfo.typePoints);