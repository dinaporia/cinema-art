

$(function() {jeopardySetUp()});


/*    XXXXXX   JEOPARDY GAME  XXXXXX      */
function jeopardySetUp() {
   // class for individual cells
    class GameCell {
        constructor(question, category, points, correctAnswer, wrongAnswer1, wrongAnswer2) {
            this.element = null;
            this.category = category;
            this.points = points;
            this.question = question;
            this.answers = [
                {answer: correctAnswer, correct: true},
                {answer: wrongAnswer1, correct: false},
                {answer: wrongAnswer2, correct: false}
                ];
        }
        markAnswered() {
            $(this.element).addClass("answered");
            console.log("element" + this.element);
            answeredCells++;
        }
    };

    // all questions and answers are stored in GameCell objects
    // Industry QandA
    const industry10 = new GameCell("This Hollywood Studio System practice required theaters to buy B movies along with every A movie they bought.", "Industry", 10, "block booking", "distribution", "star system");
    const industry20 = new GameCell("These two studios were the first to develop synchronized sound technologies", "Industry", 20, "Warner Bros & Fox", "Paramount & United Artists", "MGM & RKO");
    const industry30 = new GameCell("Also known as the Hays Code, this set of rules banning excessive sex, violence, and immorality in American cinema was self-enforced for much of Hollywood's golden age.", "Industry", 30, "Production Code", "Code of Conduct", "Ratings Code");
    const industry40 = new GameCell("This independent 1968 film is often credited with bringing about the end of the MPPC and establishing the zombie genre as we know it.", "Industry", 40, "Night of the Living Dead", "Flesh", "Targets");
    const industry50 = new GameCell("This German production company was initially formed in 1917 in order to produce national propaganda.", "Industry", 50, "UFA", "Tobis", "Wien-Film");
    const industryArray = [industry10, industry20, industry30, industry40, industry50];
    // Style QandA
    const style10 = new GameCell("This type of editing is designed to be unnoticeable and is the most common style of editing used today.", "Style", 10, "continuity editing", "studio editing", "disjunctive editing");
    const style20 = new GameCell("In a three point lighting set up, this is the primary light that illuminates the subject.", "Style", 20, "key light", "fill light", "spotlight");
    const style30 = new GameCell("This term refers to the space within a shot that is in focus.", "Style", 30, "depth of field", "mise-en-scene", "zoom");
    const style40 = new GameCell("This kind of sound contradicts the image.", "Style", 40, "contrapuntal sound", "diegetic sound", "mickey-mousing");
    const style50 = new GameCell("This Soviet theory suggests that juxtaposing two shots by editing them together creates a new meaning not visible in either shot alone.", "Style", 50, "Kuleshov effect", "vertical integration", "expressionism");
    const styleArray = [style10, style20, style30, style40, style50];
    // People QandA
    const people10 = new GameCell("A magician turned filmmaker, this man’s films were known for their fantastical content and optical illusions.", "People", 10, "Georges Méliès", "Étienne-Jules Marey", "Jean Renoir");
    const people20 = new GameCell("Often credited with inventing the motion picture, this man applied for a patent for the Kinetograph in 1891.", "People", 20, "Thomas Edison", "Edwin S. Porter", "Auguste Lumière");
    const people30 = new GameCell("An important filmmaker and theoretician of the Soviet Montage movement, he directed Strike (1924) and Battleship Potemkin (1925).", "People", 30, "Sergei Eisenstein", "Vsevolod Pudovkin", "Dziga Vertov");
    const people40 = new GameCell("This early feminist filmmaker's most notable work, Meshes of the Afternoon, was inspired by the surrealist movement.", "People", 40, "Maya Deren", "Simone de Beauvoir", "Katherine Dunham");
    const people50 = new GameCell("This filmmaker was especially famous for his work in Pop Art and investment in the “camp” sensibility.", "People", 50, "Andy Warhol", "Stan Brakhage", "Kenneth Anger");
    const peopleArray = [people10, people20, people30, people40, people50];
    // Tech QandA
    const tech10 = new GameCell("Invented by Edison and Dickson in 1893, this was one of the earliest commercial ways of viewing films.", "Tech", 10, "kinetoscope", "stroboscope", "mutoscope");
    const tech20 = new GameCell("This early device produces the illusion of motion from a rapid succession of static pictures viewed through slits in a cylindrical enclosure.", "Tech", 20, "zoetrope", "magic lantern", "chromatrope");
    const tech30 = new GameCell("This small, hand-cranked camera invented by the Lumière Brothers could also be used as a printer and projector.", "Tech", 30, "cinematograph", "photographic revolver", "rotoscope");
    const tech40 = new GameCell("This rotating building with a movable roof was the first movie studio used by Edison from 1893.", "Tech", 40, "the Black Maria", "the Dark Mary", "the Camera Obscura");
    const tech50 = new GameCell("Invented in 1895, this innovation enabled longer films to pass quickly through the camera without ripping.", "Tech", 50, "Latham Loop", "Vitaphone", "Reynold's Praxinoscope");
    techArray = [tech10, tech20, tech30, tech40, tech50];
    // Early Days QandA
    const earlyDays10 = new GameCell("The first commercial film projection was staged by the Lumière brothers in Paris on this date.", "EarlyDays", 10, "Dec. 28th, 1895", "Dec. 25th, 1888", "Dec. 27, 1892");
    const earlyDays20 = new GameCell("This 1902 Méliès film helped show cinema as a tool of narrative by editing together several scenes.", "EarlyDays", 20, "A Trip to the Moon", "The Teddy Bears", "Serpentine Dancer");
    const earlyDays30 = new GameCell("This film is generally considered to be the first \n'talkie\n'.", "EarlyDays", 30, "The Jazz Singer", "Don Juan", "Singing in the Rain");
    const earlyDays40 = new GameCell("This 1920s art movement featured evil main characters, chiaroscuro lighting, and a focus on subjective storytelling, characterized by stylized depictions of madness, obsession, and paranoia.", "EarlyDays", 40, "German Expressionism", "French New Wave", "Soviet Montage");
    const earlyDays50 = new GameCell("Eastman and Kodak first created rolls of paper film for recording images in this year.", "EarlyDays", 50, "1888", "1864", "1895");
    const earlyDaysArray = [earlyDays10, earlyDays20, earlyDays30, earlyDays40, earlyDays50];
   
    let score = 0;
    let answeredCells = 0;
    // reset game if user navigates to different tab
    $("#timeline-tab").on("click", playAgain);

    //start game    
    playGame();
    
    function playGame() {
        
        // assign objects to data cells
        $(".jeopardy-main td").each(function() {
            // determine point value by parent row's data-points
            let cellParent = this.parentElement;
            let pointValue = +cellParent.getAttribute("data-points")
            let gameObject;
            // determine category based on column in table
            switch(this) {
                case cellParent.children[0]:
                    gameObject = industryArray.filter(item => item.points === pointValue)[0];
                    break;
                case cellParent.children[1]:
                    gameObject = styleArray.filter(item => item.points === pointValue)[0];
                 
                    break;
                case cellParent.children[2]:
                    gameObject = peopleArray.filter(item => item.points === pointValue)[0];
                 
                    break;
                case cellParent.children[3]:
                    gameObject = techArray.filter(item => item.points === pointValue)[0];
                    break;                    
                case cellParent.children[4]:
                    gameObject = earlyDaysArray.filter(item => item.points === pointValue)[0];
                    break; 
                default:
                    return;
            
            }
            gameObject.element = this;
            
            // if game is being reset
            // clear out answered class from each td element
            if ($(this).hasClass("answered")) {
                $(this).removeClass("answered");
            }
            // remove any remaining click handlers
            $(this).off("click");

             // clicking cell fires popQuestion, passing current GameCell object
             $(this).one("click", () => popQuestion(gameObject));

        });
      
        
        // runs when cell element is clicked, takes GameCell object
        function popQuestion(gameObject) {
            let answers = gameObject.answers.slice();
            // randomize answers array before passing values to buttons
            answers.sort(() => Math.random() - 0.5);
            const [ leftAnswer, middleAnswer, rightAnswer ] = answers;
            // pass answer and question text to be displayed
            $("#leftBtn").attr("value", leftAnswer.answer);
            $("#middleBtn").attr("value", middleAnswer.answer);
            $("#rightBtn").attr("value", rightAnswer.answer);
            $("#questionPara").text(gameObject.question);
            $("#correctAnswer").text(gameObject.answers.filter(answer => answer.correct)[0].answer);
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
        function checkAnswer({points}, correct) {
            // remove existing event handlers on buttons
            $("#leftBtn").off("click");
            $("#middleBtn").off("click");
            $("#rightBtn").off("click");
            // hide question, show answer
            $("#answer").removeClass("hide-z");
            $("#question").addClass("hide-z");
            // display points gained depending on correctness of answer
            if (correct) {
                score += points;
                $("#gain").text(`gain ${points} points!`)
            } else {
                score -= points;
                $("#gain").text(`lose ${points} points.`)
            }
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
        answeredCells = 0;

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