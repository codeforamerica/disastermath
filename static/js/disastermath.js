(function(document, $){

  // Create a namespace.
  var ns = {};

  ns.init = function(){
    // Initial function. Get request for the SVG element.
    var html = $('html.svg'),
        svgPath = '/static/world_map.svg';

    if (html) {
      // Get request for the SVG file.
      $.get(svgPath, ns.getSVG);
    } else {
      // We're dealing with an older browser, and therefore need to use
      // some sort of static images.
    }
  }

  ns.getSVG = function(data){
    // Create the iframe with a source to our SVG file.
    var iframe = $(document.createElement('iframe')),
        chart = $('#chart'),
        width = Math.floor($('#chart').width()),
        svgPath = '/static/world_map.svg';

    iframe.attr({
      frameborder: 0,
      height: '310px',
      id: 'iframe',
      src: svgPath,
      width: width + 'px'
    });
    chart.html(iframe);
    iframe.load(ns.interactive.highlightOnHover);
  }

  // Namespace for country events and functions.
  ns.country = {};

  ns.country.findName = function(element) {
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
      matchedName = ns.country.selector(className);
    } else if (parentName) {
      matchedName = ns.country.selector(parentName);
    } else if (ancestor) {
      // This only applies to multi-island countries.
      ancestorName = ancestor.className.baseVal;
      matchedName = ns.country.selector(ancestorName);
    }

    // We found the name through its class.
    return matchedName[0];
  }

  ns.country.selector = function(str) {
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
    var name = ns.country.findName(this),
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
    var name = ns.country.findName(this),
        iframe = window._iframe,
        element;
    element = $(iframe[0].getElementById(name));
    element.css('fill', '')
           .find('*').css('fill', '');
  }

  ns.interactive.playButton = function(){
    // Set up play button functionality.
    var button = $('.play');
    button.data('stopped', true);
    button.click(ns.interactive.clickButton);
  }

  ns.interactive.clickButton = function(e){
    // Actual functionality for the play button.
    var button = $(this),
        stopped = button.data('stopped');

    // No need to change the URL.
    e.preventDefault();

    if (!stopped) {
      button.css('background-image', "url('/static/img/play_button.png')")
            .data('stopped', true);
      if (ns._interval) {
        // Clear out the interval that is currently happening.
        clearInterval(ns._interval);
      }
    } else {
      button.css('background-image', "url('/static/img/pause_button.png')")
            .data('stopped', false);
      // Make the interval available to be cleared.
      ns._interval = setInterval(ns.interactive.incrementTimeline, 800);
    }
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

  ns.interactive.incrementTimeline = function(){
    // Function meant to be put into a setInterval call.
    var timeline = $('.timeline'),
        year = timeline.slider('value'),
        max = timeline.slider('option', 'max'),
        button = $('.play'),
        stopped = button.data('stopped');

    // If the timeline is meant to be playing and the current
    // timeline value is less than the maxium year...
    if (!stopped && year < max) {
      var nextYear = year + 1;
      timeline.slider('value', nextYear);
    } else {
      // Then the button should be paused.
      button.click();
    }

    // Let's keep track of the interval calls...
    console.log('ohai interval');
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

  // And make the namespace visible to the outside world.
  window.ns = ns;

})(document, jQuery);
