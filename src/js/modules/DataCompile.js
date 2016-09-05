define(function () {
  'use strict';

  function _getDataTable(step) {
    var dataTable = step.rows;
    var outputDataTable = null;
    if(dataTable) {
      outputDataTable = [];
      dataTable.forEach(function(row) {
        outputDataTable.push(row.cells);
      });
    }
    return outputDataTable;
  }

  function _getTags (data) {
    var tags = data.tags;
    var output = null;
    if (tags) {
      output = [];
      tags.forEach(function (tag) {
        output.push(tag.name);
      });
    }
    return output;
  }

  function _getNewFeature (data, testSet) {
    var feature = testSet.createNewFeature(data.name);
    feature.setDescription(data.description);
    feature.setTags(_getTags(data));
    return feature;
  }

  function _getNewScenario (data, feature) {
    var scenario = feature.createNewScenario(data.name);
    scenario.setDescription(data.description);
    scenario.setTags(_getTags(data));
    return scenario;
  }

  function _getFirstStepName (scenarioData) {
    return scenarioData.steps ? scenarioData.steps[0].name : null;
  }

  function _addStep(stepData, model) {
    var key = stepData.keyword.trim();
    var name = stepData.name;
    var datatable = _getDataTable(stepData);
    model.addBackgroundStep ?
      model.addBackgroundStep(key, name, datatable) : model.addStep(key, name, datatable);
  }

  function _addSteps(stepsData, model, startFromStep) {
    var count = 0;
    if(stepsData) {
      count = stepsData.length;
      stepsData.forEach(function (stepData, index) {
        if (index >= startFromStep) {
            _addStep(stepData, model);
          }
      });
    }
    return count;
  }

  function _addScenarios (scenariosData, feature) {
    var backgroundSteps = 0;
    //to store first background step - there is difference in generating json file on Windows na Linux
    var firstBackgroundStepName = null;
    scenariosData.forEach(function (scenarioData) {
      if(scenarioData.type === 'background') {
        if(feature.background == null) {
          backgroundSteps = _addSteps(scenarioData.steps, feature, 0);
          firstBackgroundStepName = _getFirstStepName(scenarioData);
        }
      } else if (scenarioData.type === 'scenario') {
        var scenario = _getNewScenario(scenarioData, feature);
        var firstStepName = _getFirstStepName(scenarioData);
        if(firstStepName == firstBackgroundStepName) {
          _addSteps(scenarioData.steps, scenario, backgroundSteps);
        } else {
          _addSteps(scenarioData.steps, scenario, 0);
        }
        feature.addScenario(scenario);
      }
    });
  }

  function compileToTestSet (json, testSet) {
    var featuresData = $.parseJSON(json);
    //loop through features
    featuresData.forEach(function (featureData) {
      var feature = _getNewFeature(featureData, testSet);
      var scenariosData = featureData.elements;
      _addScenarios(scenariosData, feature);
      testSet.addFeature(feature);
    });

    return testSet;
  }

  return {
    compile: compileToTestSet
  };


});