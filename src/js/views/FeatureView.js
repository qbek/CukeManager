define(['text!tmpl/FeatureViewTmpl.html'], function (tmpl) {

  function render (feature, $render) {
    var $name = $('.feature-name', $render);
    var $tags = $('.feature-tags', $render);
    var $desc = $('.feature-description', $render);
    var tagsString = '';
    if(feature.tags) {
      tagsString = feature.tags.join(' ');
    }
    $name.html(feature.name);
    $tags.html(tagsString);
    $desc.html(feature.description);
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