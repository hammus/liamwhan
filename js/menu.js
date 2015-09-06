/**
 * Created by Liam on 16/05/2015.
 */
$(function() {

    //Animate our responsive menu

    $(".collapse-trigger").click(function() {
        var $target = $($(this).data("collapse-target"));

        $target.slideToggle( 'slow' );
    });

    //Scroll animation

        $('a[href*=#]').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
                && location.hostname == this.hostname) {
                var $target = $(this.hash);
                $target = $target.length && $target
                || $('[name=' + this.hash.slice(1) +']');
                if ($target.length) {
                    var targetOffset = $target.offset().top;
                    $('html,body')
                        .animate({scrollTop: targetOffset}, 1000);
                    return false;
                }
            }
        });

});