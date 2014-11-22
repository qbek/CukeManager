define(['components/ScenarioPrototype'], function (Scenario) {


  function Feature (name, tagsData) {
    var feature = {
      name: name,
      tags: tagsData,
      scenarios: []
    };

    return {
      addScenario: function (scenario) {
        feature.scenarios.push(scenario);
      },

      getInfo: function () {
        return {
          name: feature.name,
          tags: feature.tags
        };
      },

      getScenarios: function () {
        return feature.scenarios;
      }
    };
  }

  return {
    create: function (name, tags) {
      return new Feature(name, tags);
    }
  };
});