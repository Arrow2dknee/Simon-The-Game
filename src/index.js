alert(
  "Rules of the game:\n1. Follow the displayed pattern of colors\n2. You lose the game if you miss the pattern\nEnjoy! See how far you can get!"
);
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStatus = false;
const delay = 500; // 500 milliseconds delay

const replaySounds = function() {
  let i = 0;
  gamePattern.forEach(function(color, index) {
    setTimeout(function() {
      animateButton(color);
      playSound(color);
    }, i * delay);
    ++i;
  });
};

const nextSequence = function() {
  ++level;
  $(".header h1").text("Level " + level);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  replaySounds();
};

const animateButton = function(color) {
  $("#" + color)
    .delay(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
};

const animatePress = function(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
};

function gameOver() {
  let errorSound = new Audio("sounds/wrong.mp3");
  errorSound.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 300);
  $(".header h1").text("GAME OVER! Press Any Key To Restart!");
}

function playSound(color) {
  let sound = new Audio(`sounds/${color}.mp3`);
  // console.log(sound);
  sound.play(); // (uncaught in promise DOMException)
}

const checkAnswer = function(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      console.log("Success!");
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Incorrect!");
    gameOver();
    restartGame();
  }
};

const restartGame = function() {
  level = 0;
  gameStatus = false;
  gamePattern = [];
  userClickedPattern = [];
};

/**
 * Event listener to initialize the game
 */
$(document).on("keydown", function(evt) {
  if (!gameStatus) {
    nextSequence();
    gameStatus = true;
  }
});

$(".tiles").on("click", function(evt) {
  if (gameStatus) {
    const userChosenColor = evt.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1); // this effectively checks if user selects the buttons in the right order
    // according to the order in gamePattern array.
  }
});
