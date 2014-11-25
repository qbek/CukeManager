define(['views/FeatureView'], function (View) {


  function FeatureCtrl (model) {
    var view = View.create(model);


  }


  return {
    create: function (model) { return new FeatureCtrl(model);}
  };
});