$(function() {
    function addCardShadow(x) {
        if (x.matches) { // If media query matches
            $(".learn-card").css("background-color", "rgba(0, 0, 0, 0.3)"),
            $(".learn-card").on({
                mouseenter: function(){
                    $(this).css("background-color", "#505050"),
                    $(this).css("box-shadow", "3px 3px 5px #000000"),
                    $(".learn-card:hover .btn").css("box-shadow", "3px 3px 5px #000000");
                    },
                    mouseleave: function(){
                    $(this).css("background-color", "rgba(0, 0, 0, 0.3)"),
                    $(this).css("box-shadow", "none"),
                    $(".learn-card .btn").css("box-shadow", "none");
                    }
                });
            } else {
                $(".learn-card").off("mouseenter mouseleave"),
                $(".learn-card").css("background-color", "transparent");     
            }
    };
    // check media screen 
    mql = window.matchMedia("screen and (min-width: 576px)");
    // Call function to add responsive card formatting
    addCardShadow(mql); 
    //add event listener for window resize
    window.addEventListener("resize", function(){ 
        addCardShadow(mql); 
        });

    
});