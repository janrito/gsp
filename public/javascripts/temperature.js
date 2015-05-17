define([
  'module',
  'jquery',
  'd3'],
  function (module, $, d3) {
    // 'use strict';



    function draw_temperature_graph(data) {
      //debug
      // console.log(data);

      var $container = $('#temperature .chart_container'),
        height = $container.innerHeight(),
        width = $container.innerWidth(),
        margin = {top: 10, right: 10, bottom: 10, left: 10};

      var color = d3.scale.linear()
        .domain([12, 16, 20, 25,  32])
        .range(["#4271ae", "#3e999f", "#718c00", "#eab700", "#c82829"]);

      // svg container for the chart
      var svg = d3.select('#temperature .chart_container').append('svg')
        .attr('class', 'chart')
        .attr('width', width)
        .attr('height', height);

      // draw temperature
      var title = svg.append("text")
          .attr("class", "title")
          .attr("x", (width - margin.right - margin.left)/2)
          .attr("y", (height - margin.bottom - margin.top)/2)
          // .attr("dx", "-.5em")
          .attr("dy", ".5em")
          .style('fill', function(d) { return color(data.temperature);})
          .text(data.temperature + '℃');
    }

    $(document).ready(function() {
      // load data form api
      $.get('/api/temperature', function (data) {
        draw_temperature_graph(data);
      });
    });
    return module;
  });
