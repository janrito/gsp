define([
  'module',
  'jquery',
  'd3'],
  function (module, $, d3) {
    // 'use strict';



    function draw_drinks_graph(data) {
      //debug
      // console.log(data);

      var $container = $('#drinks .chart_container');

      var radius = 50;

      var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius - 20);

      var categories = d3.scale.ordinal()
        .domain(data.map(function(d) { return d.drink_type;}));

      var color = d3.scale.ordinal()
        .domain([true, false])
        .range(["#3e999f", "#c82829"]);

      var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.quantity; });


      var svg = d3.select("#drinks .chart_container").selectAll(".pie")
        .data(data)
      .enter().append("svg")
        .attr("class", "pie")
        .attr("width", radius * 2)
        .attr("height", radius * 2)
      .append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")");

    svg.selectAll(".arc")
        .data(function(d) {
          return pie([{'quantity': d.quantity, 'full': true},
                      {'quantity': 12 - d.quantity, 'full': false}]);
      })
      .enter().append("path")
        .attr("class", "arc")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.full); });

    svg.append("text")
      .attr('class', 'label')
        .attr("dy", "1.7em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.drink_type; });

    svg.append("text")
      .attr('class', 'quantity')
        .attr("dy", "-.35em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.quantity; });

    }

    $(document).ready(function() {
      // load data form api
      $.get('/api/drinks', function (data) {
        draw_drinks_graph(data);
      });
    });
    return module;
  });
