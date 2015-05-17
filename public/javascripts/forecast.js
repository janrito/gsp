define([
  'module',
  'jquery',
  'd3'],
  function (module, $, d3) {
    // 'use strict';



    function draw_forecast_graph(data) {
      //debug
      // console.log(data);

      var $container = $('#forecast .chart_container');

      var color = d3.scale.linear()
        .domain([-10, 0, 20, 30,  35])
        .range(["#4271ae", "#3e999f", "#718c00", "#eab700", "#c82829"]);

      // condition
      $('.condition', $container).html('<i class="wi wi-'+ data.weather_condition + '"></i>');

      // temperature
      $('.temperature', $container).html(data.temperature + '℃')
        .css('color', color(data.temperature));
    }

    $(document).ready(function() {
      // load data form api
      $.get('/api/forecast', function (data) {
        draw_forecast_graph(data);
      });
    });
    return module;
  });
