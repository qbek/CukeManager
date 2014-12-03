define(['modules/DataCompile', 'text!testdata/example.json'], function (DataCompile, json) {
  'use strict';
  describe('DataCompile Module', function () {
    beforeEach(function () {

    });

    describe('has "compile()" function - it returns array of "FeatureModel\'s"', function () {
      var result = DataCompile.compile(json);
      var featureOne = result[0];
      var featureTwo = result[1];

      it('reads feature names', function () {
        //check if all Features were compiled
        expect(result.length).toBe(2);
        //check names of compiled Features
        expect(featureOne.name).toEqual('Base Scenario features');
        expect(featureTwo.name).toEqual('Data type examples');
      });

      it('reads feature tags', function () {
        //check tags of compiled Features
        expect(featureOne.tags.length).toBe(2);
        expect(featureOne.tags).toEqual(['@featureTag1', '@featureTag2']);
        //feature without tags has tags set to null
        expect(featureTwo.tags).toBe(null);
      });


      it('reads scenario names', function () {
        //check if all Scenarios were compiled
        expect(featureOne.scenarios.length).toBe(2);
        expect(featureTwo.scenarios.length).toBe(2);
        //check scenario names
        var scenarios = featureOne.scenarios;
        expect(scenarios[0].name).toEqual('Steps display');
        expect(scenarios[1].name).toEqual('Scenario without steps');
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
    });
  });
});