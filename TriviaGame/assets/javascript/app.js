//only show the intro on load
window.onload = function() {
    document.getElementById("intro").hidden = false;
    document.getElementById("question").hidden = true;
    document.getElementById("end").hidden = true;
};

var number = 60;
var count;
var countCorrect = 0;
var countIncorrect = 10;

function decrement() {
    number--;
    $("#seconds").html("<span>" + number + "</span>");

    //stops the timer and goes to results
    if (number === 0) {
        clearInterval(count)
        document.getElementById("question").hidden = true;
        document.getElementById("end").hidden = false;
    };
};

function timer() {
    count = setInterval(decrement, 1000);
};

//once begin button is clicked, changes to questions and begins timer
document.getElementById("startButton").addEventListener("click", function() {
    document.getElementById("intro").hidden = true;
    document.getElementById("question").hidden = false;
    timer();
});


//once submit button is clicked, changes to results
document.getElementById("endButton").addEventListener("click", function() {
    document.getElementById("question").hidden = true;
    document.getElementById("end").hidden = false;
});

//define correct answer as option2
//if correct answer is clicked, add to correct count and minus incorrect count
$(".option2").on("click", function() {
    countCorrect++;
    countIncorrect--;
    $("#correct").html("<span>" + countCorrect + "</span>");
    $("#incorrect").html("<span>" + countIncorrect + "</span>");
})

//could not figure out how to make user choose only one option or change answers