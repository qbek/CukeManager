define(['models/FeatureModel'], function (Feature) {
  'use strict';

  function htmlEscape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function compileData (jsonString) {
    var features = [];
    var data = $.parseJSON(jsonString);
    //loop through features
    data.forEach(function (featureData) {
      //read feature data
      var name = htmlEscape(featureData.name);
      var description = htmlEscape(featureData.description);
      var tags = compileTags(featureData.tags);
      //create new feature and fill with read data
      var feature = Feature.create(name);
      feature.setTags(tags);
      feature.setDescription(description);
      //loop through scenarios
      featureData.elements.forEach(function (scenarioData) {
        if(scenarioData.type === 'background') {
          // background = compileBackground(scenarioData);
        } else if (scenarioData.type === 'scenario') {
          //read scenario data
          var name = htmlEscape(scenarioData.name);
          var tags = compileTags(scenarioData.tags);
          var description = htmlEscape(scenarioData.description);
          //create new scenario and fill with read data
          var scnId = feature.addScenario(name);
          feature.setScenarioTags(scnId, tags);
          feature.setScenarioDescription(scnId, description);
          //read steps and add to scenario
          if(scenarioData.steps) {
            scenarioData.steps.forEach(function (step) {
              var key = step.keyword.trim();
              var name = step.name;
              var status = step.result.status;
              var rowsDataTable = step.rows;

              if(rowsDataTable) {
                var datatable = [];
                rowsDataTable.forEach(function(row) {
                  datatable.push(row.cells);
                });
                feature.addScenarioStep(scnId, key, name, status, datatable);
              } else {
                feature.addScenarioStep(scnId, key, name, status);
              }


            });
          }
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