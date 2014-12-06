define( function () {


  function FeatureCtrl(featureView) {
    var $view = featureView.$render;


    $view.on('click', '.feature-label', function (event) {
      featureView.toggleScenarios();
    });

    $view.on('click', '.scenario-label', function (event) {
      var featureId = $(this).attr('data-featureid');
      var scenarioId = $(this).attr('data-scenarioid');
      window.location.hash = String.concat('#/features/scenario/', featureId, '/', scenarioId);
    });
  }


  return {
    create: function (featureView) { return new FeatureCtrl(featureView);}
  };
});