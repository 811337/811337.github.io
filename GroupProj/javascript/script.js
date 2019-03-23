$(document).ready(function() {
  function animateText(container, el) {
    $(container).each(function() {
      var elIndx = 0;
      var thisContainer = $(this);
      var initialColor = $(this).find(el).css("color");
      var timeline = anime.timeline({loop:true});
      $(thisContainer).find(el).each(function() {
        timeline
          .add({
            targets: $(this).get(0),
            color: ["#ff0", initialColor],
            duration: 100,
            loop: true,
            easing: 'easeInOutSine',
            direction: 'alternate',
            offset: (elIndx==0 ? '' : '-=100')
          })
          .add({
            targets: $(this).get(0),
            color: ["#ff0"],
            duration: 100,
            loop: true,
            easing: 'easeInOutSine',
            direction: 'alternate'
          })
        elIndx++;
      });
    });
  }
  animateText('ul', 'li');
});