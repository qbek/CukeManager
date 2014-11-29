define(['models/FeatureModel', 'views/FeatureView'], function (Model, View) {


  function FeatureCtrl(name) {




    var view = View.create(model);

  }


  return {
    create: function (name) { return new FeatureCtrl(name);}
  };
});