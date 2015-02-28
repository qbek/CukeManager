define(['modules/GherkinRender'], function () {
  'user strict';
  var GherkinRender = require('modules/GherkinRender');

  function _toggleDetails ($render) {
    var $details = $('section', $render);

    if ($details.hasClass('display-none')) {
      $details.removeClass('display-none');
    } else {
      $details.addClass('display-none');
    }
  }

  function _renderSingleStat(value, $element) {
    if (value > 0) {
      $element.removeClass('display-none');
      $element.html(value);
    } else {
      $element.addClass('display-none');
    }
  }

  function _renderStats (stats, $render) {
    var $status_pass = $('[data="feat-stat-pass"]', $render);
    var $status_fail = $('[data="feat-stat-fail"]', $render);
    var $status_norun = $('[data="feat-stat-norun"]', $render);
    var $status_undef = $('[data="feat-stat-undef"]', $render);

    _renderSingleStat(stats.pass, $status_pass);
    _renderSingleStat(stats.fail, $status_fail);
    _renderSingleStat(stats.norun, $status_norun);
    _renderSingleStat(stats.undef, $status_undef);
  }

  function FeatureView (feature, $template) {
    var $render = GherkinRender.renderFeature(feature, $template);
    _renderStats(feature.stats, $render);
    this.$render = $render;

    //show-hide feature details
    $render.on('click', '[data-eventBind="toggle-scenarios"]', function () {
      _toggleDetails($render);
    });

    //update feature stats on scenario status change
    $(feature.scenarios).on('change.status', function () {
      _renderStats(feature.stats, $render);
    });
  }

  $.extend(FeatureView.prototype, {
    addScenario: function (scnView) {
      var $scnRender = scnView.$render;
      $('.feature-scenarios', this.$render).append($scnRender);
    },


  });

  return FeatureView;
});