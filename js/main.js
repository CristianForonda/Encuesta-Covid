
$(document).ready(function(){
    $(".side-bar__open a").click(function(e) {
        e.preventDefault(),
        $(".side-bar").addClass("side-bar--open"),
        $(".side-bar__open").addClass("active-btn")
        $(".overlay-content").addClass("overlay-content--open")
    });
    $(".side-bar__close a").click(function(e) {
        e.preventDefault(),
        $(".side-bar").removeClass("side-bar--open"),
        $(".side-bar__open").removeClass("active-btn")
        $(".overlay-content").removeClass("overlay-content--open")
    });
    $(".side-bar__content a").click(function(e) {
        e.preventDefault(),
        $(".side-bar").removeClass("side-bar--open"),
        $(".side-bar__open").removeClass("active-btn")
        $(".overlay-content").removeClass("overlay-content--open")
    });

    

    /*Menú principal estático*/
    var header = $(".header");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 10) {
            header.removeClass('scroll').addClass("header scroll");
        } else {
            header.removeClass("header scroll").addClass('header');
        }
    });

    
    // Cambios para el modo edicion
    $(function() { 
        if (!$("#s4-ribbonrow").is(":visible")) {
            $(".header").addClass("fixed"); 
        } else {
            $("#s4-bodyContainer .main-content").css("padding-top", "0");
        } 
    })  
    
    // Detener videos de las verticales
    $('.modal').on('hidden.bs.modal', function(e) {
        var closestIframe = $(e.currentTarget).find('iframe');
        var rawVideoURL = $("iframe")[0].src;

        closestIframe[0].src = "";
        closestIframe[0].src = rawVideoURL;
    });
});  

