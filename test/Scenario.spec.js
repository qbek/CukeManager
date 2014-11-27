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
      scenario.visible = false;
      expect(view.$render).toBeHidden();
    });

    it('It has fill scenario element with scenario name', function () {
      expect($('.scenario-name', view.$render)).toContainText(scenario.name);
    });


    it('It has to fill scenario element with scenario status', function () {

    });

  });
});