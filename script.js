

(function($){
    $.fn.SunnySlider = function(arg) {

        var i=0;
        var slideamount;
        var animationtype;
        var pause = false;
        var nextslide;
        var  nextslide2;
        var sliderid=$(this).attr('id');
        var slides = $(this).children();
        var self=$(this);
        var imgheight;
        var slidernumber;

        slideamount = slides.length;

        CreateBullets(self);
        CreateSliderImages(self);
        nextslideinitial = setTimeout(run, arg.interval);



        function run() {

            // hiding previous image and showing next
              if (parseInt(slidernumber)>0){
                i=parseInt(slidernumber);
              }
            if(!pause){
              if(arg.slideShow) {
              //  var imgheight=  $(slides[i]).find('img').height();
              //  $('.sunny_slider').height(+imgheight+'px');
              console.log("mt");
                $(slides[i]).fadeOut(1000);
                i++;
                if (i >= slideamount) i = 0;
                $(slides[i]).fadeIn(1000);

                //updating bullets
                var slidebullet=$(self).next('ol').children();
                $(self).next('.control-nav ').find('li').find('a').removeClass('control-active');
                $(slidebullet[i]).find('a').addClass('control-active');
                $(slidebullet).find('a').removeClass('control-active');
                $(slidebullet[i]).find('a').addClass('control-active');

              }
            }

              nextslide = setTimeout(run, arg.interval);
            //  clearTimeout(nextslide2);
        }

        $('ol li').on('click', function(){
            pause=true;
            var self = $(this);
            var tag=self.find('a');
            $('li a').removeClass('control-active');
            tag.addClass('control-active');
            clearTimeout(nextslide);
            $(slides).fadeOut(1000);
            $(slides).eq(tag.attr('data-slide-to')).fadeIn(1000);
            slidernumber=tag.attr('data-slide-to');
            nextslide2 = setTimeout(run, arg.interval);
            pause=false;
        });
        $(this).hover(
      	function(){
      		pause=true;
      	},
      	function(){
      		pause=false;
      	});
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
        function stopCurrentVideo(){
            $('.slider-video:eq('+pos+')').load().removeAttr('controls')
            .siblings('.overlay-content').show().find('.play-button').show();
        }
        $('.play-button').on('click', function () {
            $(this).hide();
            $(this).parent().fadeOut();
            $(this).parent().siblings('.slider-video')[0].play();
        });

        $('.slider-video').on('play', function () {
            $(this).attr('controls', '1');
        });


        function CreateSliderImages(){
          $(".sunny_slider").children('li').each(function() {

          innerdiv = document.createElement("div");
          var imageUrl=$(this).attr('data-src');

          $(innerdiv).css("background", "url(" + imageUrl + ")");
          $(this).append(innerdiv);


          });
        }

        function CreateBullets(self){

          var bulletscontainer= $( "<ol class='control-nav'></ol>" );
          for (let k=0;k<slideamount;k++){
            bullets='  <li><a href="#" class="bullets" data-slide-to="'+k+'">'+k+'</a></li>';
            bulletscontainer.append(bullets);
          }
          $(self).after(bulletscontainer);

          $(self).next('.control-nav ').find('li').first().find('a').addClass('control-active');



        }
    };
})(jQuery);
