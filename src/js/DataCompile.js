define(['components/FeaturePrototype'], function (Feature) {
  'use strict';
  var featuresDataSet = [];

  function compileData (input) {

    var data = $.parseJSON(input);
    //loop through features
    $.each(data, function (index, featureData) {
      var tags = compileTags(featureData.tags);
      var name = featureData.name;
      var feature = Feature.create(name, tags);
      var background;

      $.each(featureData.elements, function (index, scenarioData) {
        if(scenarioData.type === 'background') {
          // background = compileBackground(scenarioData);
        } else if (scenarioData.type === 'scenario') {
          feature.addScenario(scenarioData);
        }
      });
      featuresDataSet.push(feature);
    });
    return featuresDataSet[0].exportToCVS();
  }

  function compileTags (tags) {
    var output = [];
    $.each(tags, function (index, tag) {
      output.push(tag.name);
    });
    return output;
  }

  function compileBackground (background) {
    var output = {
      steps: []
    };
    $.each(background.steps, function (index, step) {
      output.steps.push( compileStep(step) );
    });
    return output;
  }







  var DataCompile = {
    readFile: function (file) {
      var promise = $.Deferred();
      var fileReader = new FileReader();
      fileReader.onloadend = function (e) {
        console.log('file onloadend');
        var result = e.target.result;
        var cvs = compileData(result);
        promise.resolve(cvs);


      };
      fileReader.readAsText(file);

      return promise;
    }
  };

  return {
    init: function () {
      return Object.create(DataCompile);
    }
  };

});