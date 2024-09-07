function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}



function loadingAnimation() {
    var tl = gsap.timeline();

tl.from(".line h1", {
    y: 150,
    delay: 0.5,
    duration: 0.6,
    stagger: 0.25
})
.from("#line1-part1", {
    opacity: 0,
    onStart: function() {
        var h5timer = document.querySelector("#line1-part1 h5");
        var grow = 0;
        setInterval(function() {
            if (grow < 100) {
                h5timer.innerHTML = grow++;
            } else {
                h5timer.innerHTML = grow;
            }
        }, 30);
    }
})
tl.to(".line h2", {
    animationName: "anim",
    opacity: 1
})
tl.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 4,
    onComplete: function() {
        document.getElementById("loader").style.display = "none";
    }
})
tl.from("#page1", {
    y: 1200,
    duration: 1,
    delay: 0.2
});
// tl.set("#page1", { clearProps: "y" });
tl.from("#hero1 h1,#hero2 h1,#hero3 h2 ,#hero3 h3,#hero4 h1",{
    y:140,
    duration:0.9,
    stagger:0.2
});
}

loadingAnimation();

function cursorAnimation() {
    document.addEventListener("mousemove", function(dets){
        gsap.to("#cursor",{
            left: dets.x,
            top: dets.y
        })
    })
    Shery.makeMagnet("#nav-part2 h4", {
        duration: 1,
    });
    var video = document.querySelector("#video-container video")
    var videoContainer = document.querySelector('#video-container')
    var flag = 0
videoContainer.addEventListener('mouseenter',function(){
    videoContainer.addEventListener("mousemove",function(dets){
        var rect = videoContainer.getBoundingClientRect();
        var x = dets.x - rect.left;
        var y = dets.y - rect.top;
        gsap.to('#cursor',{
            opacity: 0
        })
        gsap.to('#video-cursor', {
            left: x,
            top: y,
            duration: 1,
        })
    })
    
});
videoContainer.addEventListener('mouseleave', function(){
    gsap.to("#cursor",{
        opacity:1
    })
    gsap.to("#video-cursor",{
        left: "80%",
        top: "-8%",
        duration: 1,
        delay: 0.1
    })
});
videoContainer.addEventListener("click", function() {
    if (video.paused) {
        video.play();
        video.style.opacity = 1;
        document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-line"></i>`;
    } else {
        video.pause();
        video.style.opacity = 0;
        document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-mini-fill"></i>`;
    }
});
}

function sheryAnimation(){
    Shery.imageEffect(".img-div",{
        style: 5,
        config:{"a":{"value":3.44,"range":[0,30]},"b":{"value":-0.79,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272749932567818},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.3,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.12,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":1.07,"range":[0,10]},"metaball":{"value":0.35,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":14.5,"range":[0,100]}},
        gooey: true
    })
}



cursorAnimation();

locomotiveAnimation();
sheryAnimation()
document.addEventListener("mousemove",function(dets){
    gsap.to("#flag",{
        x: dets.x,
        y: dets.y,
        
    })
})
document.querySelector("#hero3").addEventListener("mouseenter", function(){
    gsap.to("#flag",{
        opacity:1
    })
})
document.querySelector("#hero3").addEventListener("mouseleave", function(){
    gsap.to("#flag",{
        opacity: 0
    })
})
// gsap.from("#footer h1", {
//     opacity:1,
//     onComplete: function() {
//       $('#footer h1').textillate({ in: { effect: 'fadeIn' } });
//     }
//   });

const splitText = new SplitText("#footer h1", {
  type: "chars"
});


gsap.from(splitText.chars, {
  opacity: 0,
  stagger: 0.1, 
  duration: 1 
});
function underlineAnimation(trigger, target) {
    gsap.registerPlugin(ScrollTrigger);
  
    gsap.from(target, {
      scrollTrigger: {
        trigger: trigger, 
        start: "top 90%", 
        end: "bottom 10%", 
        toggleActions: "play none none none" 
      },
      width: 0,
      duration: 1,
      ease: "power2.inOut"
    });
  }
  
 
  underlineAnimation("#page2", "#page3 .underline");
  underlineAnimation("#page4", "#page4 .underline");
  underlineAnimation("#page5", "#page5 .underline");
  underlineAnimation("#page3", "#page3 .underline");
 