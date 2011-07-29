/*
*
* World Map JavaScript for disastermath.
*
*/

var data = {};

var path = d3.geo.path();

var svg = d3.select('#chart').append('svg:svg');

var countries = svg.append('svg:g').attr('id', 'countries');

d3.json('/static/js/world_countries.js', function(json){
  console.log(json);
  countries.selectAll('g')
           .data(json.features)
           .enter().append('svg:path')
           .attr('d', path);
});
