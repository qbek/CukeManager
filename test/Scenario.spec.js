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
    })
  });

  describe('Scenario View', function() {
    var scenario;
    var view;

    beforeEach(function () {
      scenario = ScenarioModel.create('Test name', 'Test description');
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

    it('It fills scenario element with scenario status', function () {
    });

  });
});