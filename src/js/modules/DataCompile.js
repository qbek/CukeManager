define(['models/FeatureModel'], function (Feature) {
  'use strict';
  function compileData (jsonString) {
    var features = [];
    var data = $.parseJSON(jsonString);
    //loop through features
    data.forEach(function (featureData) {
      var name = featureData.name;
      var feature = Feature.create(name);
      var tags = compileTags(featureData.tags);
      feature.setTags(tags);
      feature.setDescription(featureData.description);

      featureData.elements.forEach(function (scenarioData) {
        if(scenarioData.type === 'background') {
          // background = compileBackground(scenarioData);
        } else if (scenarioData.type === 'scenario') {
          var name = scenarioData.name;
          var tags = compileTags(scenarioData.tags);
          var description = scenarioData.description;
          var steps = compileSteps(scenarioData.steps);
          var scnId = feature.addScenario(name);
          feature.setScenarioTags(scnId, tags);
          feature.setScenarioSteps(scnId, steps);
          feature.setScenarioDescription(scnId, description);
        }
      });
      features.push(feature);
    });
    return features;
  }

  function compileSteps (steps) {
    var output = null;
    if(steps) {
      output = [];
      steps.forEach(function (step) {
        output.push({
          keyword: step.keyword.trim(),
          name: step.name,
          result: step.result.status
        });
      });
    }
    return output;
  }

  function compileTags (tags) {
    var output = null;
    if (tags) {
      output = [];
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

    compile: function (filecontent) {
      var features = compileData(filecontent);

      return features;
    }
  };


});