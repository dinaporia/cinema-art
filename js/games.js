$("#blur-tab").on("click", blurSetUp);


// blur game 
function blurSetUp () {
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

    // prepare random image from array to pass to img element
    const imgElement = document.querySelector("#blurImageContainer");
    let imgIndex = Math.floor((Math.random()*7));
    let image = blurImgArray[imgIndex];

    // set up initial blur amount
    let blurVal = 40;
    let blurAmount = "blur(" + blurVal + "px)";

    // set initial score and declare timer to be globally usable
    let score = 100;
    let pauseTimer;

    // start game on button click
    $("#startButton").on("click", blurGame);

    // primary game run
    function blurGame() {
        // url of image from array is passed to img element
        imgElement.src = image.url;
        // apply blur to image
        imgElement.style.filter = blurAmount;
        // start button disappears
        $("#startButton").hide();
        // guess fieldset and score appear
        $(".hide").show(); 
        $("#currentScore").text(score);
        // blur timer runs every 2 seconds
        pauseTimer = setInterval(blurTimer, 2000);

        // event listeners
        // guess button runs function to check guess
        $("#guess-btn").on("click", checkBlurGuess);
        // OK button on success modal removes blur
        $("#ok-button").click(function() {
            imgElement.style.filter = "blur(0px)";
            $("#successModal").modal("hide");
        })
        // Guess Again button on failure modal continues timer
        $("#guess-again").click(function() {
            $("#failModal").modal("hide");
            pauseTimer = setInterval(blurTimer, 2000);
        })
        // Give up button on failure modal resets game
        $("#give-up").click(function() {
            $("#failModal").modal("hide");
            resetGame();
            })
        // if user navigates to different tab during gameplay, reset game
        $("#jeopardy-tab").on("click", resetGame);
        $("#timeline-tab").on("click", resetGame);
    }
    // decrease blur by 2px and score by 5 points until blur is 0
    function blurTimer() {
        if (blurVal > 0) {
            blurVal -= 2;
            score -= 5;
            blurAmount = "blur(" + blurVal + "px)";
            imgElement.style.filter = blurAmount;
            // update score display
            $("#currentScore").text(score);
        } else {
            // once the blur is cleared, stop timer and inform user
            clearInterval(pauseTimer);
            $("#blurGuess:text").val("");
            alert("You ran out of time!");
        }
    }
        
    // check if guess is correct
        function checkBlurGuess() {
            // store lowercase input in variable, clear displayed input, pause timer
            const guess = $("#blurGuess:text").val().toLowerCase();
            $("#blurGuess:text").val("");
            clearInterval(pauseTimer);
            // if input field is empty, do nothing, continue timer
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
};

// jeopardy game 
/* when prompt comes up, send table jeopardy-main to z-index -1; 
*/