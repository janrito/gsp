define([
  'module',
  'jquery',
  'd3'],
  function (module, $, d3) {
    // 'use strict';

    var formatLargeNumbers = d3.format(".3s");

    function draw_visitors_graph(data) {
      // debug
      // console.log(data);

      var $container = $('#visitors .chart_container'),
        height = $container.innerHeight(),
        width = $container.innerWidth(),
        margin = {top: 15, right: 10, bottom: 15, left: 45},
        barwidth = Math.floor((width - margin.right - margin.left)/12) - 2 ;

      // define time scale for x axis
      var x_scale = d3.time.scale()
        .domain([new Date(data.visitors[0].time),
                new Date(data.visitors[data.visitors.length - 1].time)])
        .range([margin.left, width - margin.right - barwidth]);

      // define scale for y axis
      var y_scale = d3.scale.linear()
        .domain([0, d3.max(data.visitors, function(d) { return d.visitors; })])
        .rangeRound([height - margin.top - margin.bottom, margin.top]);

      // x axis
      var xAxis = d3.svg.axis()
        .scale(x_scale)
        .orient('bottom')
        .ticks(d3.time.minutes, 5)
        .tickFormat(d3.time.format('%H:%M'))
        .tickSize(0)
        .tickPadding(8);

      // y axis
      var yAxis = d3.svg.axis()
        .scale(y_scale)
        .orient('left')
        .tickFormat(function(d) { return formatLargeNumbers(d) })
        .tickSize(0)
        .tickPadding(8);

      // svg container for the chart
      var svg = d3.select('#visitors .chart_container').append('svg')
        .attr('class', 'chart')
        .attr('width', width)
        .attr('height', height);

      // bar chart
      var bar = svg.selectAll('.chart')
        .data(data.visitors)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { return x_scale(new Date(d.time)); })
          .attr('y', function(d) {
            return height - margin.top - margin.bottom - (height - margin.top - margin.bottom -  y_scale(d.visitors));
          })
          .attr('width', barwidth)
          .attr('height', function(d) { return height - margin.top - margin.bottom - y_scale(d.visitors);})

      // draw x axis and translate to the bottom
      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate('+ (barwidth/2) + ', ' + (height - margin.top - margin.bottom) + ')')
        .call(xAxis);

      // draw y axis
      svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + margin.left + ', 0)')
        .call(yAxis);

      // draw total
      var title = svg.append("text")
          .attr("class", "title")
          .attr("x", width - margin.right)
          .attr("y", height - margin.bottom - margin.top)
          .attr("dx", "-.1em")
          .attr("dy", "-.1em")
          .text(formatLargeNumbers(data.total));
    }

    $(document).ready(function() {
      // load data form api
      $.get('/api/visitors', function (data) {
        draw_visitors_graph(data);
      });
    });
    return module;
  });
