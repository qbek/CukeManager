define(['models/FeatureModel'], function (Feature) {
  'use strict';
  function compileData (json) {
    var features = [];
    var data = $.parseJSON(json);
    //loop through features
    data.forEach(function (featureData) {
      var name = featureData.name;
      var feature = Feature.create(name);
      // var tags = compileTags(featureData.tags);
      // var background;

      featureData.elements.forEach(function (scenarioData) {
        if(scenarioData.type === 'background') {
          // background = compileBackground(scenarioData);
        } else if (scenarioData.type === 'scenario') {
          var name = scenarioData.name;
          // var description = scenarioData.description;
          // var tags = compileTags(scenarioData.tags);
          // var steps = compileSteps(scenarioData.steps);
          feature.addScenario(name);
        }
      });
      features.push(feature);
    });
    return features;
  }

  function compileSteps (steps) {
    var output = [];
    if(steps) {
      steps.forEach(function (step) {
        output.push({
          keyword: step.keyword,
          name: step.name,
          result: step.result
        });
      });
    }
    return output;
  }

  function compileTags (tags) {
    var output = [];
    if (tags) {
      tags.forEach(function (tag) {
        output.push(tag.name);
      });
    }
    return output;
  }

  function compileBackground (background) {
    var output = {
      steps: []
    };
    background.steps.forEach(function (step) {
      output.steps.push( compileStep(step) );
    });
    return output;
  }


  return {
    // readFile: function (file) {
    //   var promise = $.Deferred();
    //   var fileReader = new FileReader();
    //   fileReader.onloadend = function (e) {
    //     var result = e.target.result;
    //     compileData(result);
    //     promise.resolve(features);
    //   };
    //   fileReader.readAsText(file);
    //   return promise;
    // }
    compile: function (dataJSON) {
      var features = compileData(dataJSON);

      return features;
    }
  };


});