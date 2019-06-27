

(function($){
    $.fn.SunnySlider = function(arg) {
        var slides;
        var i;
        var slideamount;
        var animationtype;
        var pause = false;


        var sliderid=$(this).attr('id');
        slides = $(this).children();


        slideamount = slides.length;
        i=0;
        // updating bullets count

      var bulletscontainer= $( "<ol class='control-nav' ></ol>" );
      for (let k=0;k<slideamount;k++){
        bullets='  <li><a href="#" class="bullets" data-slide-to="'+k+'">'+k+'</a></li>';
        bulletscontainer.append(bullets);
      }
      $(this).after(bulletscontainer);

      $(this).next('.control-nav ').find('li').first().find('a').addClass('control-active');

      var slidebullet=$(this).next('ol').children();
      $(this).next('.control-nav ').find('li').find('a').removeClass('control-active');
      $(slidebullet[i]).find('a').addClass('control-active');
      setTimeout(run, arg.interval);


switch ( arg.animation ) {

    case "slide":
        animationtype = "sliderToSlide";
        break;

    case "fadein":
        animationtype = "sliderToFadeIn";
        break;

    case "fadeout":
        animationtype = "sliderToFadeInOut";
        break;
    default:
      animationtype = "sliderToFadeInOut";

}
        function run() {
            // hiding previous image and showing next
            if(!pause ){
              if(arg.slideShow) {
                $(slides[i]).fadeOut(1000);
                i++;
                if (i >= slideamount) i = 0;
                $(slides[i]).fadeIn(1000);

                //updating bullets
                $(slidebullet).find('a').removeClass('control-active');
                $(slidebullet[i]).find('a').addClass('control-active');

                $('ol li').on('click', function(){

                var self = $(this);
                var tag=$(this).find('a');
                $('li a').removeClass('control-active');
                tag.addClass('control-active');
                var img = $('.sunny_slider li img').eq(tag.attr('data-slide-to')).attr('src');

                 $(slides).fadeOut(1000);
                 $(slides).eq(tag.attr('data-slide-to')).fadeIn(1000);
         //$(slides).find('img').attr('src',img);
            });
              }


            }
            setTimeout(run, arg.interval);

        }
        $(this).hover(
      	function(){
      		pause=true;
      	},
      	function(){
      		pause=false;
      	});



    };
})(jQuery);
