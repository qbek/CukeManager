define(['text!tmpl/FeatureViewTmpl.html'], function (tmpl) {


  function FeatureView (model) {

    var render = tmpl.replace('{{name}}', model.name);

    $('#feature-list').append(render);

  }


  return {
    create: function (model) {return new FeatureView(model);}
  };

});