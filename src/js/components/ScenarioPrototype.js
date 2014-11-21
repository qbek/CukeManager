define([], function () {
  'use strict';

  function Scenario (scenario) {

    function compileScenario(scenarioData) {
        var stepsData = compileSteps(scenarioData.steps);
        var tagsData = compileTags(scenarioData.tags);
      return {
        name: scenarioData.name,
        description: scenarioData.description,
        steps: stepsData,
        tags: tagsData
      };
    }

    function compileSteps (steps) {
      var output = [];

      $.each(steps, function (index, step) {
        output.push({
          keyword: step.keyword,
          name: step.name,
          result: step.result
        });
      });

      return output;
    }

    function compileTags (tags) {
      var output = [];
      $.each(tags, function (index, tag) {
        output.push(tag.name);
      });
      return output;
    }

    return {
      exportToCVS: function () {
        var scenarioCVS = String.concat(',', scenario.name, ',', scenario.tags, '\n');
        return scenarioCVS;
      }
    };
  }


  return {
    create: function (scenarioData) {
      return new Scenario(scenarioData);
    }
  };
});