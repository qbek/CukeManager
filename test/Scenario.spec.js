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

    //to remove
    xit('has "setSteps()" function which sets "steps" property', function () {
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

    it('has "addStep(keyword, name, result [, datatable])" function which adds step to "steps" property', function () {
      //check if steps property is read only
      scenario.steps = "first step";
      expect(scenario.steps).toBe(null);
      //check if can be added step without dataTable
      scenario.addStep('Given', 'Test step', 'undefined');
      expect(scenario.steps[0]).toEqual({keyword: 'Given', name: 'Test step', result: 'undefined'});
      //check if can be added full step
      scenario.addStep('When', 'Data table', 'undefined', [['key1', 'value1'], ['key2', 'value2']]);
      expect(scenario.steps[1]).toEqual({keyword: 'When', name: 'Data table', result: 'undefined', dataTable: [['key1', 'value1'], ['key2', 'value2']]});

    })
  });

  describe('ScenarioDetailsView', function() {
    describe('ScenarioView object created by createScenarioView(features)', function() {
      var view;
      beforeEach(function () {
        var result = DataCompile.compile(json);
        view = ScenarioDetailsView.createScenarioView(result);
      });

      it('show(featureId, scenarioId) - renders scenario to $render property and shows it', function () {
        //check scenario name
        view.show(0, 1);
        expect($('.scenario-name', view.$render).html()).toBe('Scenario without steps');

        //check scenario tags
        view.show(0, 0);
        expect($('.scenario-tags', view.$render).html()).toBe('@base @scenarioTag1');

        //check scenario description
        view.show(0, 0);
        expect($('.scenario-description', view.$render).html()).toBe('!Overview: An overview of scenario\n\n!Preconditions:\n  - set of preconditions\n\n!Pass Criteria:\n  - some pass criteria');

        //check scenario steps
        view.show(1, 1);
        var $steps = $('.scenario-step', view.$render);
        expect($steps.length).toBe(3);
        expect($('.step-keyword', $steps[0]).html()).toBe('Given');
        expect($('.step-name', $steps[0]).html()).toBe('Data table');
        expect($('.step-keyword', $steps[1]).html()).toBe('When');
        expect($('.step-name', $steps[1]).html()).toBe('User reads this scenario');
        expect($('.step-keyword', $steps[2]).html()).toBe('Then');
        expect($('.step-name', $steps[2]).html()).toBe('Data table is correctly rendered');

        //sets additional css classes to color step types
        view.show(0, 0);
        var $steps = $('.scenario-step', view.$render);
        expect($steps[0]).toHaveClass('step-keyword-given');
        expect($steps[1]).toHaveClass('step-keyword-given');
        expect($steps[2]).toHaveClass('step-keyword-when');
        expect($steps[3]).toHaveClass('step-keyword-when');
        expect($steps[4]).toHaveClass('step-keyword-then');
        expect($steps[5]).toHaveClass('step-keyword-then');

        //sets .set-block-first at beginning of each Given step
        expect($steps[0]).toHaveClass('step-block-first');
        expect($steps[1]).not.toHaveClass('step-block-first');
        expect($steps[2]).not.toHaveClass('step-block-first');
        expect($steps[3]).not.toHaveClass('step-block-first');
        expect($steps[4]).not.toHaveClass('step-block-first');
        expect($steps[5]).not.toHaveClass('step-block-first');

        //In step name variables are surrounded with span.step-variable element
        view.show(1, 0);
        var $steps = $('.scenario-step', view.$render);
        expect($('.step-name', $steps[0]).html()).toEqual('When define <span class="step-variable">"inline"</span> variable');
        expect($('.step-name', $steps[1]).html()).toEqual('Define <span class="step-variable">"one"</span>, <span class="step-variable">"two"</span> inline variables and even <span class="step-variable">"three"</span>');

        //if step contains data table, renders it, if not hides table element
        view.show(1, 1);
        var $steps = $('.scenario-step', view.$render);
        var datatableRows = $('.step-datatable tr', $steps[0])
        expect(datatableRows.length).toBe(4);

        expect($(datatableRows[0]).html()).toEqual('<td>datakey</td><td>datavalue</td>');
        expect($(datatableRows[2]).html()).toEqual('<td>key2</td><td>value2</td>');



      });
    });

  });
});