define(['modules/GherkinRender'], function () {
  'user strict';
  var GherkinRender = require('modules/GherkinRender');

  function _toggleScenarios ($render) {
    var $scenarios = $('[data-gr="scenarios"]', $render);

    if ($scenarios.hasClass('feature-scenarios-hidden')) {
      $scenarios.removeClass('feature-scenarios-hidden');
    } else {
      $scenarios.addClass('feature-scenarios-hidden');
    }
  }



  function FeatureView (feature, $template) {
    var $render = GherkinRender.renderFeature(feature, $template);

    $render.on('click', '[data-eventBind="toggle-scenarios"]', function () {
      console.log($render);
      _toggleScenarios($render);
    });

    this.$render = $render;
  }

  $.extend(FeatureView.prototype, {
    addScenario: function (scnView) {
      var $scnRender = scnView.$render;
      $('.feature-scenarios', this.$render).append($scnRender);
    },


  });

  return FeatureView;
});