(function($){

  // Initial function. Get SVG element.

  var html = $('html.svg'),
      chart = $('#chart'),
      svgPath = '/static/world_map.svg';

  if (html) {
    // Grab the SVG, put it into the chart div.
    $.get(svgPath, function(data){
      var svg = data.getElementsByTagName('svg')[0];
      chart.html(svg);
    });

  } else {
    // We're dealing with an older browser.
  }


  // Now on to highlighting on hover.

  var color = '#db7019';

  $('path').live({
      mouseover: function(e) {
        $(this).css('fill', color);
      },
      mouseout: function(e) {
        $(this).css('fill', '');
      }
  });

})(jQuery);
