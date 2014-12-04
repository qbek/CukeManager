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
    var scenario;
    var view;

    beforeEach(function () {
      scenario = ScenarioModel.create('Test name');
      scenario.setTags(['scnTag1', 'scnTag2']);
      scenario.setDescription('Example description');
      view = ScenarioView.create(scenario);
    });

    it('It has "$render" with rendered scenario element', function () {
      expect(view.$render).toBeDefined();
      expect(view.$render).toBeMatchedBy('.scenario');
    });

    it('"$render" element is visible only when scenario.visible is true', function () {
      // TODO: this test doesn't work
    });

    it('It fills scenario element with scenario name', function () {
      expect($('.scenario-name', view.$render)).toContainText(scenario.name);
    });

    it('It fills scenario element with scenario tags', function () {
      expect($('.scenario-tags', view.$render)).toContainText('scnTag1 scnTag2');
    });

    it('It fills scenario element with description', function () {
      expect($('.scenario-description', view.$render)).toContainText('Example description');
    })


    it('It fills scenario element with scenario status', function () {
      expect($('.scenario-tags', view.$render)).toContainText('scnTag1 scnTag2');
    });

  });
});