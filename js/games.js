// blur game 
    // create objects to hold images along with movie titles
    const img1 = {url: "../img/caligari.jpg", title:"The Cabinet of Dr Caligari"};
    const img2 = {url: "../img/cinematography.jpg", title: "Vertigo"};
    const img3 = {url: "../img/citizen.jpg", title: "Citizen Kane"};
    const img4 = {url: "../img/editing.jpg", title: "Alien"};
    const img5 = {url: "../img/genre.jpg", title: "Gentlemen Prefer Blondes"};
    const img6 = {url: "../img/narrative.jpg", title: "Memento"};
    const img7 = {url: "../img/mise-en-scene.jpg", title: "The Fifth Element"};
    // store image objects in array
    const blurImgArray = [img1, img2, img3, img4, img5, img6, img7];

    // prepare random image from array to pass to html img element
    const imgElement = document.querySelector("#blurImageContainer");
    let imgIndex = Math.floor((Math.random()*7));
    let image = blurImgArray[imgIndex];
    
    // apply initial blur to image
    let blurVal = 40;
    let blurAmount = "blur(" + blurVal + "px)";
    // set initial score and declare timer to be globally reusable
    let score = 100;
    let pauseTimer;

    
// game runs on button click (inline)
function blurGame() {
    // url of image from array is passed to img element
    imgElement.src = image.url;
    // blur is applied
    imgElement.style.filter = blurAmount;
    // start button disappears, answer box appears
    $("#startButton").hide();
    // guess fieldset and score display on screen
    $(".hide").show(); 
    $("#currentScore").text(score);
    // blur timer runs every 2 seconds
    pauseTimer = setInterval(blurTimer, 2000);

    // event listeners
    // guess button in fieldset
    $("#guess-btn").on("click", checkBlurGuess);
    // OK button on success modal
    $("#ok-button").click(function() {
        // remove blur from image, hide guess input, dismiss modal
        imgElement.style.filter = "blur(0px)";
        $("#successModal").modal("hide");
    })
    // Guess Again button on failure modal
    $("#guess-again").click(function() {
        // continue timer, dismiss modal
        $("#failModal").modal("hide");
        pauseTimer = setInterval(blurTimer, 2000);
    })
    // Give up button on failure modal
    $("#give-up").click(function() {
        $("#failModal").modal("hide");
        resetGame();
        })
    // user navigates to different tab during gameplay
    $("#jeopardy-tab").on("click", resetGame);
    $("#timeline-tab").on("click", resetGame);
}
   
function blurTimer() {
    // as long as the image is blurred, decrease score by 5 and blur by 2
    if (blurVal > 0) {
        blurVal -= 2;
        score -= 5;
        blurAmount = "blur(" + blurVal + "px)";
        imgElement.style.filter = blurAmount;
        // update score at every increment
        $("#currentScore").text(score);
    } else {
        // once the blur is cleared, stop timer and inform user
        clearInterval(pauseTimer);
        alert("You ran out of time!");
       }
   }
    
// function runs on guess button click
    function checkBlurGuess() {
        // convert user input to lowercase
        const guess = $("#blurGuess:text").val().toLowerCase();
        $("#blurGuess:text").val("");
        // pause timer
        clearInterval(pauseTimer);
        // if input field is empty, continue timer
        if (guess === "") {
            pauseTimer = setInterval(blurTimer, 2000);
            return;
        // if guess is correct
        } else if (guess === image.title.toLowerCase()) {
            // hide input field
            $("fieldset").hide();
            // set the success modal text to display correct title and score
            $("#movieStill").text(image.title);
            $("#finalScore").text(score);
            // desplay success modal
            $("#successModal").modal();
        } else {
        // if guess is incorrect, display failure modal
            $("#failModal").modal();
            } 
    } 

    // function to quit game if user navigates to different tab
    function resetGame() {
        // stop timer
        clearInterval(pauseTimer);
        // clear image
        imgElement.src = "";
        // clear input field
        $("#blurGuess:text").val("");
        // show start button, hide score and guess fieldset
        $("#startButton").show();
        $(".hide").hide();
        // assign new random image
        imgIndex = Math.floor((Math.random()*7));
        image = blurImgArray[imgIndex];
        // reset score and blur values
        blurVal = 40;
        blurAmount = "blur(" + blurVal + "px)";
        score = 100;
        // remove tab event listeners
        $("#jeopardy-tab").off("click", resetGame);
        $("#timeline-tab").off("click", resetGame);
    }

    


