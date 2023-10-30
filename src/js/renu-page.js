(function($) {
    Drupal.behaviors.renuPageModule = {
        attach: function(context, settings) {
            if (context !== document) {
                return;
            }
            jQuery(".bottom .btn-green").bind('contextmenu', function(event) { 
                // Check for right click 
                if (event.which == 3){
                event.preventDefault();  
                jQuery(this).click(); 
                } 
            }); 
            jQuery(".sub-bottom .btn-green").bind('contextmenu', function(event) { 
                // Check for right click 
                if (event.which == 3){
                event.preventDefault();  
                jQuery(this).click(); 
                } 
            }); 
            jQuery(".last-bottom  .btn-green").bind('contextmenu', function(event) { 
                // Check for right click 
                if (event.which == 3){
                event.preventDefault();  
                jQuery(this).click(); 
                } 
            }); 
            jQuery(document).on('click', '.renu-commit-wrapper', function(e) {
                e.preventDefault();
                jQuery('.ui-button').trigger("click");
            });
            $(document).on('click', '#icon-Whatistheproblem', () => {
                $('html,body').animate({
                        scrollTop: $("#WhatistheProblem").offset().top
                    },
                    'slow');
                return false;
            });

            $(document).on('click', '#icon-Whyisnumobilebetter', () => {
                $('html,body').animate({
                        scrollTop: $("#Whyisnumobilebetter").offset().top
                    },
                    'slow');
                return false;
            });

            $(document).on('click', '#icon-Whatarewedoing', () => {
                $('html,body').animate({
                        scrollTop: $("#Whatarewedoing").offset().top
                    },
                    'slow');
                return false;
            });

            // Added scroll to target links.
            $(document).on('click', '.scroll-to-target', (e) => {
                e.preventDefault();
                var target = $(this).attr("href");

                $('html, body').animate({
                    scrollTop: parseInt($(target).offset().top)
                }, 'slow');
            });

            // From different page with smooth scrolling.
            $(window).on('load', function() {
                var target = window.location.hash;
                if ($(target).length) {
                    $('html, body').animate({
                        scrollTop: parseInt($(target).offset().top) - 50
                    }, 'slow');
                }
            });
        },
    };
})(jQuery);