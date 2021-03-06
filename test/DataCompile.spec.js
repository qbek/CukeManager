define(['modules/DataCompile', 'models/TestSetModel', 'text!testdata/example.json', 'text!testdata/example_win.json'], function (DataCompile, TestSet, json, json_win) {
  'use strict';
  describe('DataCompile Module', function () {

    describe('has "compile(content, TestSet)" function - it returns Test Set with features read from content', function () {
      var testData = JSON.parse(json);
      var testSet = TestSet.create();
      testSet = DataCompile.compile(json, testSet);
      var featureOne = testSet.features[0];
      var featureTwo = testSet.features[1];

      it('reads feature names', function () {
        //check if all Features were compiled
        expect(testSet.features.length).toBe(2);
        //check names of compiled Features
        expect(featureOne.name).toEqual(testData[0].name);
        expect(featureTwo.name).toEqual(testData[1].name);
      });

      it('reads feature tags', function () {
        //check tags of compiled Features
        expect(featureOne.tags.length).toBe(2);
        expect(featureOne.tags).toEqual(['@featureTag1', '@featureTag2']);
        //feature without tags has tags set to null
        expect(featureTwo.tags).toBe(null);
      });

      it('reads feature description', function () {
        expect(featureOne.description).toEqual(testData[0].description);
      });

      it('reads feature background steps', function () {
        expect(featureTwo.background.length).toBe(2);
        expect(featureTwo.background[0]).toEqual({ keyword : 'Given', name : 'First background step with datatable', dataTable : [ [ 'data', 'table' ], [ 'in', 'background' ] ] });
        expect(featureTwo.background[1]).toEqual({keyword: 'And', name: 'Last background step'});

        //from scenarios background steps are cut out
        expect(featureTwo.scenarios[0].steps.length).toBe(3);
      });

      it('reads feature background steps - Windows case (no repeat in scenario)', function () {
        var testSet_win = TestSet.create();
        testSet_win = DataCompile.compile(json_win, testSet_win);
        var featureTwo_win = testSet_win.features[1];

        expect(featureTwo_win.background.length).toBe(2);
        expect(featureTwo_win.background[0]).toEqual({keyword: 'Given', name: 'First background step'});
        expect(featureTwo_win.background[1]).toEqual({keyword: 'And', name: 'Last background step'});

        //from scenarios background steps are cut out
        expect(featureTwo_win.scenarios[0].steps.length).toBe(3);
      });



      it('reads scenario names', function () {
        //check if all Scenarios were compiled
        expect(featureOne.scenarios.length).toBe(4);
        expect(featureTwo.scenarios.length).toBe(2);
        //check scenario names
        var scenarios = featureOne.scenarios;
        expect(scenarios[0].name).toEqual(testData[0].elements[0].name);
        expect(scenarios[1].name).toEqual(testData[0].elements[1].name);
      });

      it('reads scenario tags', function () {
        //check tags of scenarioOne of featureOne
        var scenario = featureOne.scenarios[0];
        expect(scenario.tags.length).toBe(4);
        expect(scenario.tags).toEqual([ '@featureTag1', '@featureTag2', '@base', '@scenarioTag1' ]);

        //check tags of scenarioTwo of featureTwo
        scenario = featureTwo.scenarios[1];
        expect(scenario.tags).toBe(null);
      });

      it('reads scenario description', function () {
        var scenario = featureOne.scenarios[0];
        expect(scenario.description).toEqual(testData[0].elements[0].description);
      });

      it('reads scenario step key word, step name and step result', function () {
        //check steps of 'Scenario: Steps display'
        var scenario = featureOne.scenarios[0];
        expect(scenario.steps.length).toBe(6);
        expect(scenario.steps[0].name).toEqual(testData[0].elements[0].steps[0].name);
        expect(scenario.steps[0].keyword).toEqual(testData[0].elements[0].steps[0].keyword.trim());

        expect(scenario.steps[2].name).toEqual(testData[0].elements[0].steps[2].name);
        expect(scenario.steps[2].keyword).toEqual(testData[0].elements[0].steps[2].keyword.trim());

        expect(scenario.steps[5].name).toEqual(testData[0].elements[0].steps[5].name);
        expect(scenario.steps[5].keyword).toEqual(testData[0].elements[0].steps[5].keyword.trim());

      });

      it('reads data tables attached to steps', function () {
        var scenario = featureTwo.scenarios[1];
        expect(scenario.steps[0].dataTable.length).toBe(4);
        expect(scenario.steps[0].dataTable[0].length).toBe(2);
        expect(scenario.steps[0].dataTable[2].length).toBe(2);

        expect(scenario.steps[0].dataTable[1]).toEqual(['key1', 'value1']);
        expect(scenario.steps[0].dataTable[2]).toEqual(['key2', 'value2']);
      });

    });
  });
});