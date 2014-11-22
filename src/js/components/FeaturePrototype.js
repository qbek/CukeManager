define(['components/ScenarioPrototype'], function (Scenario) {


  function Feature (name, tagsData) {
    var feature = {
      name: name,
      tags: tagsData
    };
    var scenarios = [];

    return {
      addScenario: function (scenario) {
        scenarios.push(scenario);
      },

      exportToCVS: function () {
        var featureCVS = String.concat(feature.name, ',', ',','\n');

        scenarios.forEach(function (scenario) {
          var scenarioCVS = scenario.exportToCVS();
          featureCVS = featureCVS.concat(scenarioCVS);
        });
        return featureCVS;
      }
    };
  }

  return {
    create: function (name, tags) {
      return new Feature(name, tags);
    }
  };
});