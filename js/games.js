// blur game 

    // create objects to hold images along with movie titles
    let img1 = {url: "../img/caligari.jpg", title:"The Cabinet of Dr Caligari"};
    let img2 = {url: "../img/cinematography.jpg", title: "Vertigo"};
    let img3 = {url: "../img/citizen.jpg", title: "Citizen Kane"};
    let img4 = {url: "../img/editing.jpg", title: "Alien"};
    let img5 = {url: "../img/genre.jpg", title: "Gentlemen Prefer Blondes"};
    let img6 = {url: "../img/narrative.jpg", title: "Memento"};
    let img7 = {url: "../img/mise-en-scene.jpg", title: "The Fifth Element"};
    // store image objects in array
    const blurImgArray = [img1, img2, img3, img4, img5, img6, img7];

    // prepare random image from array to pass to html img element
    const imgElement = document.querySelector("#blurImageContainer");
    const imgIndex = Math.floor((Math.random()*7));
    const image = blurImgArray[imgIndex];
    

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
    $("fieldset").show();
    // score displays on screen
    $("#currentScore").text(score);
    // times starts
    pauseTimer = setInterval(blurTimer, 2000);
}
   
function blurTimer() {
    // as long as the image is blurred, decrease score by 5 and blur by 3 every 3 seconds
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
        // pause timer
        clearInterval(pauseTimer);
        // if input field is empty, continue timer
        if (guess === "") {
            pauseTimer = setInterval(blurTimer, 2000);
            return;
            // if guess matches image title
        } else if (guess === image.title.toLowerCase()) {
            // hide input field
            $("fieldset").hide();
            // set the success modal text to display correct title and score
            $("#movieStill").text(image.title);
            $("#finalScore").text(score);
            // desplay success modal
            $("#successModal").modal();
        } else {
            // if guess is incorrect, clear input field and display failure modal
            $("#blurGuess:text").val("");
            $("#failModal").modal();
            } 
    } 

    // event handler for OK button on success modal
    $("#ok-button").click(function() {
        // remove blur from image, hide guess input, dismiss modal
        imgElement.style.filter = "blur(0px)";
        $("#successModal").modal("hide");
    })

   // event handler for Guess Again button on failure modal
   $("#guess-again").click(function() {
    // continue timer, dismiss modal
    $("#failModal").modal("hide");
    pauseTimer = setInterval(blurTimer, 2000);
    })

    $("#give-up").click(function() {
        $("#failModal").modal("hide");
        location.reload();
        })

