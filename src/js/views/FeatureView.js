define(['text!tmpl/FeatureViewTmpl.html'], function (tmpl) {

  function render (feature, $render) {
    $('.feature-name', $render).html(feature.name);
  }

  function FeatureView (feature) {
    this.$render = $(tmpl);
    render(feature, this.$render);
  }

  FeatureView.prototype.addScenario = function (scnView) {
    var $scnRender = scnView.$render;
    $('.feature-scenarios', this.$render).append($scnRender);
  };

  return {
    create: function (feature) {return new FeatureView(feature);}
  };

});