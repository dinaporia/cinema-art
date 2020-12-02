$(function() {
    // check media screen for sm and larger vp
    mql = window.matchMedia("screen and (min-width: 576px)");
    // Call function to add responsive card formatting for learning page
    addCardShadow(mql); 
    //add event listener to re-run function at window resize
    window.addEventListener("resize", function(){ 
        addCardShadow(mql); 
        });

    // enable tooltips
    $('[data-toggle="tooltip"]').tooltip();
});

// cycle through tabs in learning module top navigation
function getNextTab() {
    $('#units').find('.active').parent().next().children().tab('show');
     };
 function getPreviousTab() {
     $('#units').find('.active').parent().prev().children().tab('show');
 };

 // add shadow styling depending on screen size on learning portal
 function addCardShadow(x) {
    if (x.matches) { 
        // If media query matches, add shadow and border effects on hover
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
        // for xs vp, remove event handlers and restore previous settings
            $(".learn-card").off("mouseenter mouseleave"),
            $(".learn-card").css("background-color", "transparent");     
        }
};