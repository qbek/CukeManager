define(['ctrls/FeatureCtrl'], function (FeatureCtrl) {
  var ctrls = [];



  return {
    init: function (features) {
      features.forEach(function (feature) {
        var featureCtrl = FeatureCtrl.create(feature);
        ctrls.push(featureCtrl);
      });
    }
  };


});