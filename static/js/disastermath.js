(function(document, $){

  // Create a namespace.
  var ns = {};

  ns.init = function(){
    // Initial function. Get SVG element.
    var html = $('html.svg'),
        chart = $('#chart'),
        svgPath = '/static/world_map.svg';

    if (html) {
      // Create the iframe with a source to our SVG file. Rather than
      // having an inline SVG element, we're creating an iframe since
      // that works with mobile Safari.
      $.get(svgPath, function(data){
        var iframe = $(document.createElement('iframe')),
            width = Math.floor($('#chart').width());
        iframe.attr({
          frameborder: 0,
          height: '310px',
          id: 'iframe',
          src: svgPath,
          width: width + 'px'
        });
        chart.html(iframe);
        iframe.load(ns.interactive.highlightOnHover);
      });

    } else {
      // We're dealing with an older browser, and therefore need to use
      // some sort of static images.
    }
  }


  function findCountryName(element) {
    // Find a usable country name.
    var idName = element.id,
        className = element.className.baseVal,
        parentName = element.parentElement.className.baseVal,
        ancestor = element.parentElement.parentElement,
        ancestorName;

    // We'll first check the ID name.
    if (idName && idName.length <= 3) {
      // Then we found our culprit.
      return idName;
    }

    // ID name doesn't match, so we'll check the class name.
    if (className) {
      matchedName = countrySelector(className);
    } else if (parentName) {
      matchedName = countrySelector(parentName);
    } else if (ancestor) {
      // This only applies to multi-island countries.
      ancestorName = ancestor.className.baseVal;
      matchedName = countrySelector(ancestorName);
    }

    // We found the name through its class.
    return matchedName[0];
  }

  function countrySelector(str) {
    var re = /\b\w{2,3}\b/;
    return str.match(re);
  }


  // Namespace for interactive events.
  ns.interactive = {};

  ns.interactive.highlightOnHover = function(){
    var iframe = $(this.contentDocument),
        svg = iframe.children('svg');

    // Let's make the iframe easily accessible.
    window._iframe = iframe;
    console.log(svg);

    svg.find('path').toggle(ns.interactive.svgActivate,
                            ns.interactive.svgDeactivate);
  }

  ns.interactive.svgActivate = function(e) {
    // Functionality for the first click on an SVG element.
    var name = findCountryName(this),
        iframe = window._iframe,
        color = '#db7019',
        element;
    console.log(name);
    element = $(iframe[0].getElementById(name));
    element.css('fill', color)
           .find('*').css('fill', color);
  }

  ns.interactive.svgDeactivate = function(e) {
    // Functionality for the second click on an SVG element.
    // This should toggle off the colors.
    var name = findCountryName(this),
        iframe = window._iframe,
        element;
    element = $(iframe[0].getElementById(name));
    element.css('fill', '')
           .find('*').css('fill', '');
  }

  ns.interactive.playButton = function(){
    // Set up play button functionality.
    var button = $('.play');
    button.click(function(e){
      var self = $(this),
          stopped = self.data('stopped');

      e.preventDefault();

      if (stopped) {
        self.css('background-image', "url('/static/img/play_button.png')")
            .data('stopped', false);
      } else {
        self.css('background-image', "url('/static/img/pause_button.png')")
            .data('stopped', true);
      }

    });
  }

  ns.interactive.timeline = function(){
    var timeline = $('.timeline');
    timeline.slider({
      min: 2001,
      max: 2010,
      range: 'max',
      value: 1
    });
  }

  ns.interactive.init = function(){
    // Function to tie together all interactive functions that need
    // to take place once jQuery is loaded.
    var interactive = ns.interactive;

    interactive.playButton();
    interactive.timeline();
  }


  ns.main = function(){
    // Main function -- fires on load (like Python main functions).
    ns.init();
    ns.interactive.init();
  }

  // Call the main function...
  ns.main();

})(document, jQuery);
