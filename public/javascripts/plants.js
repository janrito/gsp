define([
  'module',
  'jquery',
  'd3'],
  function (module, $, d3) {
    // 'use strict';



    function draw_plants_graph(data) {
      //debug
      // console.log(data);

      var $container = $('#plants .chart_container');

      var color = d3.scale.linear()
        .domain([0, 15, 30])
        .range(["#718c00", "#eab700", "#c82829"]);

      // days
      $('.days', $container).html(data.days + '<small>days</small>')
        .css('color', color(data.days));
    }

    $(document).ready(function() {
      // load data form api
      $.get('/api/plants', function (data) {
        draw_plants_graph(data);
      });
    });
    return module;
  });
