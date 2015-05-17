require(['config'], function (config) {

  // Main
  require([
    'jquery',
    'visitors',
    'temperature',
    'forecast',
    'drinks',
    'plants'
    // 'bootstrap/transition',
    // 'bootstrap/collapse',
    // 'bootstrap/tooltip',
    ], function ($) {

      $( document ).ready(function() {

        console.log('hello');

      });
  });

});