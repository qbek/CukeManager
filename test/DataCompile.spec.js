define(['modules/DataCompile', 'text!testdata/example.json'], function (DataCompile, json) {
  'use strict';
  describe('DataCompile Module', function () {

    describe('has "compile()" function - it returns array of "FeatureModel\'s"', function () {
      var testData = JSON.parse(json);
      var result = DataCompile.compile(json);
      var featureOne = result[0];
      var featureTwo = result[1];

      it('reads feature names', function () {
        //check if all Features were compiled
        expect(result.length).toBe(2);
        //check names of compiled Features
        expect(result[0].name).toEqual(testData[0].name);
        expect(result[1].name).toEqual(testData[1].name);
      });

      it('reads feature tags', function () {
        //check tags of compiled Features
        expect(featureOne.tags.length).toBe(2);
        expect(featureOne.tags).toEqual(['@featureTag1', '@featureTag2']);
        //feature without tags has tags set to null
        expect(featureTwo.tags).toBe(null);
      });

      it('reads feature description', function () {
        expect(featureOne.description).toEqual('!Author: Jakub Szewczyk\n!Reviewer:\nThis is short description of feature');
      });

      it('reads feature background steps', function () {
        expect(featureTwo.background.length).toBe(2);
        expect(featureTwo.background[0]).toEqual({keyword: 'Given', name: 'First background step'});
        expect(featureTwo.background[1]).toEqual({keyword: 'And', name: 'Last background step'});

        //from scenarios background steps are cut out
        expect(featureTwo.scenarios[0].steps.length).toBe(3);

      });

      it('reads scenario names', function () {
        //check if all Scenarios were compiled
        expect(result[0].scenarios.length).toBe(2);
        expect(result[1].scenarios.length).toBe(2);
        //check scenario names
        var scenarios = featureOne.scenarios;
        expect(scenarios[0].name).toEqual(testData[0].elements[0].name);
        expect(scenarios[1].name).toEqual(testData[0].elements[1].name);
      });

      it('reads scenario tags', function () {
        //check tags of scenarioOne of featureOne
        var scenario = featureOne.scenarios[0];
        expect(scenario.tags.length).toBe(2);
        expect(scenario.tags).toEqual(['@base', '@scenarioTag1']);

        //check tags of scenarioTwo of featureTwo
        scenario = featureTwo.scenarios[1];
        expect(scenario.tags).toBe(null);
      });

      it('reads scenario description', function () {
        var scenario = featureOne.scenarios[0];
        expect(scenario.description).toEqual('!Overview: An overview of scenario\n\n!Preconditions:\n  - set of preconditions\n\n!Pass Criteria:\n  - some pass criteria');
      });

      it('reads scenario step key word, step name and step result', function () {
        //check steps of 'Scenario: Steps display'
        var scenario = featureOne.scenarios[0];
        expect(scenario.steps.length).toBe(6);
        expect(scenario.steps[0].name).toEqual(testData[0].elements[0].steps[0].name);
        expect(scenario.steps[0].keyword).toEqual(testData[0].elements[0].steps[0].keyword.trim());
        expect(scenario.steps[0].result).toEqual('undefined');

        expect(scenario.steps[2].name).toEqual(testData[0].elements[0].steps[2].name);
        expect(scenario.steps[2].keyword).toEqual(testData[0].elements[0].steps[2].keyword.trim());
        expect(scenario.steps[2].result).toEqual('undefined');

        expect(scenario.steps[5].name).toEqual(testData[0].elements[0].steps[5].name);
        expect(scenario.steps[5].keyword).toEqual(testData[0].elements[0].steps[5].keyword.trim());
        expect(scenario.steps[5].result).toEqual('undefined');

        //check steps of 'Scenario: Scenario without steps'
        scenario = featureOne.scenarios[1];
        expect(scenario.steps).toEqual([]);
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