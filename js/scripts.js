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

    // check for unit paramaters on loading the learning modules
    const redirectUrl = window.location.href;
    let hashIndex = redirectUrl.indexOf('#');
    // if url contains fragment
    if (hashIndex != -1) {
        // get id from url
        let unitHash = redirectUrl.slice(hashIndex);
        // if fragment contains id 
        if (unitHash.length > 1) {
            // activate BS tab with that id
            let tabHash = unitHash +  "-tab";
            $(tabHash).tab('show');
            
        }
    };



});

// cycle through tabs in learning module top navigation
function getNextTab() {
    $('.units').find('.active').parent().next().children().tab('show');
    $(document).scrollTop(0);
};

 function getPreviousTab() {
     $('.units').find('.active').parent().prev().children().tab('show');
     $(document).scrollTop(0);
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