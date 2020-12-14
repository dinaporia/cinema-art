
$("#blur-tab").on("click", blurSetUp);
$("#jeopardy-tab").on("click", jeopardyGame);

/*    XXXXXX   BLUR GAME  XXXXXX      */
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

/*    XXXXXX   JEOPARDY GAME  XXXXXX      */
// when prompt comes up, send table jeopardy-main to z-index -1
function jeopardyGame() {
    const category = ["Industry", "Style", "People", "Tech", "EarlyDays"];
    const jeopardyArray = [];
    let score = 0;
    let pointValue = 0;
    let cellCategory = "";

    class GameCell {
        constructor(category, points, element, question, correctAnswer) {
            this.category = category;
            this.points = points;
            this.element = element;
            this.question = question;
            this.correctAnswer = correctAnswer;
        }
        // add answered class to element
        markAnswered() {
            $(this.element).addClass("answered");
        }
    };

    function runJeopardy(gameObject) {
        console.log("run jeopardy");
        console.log(gameObject);
        $(".jeopardy-main").addClass("hide-z");
        $("#question").removeClass("hide-z");
        gameObject.markAnswered();
    }

    function checkAnswer(gameObject, answer) {
        if (answer === gameObject.correctAnswer) {
            score += gameObject.points;
            $("#gain").text(`gain ${gameObject.points} points!`)
        
        } else {
            score -= gameObject.points;
            $("#gain").text(`lose ${gameObject.points} points.`)
        }
        $("#correctAnswer").html(`<i>${gameObject.correctAnswer}</i>`);
        $("#total").text(score).
        $("#answer").removeClass("hide");
        $("#question").addClass("hide");
    }
    // create objects for each cell and add to jeopardyArray
    $(".jeopardy-main td").each(function() {
        // determine points value based on parent row
        let cellParent = this.parentElement;
        switch(cellParent.getAttribute("id")) {
            case "pts-10":
                pointValue = 10;
                break;
            case "pts-20":
                pointValue = 20;
                break;
            case "pts-30":
                pointValue = 30;
                break;
            case "pts-40":
                pointValue = 40;
                break;
            case "pts-50":
                pointValue = 50;
        }
        // determine category based on column
        switch(this) {
            case cellParent.children[0]:
                cellCategory = category[0];
                break;
            case cellParent.children[1]:
                cellCategory = category[1];
                break;
            case cellParent.children[2]:
                cellCategory = category[2];
                break;
            case cellParent.children[3]:
                cellCategory = category[3];
                break;                    
            case cellParent.children[4]:
                cellCategory = category[4];
        }
        let itemIndex = jeopardyArray.push(new GameCell(cellCategory, pointValue, this));
        $(this).one("click", () => runJeopardy(jeopardyArray[itemIndex - 1]));
    });

 
console.log(jeopardyArray);




};