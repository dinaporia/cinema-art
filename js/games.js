// blur game 

    // create objects to hold images along with movie titles
    let img1 = {url: "../img/caligari.jpg", title:"the cabinet of dr caligari", year : "1920"};
    let img2 = {url: "../img/cinematography.jpg", title: "vertigo"};
    let img3 = {url: "../img/citizen.jpg", title: "citizen kane"};
    let img4 = {url: "../img/editing.jpg", title: "alien"};
    let img5 = {url: "../img/genre.jpg", title: "gentlemen prefer blondes"};
    let img6 = {url: "../img/narrative.jpg", title: "memento"};
    let img7 = {url: "../img/mise-en-scene.jpg", title: "the fifth element"};
    // store image objects in array
    const blurImgArray = [img1, img2, img3, img4, img5, img6, img7];

    // pass random image from array to html img element
    const imgElement = document.querySelector("#blurImageContainer");
    const imgIndex = Math.floor((Math.random()*7));
    imgElement.src = blurImgArray[imgIndex].url;

    // apply initial blur to image
    let blurVal = 50;
    let blurAmount = "blur(" + blurVal + "px)";
    imgElement.style.filter = blurAmount;

    let score = 100;
    let pauseTimer;

function blurGame() {
    // set up timer
    pauseTimer = setInterval(blurTimer, 5000);

}
   
   function blurTimer() {
       if (blurVal > 0) {
       blurVal -= 5;
       score -= 10;
       blurAmount = "blur(" + blurVal + "px)";
       imgElement.style.filter = blurAmount;
       $("#currentScore").text(score);
       } else {
           clearInterval(pauseTimer);
           alert("You ran out of time!");
       }
   }
    
    // function runs on button click
    function checkBlurGuess() {
        const guess = $("#blurGuess:text").val().toLowerCase();
        clearInterval(pauseTimer);
        if (guess === "") {
            blurTimer();
            return;
        } else if (guess === blurImgArray[imgIndex].title) {
            console.log("success");
            $("#movieStill").text(blurImgArray[imgIndex].title);
            $("#finalScore").text(score);
            $("#successModal").modal();
        } else {
           $("failModal").modal();
            
            }
            
        
    } 

    $("#ok-button").click(function() {
        imgElement.style.filter = "blur(0px)";
        $("#successModal").modal("hide");
    })

    // add event handlers to each button on modal

