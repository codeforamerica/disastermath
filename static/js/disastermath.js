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
        var iframe = $(document.createElement('iframe'));
        iframe.attr({
          frameborder: 0,
          height: '310px',
          id: 'iframe',
          src: svgPath,
          width: '700px'
        })
        chart.html(iframe);
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
        ancestorName = element.parentElement.parentElement.className.baseVal,
        matchedName;

    // We'll first check the ID name.
    if (idName && idName.length == 2) {
      console.log(idName);
      return '#' + idName;
    }

    // ID name doesn't match, so we'll check the class name.
    if (className) {
      matchedName = countrySelector(className);
    } else if (parentName) {
      matchedName = countrySelector(parentName);
    } else {
      // This might only apply to Greenland.
      matchedName = countrySelector(ancestorName);
    }

    // Since it was a class name, add a period to the front of it.
    return '.' + matchedName[0];
  }

  function countrySelector(str) {
    var re = /\b\w{2,3}\b/;
    return str.match(re);
  }

  ns.main = function(){
    // Main function -- fires on load (like Python main functions).
    ns.init();

    // Now on to highlighting on hover.
    var color = '#db7019',
        iframe = document.getElementById('iframe').contentDocument,
        svg = $(iframe).children('svg');

    svg.find('path').bind({
        mouseover: function(e) {
          var name = findCountryName(this);
          $(name).css('fill', color)
                 .find('*').css('fill', color);
        },
        mouseout: function(e) {
          var name = findCountryName(this);
          $(name).css('fill', '')
                 .find('*').css('fill', '');
        }
    });
  };

  // Call the main function...
  ns.main();

})(document, jQuery);
