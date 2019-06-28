

(function($){
    $.fn.SunnySlider = function(arg) {

        var i=0;
        var slideamount;
        var animationtype;
        var pause = false;
        var nextslide= null;
        var nextslide2= null;
        var sliderid=$(this).attr('id');
        var slides = $(this).children();
        var self=$(this);
        var imgheight;
        var slidernumber=null;

        slideamount = slides.length;

        CreateBullets(self);
        CreateSliderImages(self);
        var nextslideinitial = setTimeout(run, arg.interval);



        function run() {
          clearTimeout(nextslide2);
          if(nextslide ){
              clearTimeout(nextslide);
              nextslide=null;
          }
            clearTimeout(nextslideinitial);
            // hiding previous image and showing next
console.log(slidernumber);
              if (slidernumber !=null){

                i=slidernumber;

              }
            if(!pause){
              if(arg.slideShow) {
                var imgheight=  $(slides[i]).find('img').height();
                $('.sunny_slider').height(+imgheight+'px');

                $(slides[i]).fadeOut(1000);
                i++;
                slidernumber=null;
                if (i >= slideamount) i = 0;
                $(slides[i]).fadeIn(1000);

                //updating bullets
                var slidebullet=$(self).next('ol').children();
                $(self).next('.control-nav ').find('li').find('a').removeClass('control-active');
                $(slidebullet[i]).find('a').addClass('control-active');
                $(slidebullet).find('a').removeClass('control-active');
                $(slidebullet[i]).find('a').addClass('control-active');
                nextslide = setTimeout(run, arg.interval);
              }
            }



        }

        $('ol li').on('click', function(){
            clearTimeout(nextslide);
            slidernumber=null;
            pause=true;
            var self = $(this);
            var tag=self.find('a');
            $('li a').removeClass('control-active');
            tag.addClass('control-active');

            $(slides).fadeOut(1000);
            $(slides).eq(tag.attr('data-slide-to')).fadeIn(1000);
            slidernumber=parseInt(tag.attr('data-slide-to'));

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
            pause=true;

            $(this).attr('controls', '1');
            $(this).mouseenter(
            function(){
              pause=true;
            },
            function(){
              pause=true;
            });
        });


        function CreateSliderImages(){
          $(".sunny_slider").children('li').each(function() {

          if($(this).attr('data-type')=="image"){
              innerdiv = document.createElement("div");
              var imageUrl=$(this).attr('data-src');

              $(innerdiv).css("background", "url(" + imageUrl + ")");
              $(this).append(innerdiv);
          }
          else
          {
            if($(this).attr('data-type')=="video")
          {
             var videoUrl=$(this).attr('data-src');
             var cover=$(this).attr('data-cover');
            var video=document.createElement('video');
            $(video).addClass("slider-video");
            video.setAttribute('poster',cover);
            var sourceMP4 = document.createElement("source");
            sourceMP4.src = videoUrl;
            sourceMP4.type = "video/mp4";
            var sourceogg = document.createElement("source");
            sourceogg.src = videoUrl;
            sourceogg.type = "video/ogg";

            video.appendChild(sourceMP4);
            video.appendChild(sourceogg);

            $(this).append(video);
            var overlay=$( '<div class="overlay-content"><div class="play-button"></div></div>');
            $(this).append(overlay);

          }}

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
