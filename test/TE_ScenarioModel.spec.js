define(['models/TE_ScenarioModel', 'modules/DataCompile', 'text!testdata/example.json'],
function (ScenarioModel, DataCompile, json) {

  describe('Scenario Model', function() {

    it('factory ScenarioModel.create(name) creates new scenario', function () {
      var testScnName = 'Test scenario';
      var scenario = ScenarioModel.create(testScnName);
      //checks scenario public variables
      expect(scenario.name).toBe(testScnName);
      expect(scenario.description).toBe(null);
      expect(scenario.tags).toEqual([]);
      expect(scenario.steps).toEqual([]);
      expect(scenario.status).toEqual({result: 'undef', comment: null});
    });

    it('factory ScenarioModel.create(scenarioObj) creates new scenario', function () {
      var testScenarioObj = {
        "name": "Steps display with \"quote\" and <tag>",
        "tags": [
          "@base",
          "@scenarioTag1"
        ],
        "description": "!Overview: An overview of scenario\n\n!Preconditions:\n  - set of preconditions\n\n!Pass Criteria:\n  - some pass criteria",
        "steps": [
          {
            "keyword": "Given",
            "name": "First given step with \"quote\" and <tag>",
            "result": "undefined"
          },
          {
            "keyword": "And",
            "name": "Second given step",
            "result": "undefined"
          },
          {
            "keyword": "When",
            "name": "First when step",
            "result": "undefined"
          },
          {
            "keyword": "And",
            "name": "Second when step",
            "result": "undefined"
          },
          {
            "keyword": "Then",
            "name": "First then step",
            "result": "undefined"
          },
          {
            "keyword": "And",
            "name": "Second then step",
            "result": "undefined"
          }
        ],
        "status": {
          "result": "undefined",
          "comment": null
        }
      };

      var scenario = ScenarioModel.create(testScenarioObj);
      expect(scenario.name).toBe(testScenarioObj.name);
      expect(scenario.description).toBe(testScenarioObj.description);
      expect(scenario.tags).toBe(testScenarioObj.tags);
      expect(scenario.steps).toBe(testScenarioObj.steps);
      expect(scenario.status).toBe(testScenarioObj.status);
    });

    describe('public function', function () {
      var scenario;
      beforeEach(function () {
        scenario = ScenarioModel.create('Test name');
      });

      it('setTags(tags[]) - sets scenario.tags', function () {
        var testTags = ['tag1', 'tag2'];
        scenario.setTags(testTags);
        expect(scenario.tags).toEqual(testTags);
      });

      it('setDescription(desc) - sets scenario.description', function () {
        var testDescription = 'Example description';
        scenario.setDescription(testDescription);
        expect(scenario.description).toEqual(testDescription);
      });

      it('addStep(keyword, name, result [, datatable]) - adds step to scenario.steps', function () {
        var testStepNameStr1 = 'Given';
        var testStepStr1 = 'Test step one';
        var testStepResult = 'undefined';
        //check if can be added step without dataTable
        scenario.addStep(testStepNameStr1, testStepStr1, testStepResult);
        expect(scenario.steps[0]).toEqual(
          { keyword: testStepNameStr1,
            name: testStepStr1,
            result: testStepResult});
        //check if can be added full step
        var testStepNameStr2 = 'When';
        var testStepStr2 = 'Test step two';
        var testDataTable = [[1,2 ], [3,4]];
        scenario.addStep(testStepNameStr2, testStepStr2, testStepResult, testDataTable);
        expect(scenario.steps[1]).toEqual(
          { keyword: testStepNameStr2,
            name: testStepStr2,
            result: testStepResult,
            dataTable: testDataTable});
      });

      it('setStatus(status) - sets scenario.status.result and triggers "change.status" event', function () {
        scenario.setStatus('pass');
        expect(scenario.status.result).toBe('pass');

        scenario.setStatus('norun');
        expect(scenario.status.result).toBe('norun');

        // it('triggers "change.status" event', function () {
        var spyEvent = spyOnEvent(scenario, 'change.status');
        scenario.setStatus('pass');
        expect('change.status').toHaveBeenTriggeredOn(scenario);
      });

      it('setComment(comment) - sets scenario.status.comment', function () {
        var comment = 'test comment';
        scenario.setComment(comment);
        expect(scenario.status.comment).toBe(comment);

        comment = 'updated comment';
        scenario.setComment(comment);
        expect(scenario.status.comment).toBe(comment);
      });

    });

    describe('properties', function () {

      it('overview - contains scenario overview', function () {
        var scenario = ScenarioModel.create('Testing scenario description');
        expect(scenario.overview).toBe(null);
        scenario.description = '!Overview:\n An overview of scenario\nSecond line of overview\n!Preconditions:\n  - set of preconditions\n\n!Pass Criteria:\n  - some pass criteria';
        expect(scenario.overview).toEqual('An overview of scenario\nSecond line of overview');
      });
      it('preconditions - contains scenario overview', function () {
        var scenario = ScenarioModel.create('Testing scenario description');
        expect(scenario.preconditions).toBe(null);
        scenario.description = '!Overview: An overview of scenario\n\n!Preconditions:\n  - set of preconditions\n - second precondition\n!Pass Criteria:\n  - some pass criteria';
        expect(scenario.preconditions).toEqual('- set of preconditions\n - second precondition');

      });
      it('passcriteria - contains scenario overview', function () {
        var scenario = ScenarioModel.create('Testing scenario description');
        expect(scenario.passcriteria).toBe(null);
        scenario.description = '!Overview: An overview of scenario\n\n!Preconditions:\n  - set of preconditions\n\n!Pass Criteria:\n  - some pass criteria\n  - and more pass criteria';
        expect(scenario.passcriteria).toEqual('- some pass criteria\n  - and more pass criteria');
      });
    });
  });

  xdescribe('ScenarioDetailsView', function() {
    describe('ScenarioView object created by createScenarioView(features)', function() {
      var view;
      beforeEach(function () {
        var result = DataCompile.compile(json);
        result[0].scenarios[1].setStatus('pass');
        result[1].scenarios[0].setStatus('no run');
        result[1].scenarios[1].setStatus('fail', 'fail comment');
        view = ScenarioDetailsView.createScenarioView(result);
      });

      it('show(featureId, scenarioId) - renders scenario to $render property and shows it', function () {
        //check scenario name
        view.show(0, 1);
        expect($('.scenario-name', view.$render).html()).toBe('Scenario without steps');

        //check scenario tags
        view.show(0, 0);
        expect($('.scenario-status', view.$render).html()).toBe('undefined');
        view.show(0, 1);
        expect($('.scenario-status', view.$render).html()).toBe('pass');
        expect($('.scenario-status', view.$render)).toHaveClass('scenario-status-pass');
        view.show(1, 0);
        expect($('.scenario-status', view.$render).html()).toBe('no run');
        expect($('.scenario-status', view.$render)).toHaveClass('scenario-status-norun');
        view.show(1, 1);
        expect($('.scenario-status', view.$render).html()).toBe('fail');
        expect($('.scenario-status', view.$render)).toHaveClass('scenario-status-fail');


        //check scenario status
        view.show(0, 0);

        //check scenario description
        view.show(0, 0);
        expect($('.scenario-description', view.$render).html()).toBe('!Overview: An overview of scenario\n\n!Preconditions:\n  - set of preconditions\n\n!Pass Criteria:\n  - some pass criteria');

        //renders scenario background steps
        view.show(1, 0);
        var $steps = $('.scenario-background-steps .scenario-step', view.$render);
        expect($steps.length).toBe(2);
        expect($('.step-keyword', $steps[0]).html()).toBe('Given');
        expect($('.step-name', $steps[0]).html()).toBe('First background step');
        expect($('.step-keyword', $steps[1]).html()).toBe('And');
        expect($('.step-name', $steps[1]).html()).toBe('Last background step');


        //check scenario steps
        view.show(1, 1);
        $steps = $('.scenario-steps .scenario-step', view.$render);
        expect($steps.length).toBe(3);
        expect($('.step-keyword', $steps[0]).html()).toBe('Given');
        expect($('.step-name', $steps[0]).html()).toBe('Data table');
        expect($('.step-keyword', $steps[1]).html()).toBe('When');
        expect($('.step-name', $steps[1]).html()).toBe('User reads this scenario');
        expect($('.step-keyword', $steps[2]).html()).toBe('Then');
        expect($('.step-name', $steps[2]).html()).toBe('Data table is correctly rendered');

        //sets additional css classes to color step types
        view.show(0, 0);
        $steps = $('.scenario-steps .scenario-step', view.$render);
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
        $steps = $('.scenario-steps .scenario-step', view.$render);
        expect($('.step-name', $steps[0]).html()).toEqual('When define <span class="step-variable">"inline"</span> variable');
        expect($('.step-name', $steps[1]).html()).toEqual('Define <span class="step-variable">"one"</span>, <span class="step-variable">"two"</span> inline variables and even <span class="step-variable">"three"</span>');

        //if step contains data table, renders it, if not hides table element
        view.show(1, 1);
        $steps = $('.scenario-steps .scenario-step', view.$render);
        var datatableRows = $('.step-datatable tr', $steps[0]);
        expect(datatableRows.length).toBe(4);

        expect($(datatableRows[0]).html()).toEqual('<td>datakey</td><td>datavalue</td>');
        expect($(datatableRows[2]).html()).toEqual('<td>key2</td><td>value2</td>');

      });
    });

  });
});