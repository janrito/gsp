define([
  'module',
  'jquery',
  'd3'],
  function (module, $, d3) {
    // 'use strict';

    function draw_visitors_graph(data) {
      //debug
      console.log(data);

      var $container = $('#visitors'),
          height = $container.outerHeight(false),
          width = $container.outerWidth(false),
          margin = 10;

      var x_scale = d3.time.scale()
            .domain([new Date(data.visitors[0].time),
                    new Date(data.visitors[data.visitors.length - 1].time)])
            .rangeRound([0, width - margin]);

      var y_scale = d3.scale.linear()
            .domain([0, d3.max(data.visitors, function(d) { return d.visitors; })])
            .range([height - margin, 0]);

      var widget_container = d3.select('#visitors').append('svg')
            .attr('class', 'chart')
            .attr('width', width - margin)
            .attr('height', height - margin);

      var bar = widget_container.selectAll('.chart')
        .data(data.visitors)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { return x_scale(new Date(d.time)); })
          .attr('y', function(d) { return height - (height - margin - y_scale(d.visitors)) })
          .attr('width', 10)
          .attr('height', function(d) { return height - margin - y_scale(d.visitors) });
    }

    $(document).ready(function() {
      // load data form api
      $.get('/api/visitors', function (data) {
        draw_visitors_graph(data);
      });
    });
    return module;
  });
