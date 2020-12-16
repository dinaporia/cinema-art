
$("#blur-tab").on("click", blurSetUp);
$(function() {jeopardySetUp()});

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
function jeopardySetUp() {
   // class for individual cells
    class GameCell {
        constructor(category, points, element, qAndA) {
            this.category = category;
            this.points = points;
            this.element = element;
            this.qAndA = qAndA;
        }
        markAnswered() {
            $(this.element).addClass("answered");
            answeredCells++;
        }
    };
    // class for questions and answers
    class QAndA {
        constructor(question, category, difficulty, correctAnswer, wrongAnswer1, wrongAnswer2) {
        this.question = question;
        this.category = category;
        this.difficulty = difficulty;
        this.answers = [
            {answer: correctAnswer, correct: true},
            {answer: wrongAnswer1, correct: false},
            {answer: wrongAnswer2, correct: false}
            ];
        }
    };

    const category = ["Industry", "Style", "People", "Tech", "EarlyDays"];
    let jeopardyArray = [];   // will store all GameCell Objects
    let score = 0;
    let pointValue = 0;
    let cellCategory = "";
    let answeredCells = 0;

    // all questions and answers are stored in QAndA objects
    // Industry QandA
    const industry10 = new QAndA("This Hollywood Studio System practice required theaters to buy B movies along with every A movie they bought.", "Industry", 10, "block booking", "distribution", "star system");
    const industry20 = new QAndA("These two studios were the first to develop synchronized sound technologies", "Industry", 20, "Warner Bros & Fox", "Paramount & United Artists", "MGM & RKO");
    const industry30 = new QAndA("Also known as the Hays Code, this set of rules banning excessive sex, violence, and immorality in American cinema was self-enforced for much of Hollywood's golden age.", "Industry", 30, "Production Code", "Code of Conduct", "Ratings Code");
    const industry40 = new QAndA("This independent 1968 film is often credited with bringing about the end of the MPPC and establishing the zombie genre as we know it.", "Industry", 40, "Night of the Living Dead", "Flesh", "Targets");
    const industry50 = new QAndA("This German production company was initially formed in 1917 in order to produce national propaganda.", "Industry", 50, "UFA", "Tobis", "Wien-Film");
    const industryArray = [industry10, industry20, industry30, industry40, industry50];
    // Style QandA
    const style10 = new QAndA("This type of editing is designed to be unnoticeable and is the most common style of editing used today.", "Style", 10, "continuity editing", "studio editing", "disjunctive editing");
    const style20 = new QAndA("In a three point lighting set up, this is the primary light that illuminates the subject.", "Style", 20, "key light", "fill light", "spotlight");
    const style30 = new QAndA("This term refers to the space within a shot that is in focus.", "Style", 30, "depth of field", "mise-en-scene", "zoom");
    const style40 = new QAndA("This kind of sound contradicts the image.", "Style", 40, "contrapuntal sound", "diegetic sound", "mickey-mousing");
    const style50 = new QAndA("This Soviet theory suggests that juxtaposing two shots by editing them together creates a new meaning not visible in either shot alone.", "Style", 50, "Kuleshov effect", "vertical integration", "expressionism");
    const styleArray = [style10, style20, style30, style40, style50];
    // People QandA
    const people10 = new QAndA("A magician turned filmmaker, this man’s films were known for their fantastical content and optical illusions.", "People", 10, "Georges Méliès", "Étienne-Jules Marey", "Jean Renoir");
    const people20 = new QAndA("Often credited with inventing the motion picture, this man applied for a patent for the Kinetograph in 1891.", "People", 20, "Thomas Edison", "Edwin S. Porter", "Auguste Lumière");
    const people30 = new QAndA("An important filmmaker and theoretician of the Soviet Montage movement, he directed Strike (1924) and Battleship Potemkin (1925).", "People", 30, "Sergei Eisenstein", "Vsevolod Pudovkin", "Dziga Vertov");
    const people40 = new QAndA("This early feminist filmmaker's most notable work, Meshes of the Afternoon, was inspired by the surrealist movement.", "People", 40, "Maya Deren", "Simone de Beauvoir", "Katherine Dunham");
    const people50 = new QAndA("This filmmaker was especially famous for his work in Pop Art and investment in the “camp” sensibility.", "People", 50, "Andy Warhol", "Stan Brakhage", "Kenneth Anger");
    const peopleArray = [people10, people20, people30, people40, people50];
    // Tech QandA
    const tech10 = new QAndA("Invented by Edison and Dickson in 1893, this was one of the earliest commercial ways of viewing films.", "Tech", 10, "kinetoscope", "stroboscope", "mutoscope");
    const tech20 = new QAndA("This early device produces the illusion of motion from a rapid succession of static pictures viewed through slits in a cylindrical enclosure.", "Tech", 20, "zoetrope", "magic lantern", "chromatrope");
    const tech30 = new QAndA("This small, hand-cranked camera invented by the Lumière Brothers could also be used as a printer and projector.", "Tech", 30, "cinematograph", "photographic revolver", "rotoscope");
    const tech40 = new QAndA("This rotating building with a movable roof was the first movie studio used by Edison from 1893.", "Tech", 40, "the Black Maria", "the Dark Mary", "the Camera Obscura");
    const tech50 = new QAndA("Invented in 1895, this innovation enabled longer films to pass quickly through the camera without ripping.", "Tech", 50, "Latham Loop", "Vitaphone", "Reynold's Praxinoscope");
    const techArray = [tech10, tech20, tech30, tech40, tech50];
    // Early Days QandA
    const earlyDays10 = new QAndA("The first commercial film projection was staged by the Lumière brothers in Paris on this date.", "EarlyDays", 10, "Dec. 28th, 1895", "Dec. 25th, 1888", "Dec. 27, 1892");
    const earlyDays20 = new QAndA("This 1902 Méliès film helped show cinema as a tool of narrative by editing together several scenes.", "EarlyDays", 20, "A Trip to the Moon", "The Teddy Bears", "Serpentine Dancer");
    const earlyDays30 = new QAndA("This film is generally considered to be the first \n'talkie\n'.", "EarlyDays", 30, "The Jazz Singer", "Don Juan", "Singing in the Rain");
    const earlyDays40 = new QAndA("This 1920s art movement featured evil main characters, chiaroscuro lighting, and a focus on subjective storytelling, characterized by stylized depictions of madness, obsession, and paranoia.", "EarlyDays", 40, "German Expressionism", "French New Wave", "Soviet Montage");
    const earlyDays50 = new QAndA("Eastman and Kodak first created rolls of paper film for recording images in this year.", "EarlyDays", 50, "1888", "1864", "1895");
    const earlyDaysArray = [earlyDays10, earlyDays20, earlyDays30, earlyDays40, earlyDays50];
    // all QAndA Objects are stored in a categoryArray, grouped in arrays by category
    const categoryArray = [industryArray, styleArray, peopleArray, techArray, earlyDaysArray];
    
    // reset game if user navigates to different tab
    $("#blur-tab").on("click", playAgain);
    $("#timeline-tab").on("click", playAgain);

    //start game    
    playGame();
    
    function playGame() {
        // assign objects to data cells
        $(".jeopardy-main td").each(function() {
            let catIndex;   // keeps category index in categoryArray
            let ptIndex;    // keeps point value index within each category in array
            let cellParent = this.parentElement;
            // if game is being reset, clear out answered class from each td element
            if ($(this).hasClass("answered")) {
                $(this).removeClass("answered");
            }
            // determine points value based on parent row
            switch(cellParent.getAttribute("id")) {
                case "pts-10":
                    pointValue = 10;
                    ptIndex = 0;
                    break;
                case "pts-20":
                    pointValue = 20;
                    ptIndex = 1;
                    break;
                case "pts-30":
                    pointValue = 30;
                    ptIndex = 2;
                    break;
                case "pts-40":
                    pointValue = 40;
                    ptIndex = 3;
                    break;
                case "pts-50":
                    pointValue = 50;
                    ptIndex = 4;
            }
            // set category index based on column
            switch(this) {
                case cellParent.children[0]:
                    catIndex = 0;
                    break;
                case cellParent.children[1]:
                    catIndex = 1;
                    break;
                case cellParent.children[2]:
                    catIndex = 2;
                    break;
                case cellParent.children[3]:
                    catIndex = 3;
                    break;                    
                case cellParent.children[4]:
                    catIndex = 4;
            }
            cellCategory = category[catIndex];
            // retrieve array of items within this category
            let categoryQAndA = categoryArray[catIndex];  
            // retrieve qAndA object that matches point value within this category   
            let currentQAndA = categoryQAndA[ptIndex];  
            // create new gameCell object with above values and add to jeopardyArray  
            let itemIndex = jeopardyArray.push(new GameCell(cellCategory, pointValue, this, currentQAndA));
            // removes any potential click handlers on reset
            $(this).off("click");
            // clicking cell fires popQuestion, passing the current gameCell object
            $(this).one("click", () => popQuestion(jeopardyArray[itemIndex - 1]));
        });
      

        // runs when cell element is clicked, takes GameCell object
        function popQuestion(gameObject) {
            // store correct answer in variable
            let correctAnswer = gameObject.qAndA.answers[0].answer;
            // randomize answers array before passing values to buttons
            gameObject.qAndA.answers.sort(() => Math.random() - 0.5);
            let leftAnswer = gameObject.qAndA.answers[0];
            let middleAnswer = gameObject.qAndA.answers[1];
            let rightAnswer = gameObject.qAndA.answers[2];
            // pass current object's values to be displayed in html
            $("#leftBtn").attr("value", leftAnswer.answer);
            $("#middleBtn").attr("value", middleAnswer.answer);
            $("#rightBtn").attr("value", rightAnswer.answer);
            $("#questionPara").text(gameObject.qAndA.question);
            $("#correctAnswer").text(correctAnswer);
            // hide table, show question
            $(".jeopardy-main").addClass("hide-z");
            $("#question").removeClass("hide-z");
            // visually mute clicked cell to indicate it has been answered
            gameObject.markAnswered();
            // on btn click pass the game object and correct value to checkAnswer
            $("#leftBtn").on("click", () => checkAnswer(gameObject, leftAnswer.correct));
            $("#middleBtn").on("click", () => checkAnswer(gameObject, middleAnswer.correct));
            $("#rightBtn").on("click", () => checkAnswer(gameObject, rightAnswer.correct));
        }

        // takes GameCell object and value of clicked answer's correct property
        function checkAnswer(gameObject, correct) {
            // remove existing event handlers on buttons
            $("#leftBtn").off("click");
            $("#middleBtn").off("click");
            $("#rightBtn").off("click");
            // hide question, show answer
            $("#answer").removeClass("hide-z");
            $("#question").addClass("hide-z");
            // display points gained depending on correctness of answer
            if (correct) {
                score += gameObject.points;
                $("#gain").text(`gain ${gameObject.points} points!`)
            } else {
                score -= gameObject.points;
                $("#gain").text(`lose ${gameObject.points} points.`)
            };
            // check if there are unanswered questions left
            if (answeredCells < 25) {
                // clicking anywhere on answer div returns to table 
                $("#answer").one("click", () => {
                    $(".jeopardy-main").removeClass("hide-z");
                    $("#answer").addClass("hide-z");
                    });
                $("#total").text(`Your total score is ${score}.`);
            } else {
                // if this is the last unanswered question, display play again button
                $("#total").text(`Your final score is ${score}.`);
                $("#playAgainBtn").on("click", playAgain);
                $("#playAgainBtn").removeClass("hide");
            };
        }
    }
        // resets game
        function playAgain() {
            score = 0;
            pointValue = 0;
            cellCategory = "";
            answeredCells = 0;
            jeopardyArray = [];
            // hide inactive divs and buttons
            $("#playAgainBtn").addClass("hide");
            $("#answer").addClass("hide-z");
            $("#question").addClass("hide-z");
            $(".jeopardy-main").removeClass("hide-z");
            // remove any leftover button click listeners
            $("#leftBtn").off("click");
            $("#middleBtn").off("click");
            $("#rightBtn").off("click");
            $("#playAgainBtn").off("click", playAgain);
            // remove potential stored button values
            $("#leftBtn").attr("value","");
            $("#middleBtn").attr("value", "");
            $("#rightBtn").attr("value", "");

            playGame();
        }
    

};