define(['models/ScenarioModel', 'views/ScenarioDetailsView', 'modules/DataCompile', 'text!testdata/example.json'], function (ScenarioModel, ScenarioDetailsView, DataCompile, json) {

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
    });
  });

  describe('ScenarioDetailsView', function() {
    describe('ScenarioView object created by createScenarioView(features)', function() {
      var view;
      beforeEach(function () {
        var result = DataCompile.compile(json);
        view = ScenarioDetailsView.createScenarioView(result);
      });

      it('render(featureId, scenarioId) - renders scenario to $render property', function () {
        //check scenario name
        view.render(0, 1);
        expect($('.scenario-name', view.$render).html()).toBe('Scenario without steps');

        //check scenario tags
        view.render(0, 0);
        expect($('.scenario-tags', view.$render).html()).toBe('@base @scenarioTag1');

        //check scenario description
        view.render(0, 0);
        expect($('.scenario-description', view.$render).html()).toBe('!Overview: An overview of scenario\n\n!Preconditions:\n  - set of preconditions\n\n!Pass Criteria:\n  - some pass criteria');

        //check scenario steps
        view.render(1, 1);
        var $steps = $('.scenario-step', view.$render);
        expect($steps.length).toBe(3);
        expect($('.step-keyword', $steps[0]).html()).toBe('Given');
        expect($('.step-name', $steps[0]).html()).toBe('Data table');
        expect($('.step-keyword', $steps[1]).html()).toBe('When');
        expect($('.step-name', $steps[1]).html()).toBe('User reads this scenario');
        expect($('.step-keyword', $steps[2]).html()).toBe('Then');
        expect($('.step-name', $steps[2]).html()).toBe('Data table is correctly rendered');


      });
    });


  });
});