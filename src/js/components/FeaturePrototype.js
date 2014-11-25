define(['components/ScenarioPrototype'], function (Scenario) {


  function Feature (name, tagsData) {
    this.name = name;
    this.tags = tagsData;
    this.scenarios = [];

    this.addScenario = function (scenario) {
      this.scenarios.push(scenario);
    };
  }

  return {
    create: function (name, tags) {
      return new Feature(name, tags);
    }
  };
});

