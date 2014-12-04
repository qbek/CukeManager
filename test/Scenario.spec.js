define(['models/ScenarioModel', 'views/ScenarioView'], function (ScenarioModel, ScenarioView) {

  describe('Scenario Model', function() {

    var scenario;

    beforeEach(function () {
      scenario = ScenarioModel.create('Test name', 'Test description');
    });

    it('It has "name" with name of the scenario', function () {
      expect(scenario.name).toEqual('Test name');
    });

    it('It has "visible" set to true by default', function () {
      expect(scenario.visible).toEqual(true);
    });

    it('has "setTags()" function which sets "tags" property', function () {
      scenario.setTags(['tag1', 'tag2']);
      expect(scenario.tags).toEqual(['tag1', 'tag2']);
    });

    it('has "setSteps()" function which sets "steps" property', function () {
      var steps = [{ name: 'Name 1', keyword: 'Given', result: 'undefined'},
                   { name: 'Name 2', keyword: 'When', result: 'undefined'}];

      scenario.setSteps(steps);
      expect(scenario.steps).toEqual(steps);
    });

    it('has "setDescription()" function with sets "description" property', function () {
      var desc = 'Example description';
      //check if user cannot set property using =
      scenario.description = "New description";
      expect(scenario.description).toEqual(null);
      //check if function sets correctly property
      scenario.setDescription(desc);
      expect(scenario.description).toEqual(desc);
    })
  });

  describe('Scenario View', function() {


  });
});