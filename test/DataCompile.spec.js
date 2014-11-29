define(['modules/DataCompile', 'text!testdata/example.json'], function (DataCompile, json) {
  'use strict';
  describe('DataCompile Module', function () {
    beforeEach(function () {

    });

    it('has "compile()" function - it returns array of "FeatureModel\'s"', function () {
      var result = DataCompile.compile(json);

      //check if all Features were compiled
      expect(result.length).toBe(2);

      //check names of compiled Features
      expect(result[0].name).toEqual('Base Scenario features');
      expect(result[1].name).toEqual('Data type examples');

      //check scenario names
      var scenarios = result[0].scenarios;
      expect(scenarios[0].name).toEqual('Steps display');
      expect(scenarios[1].name).toEqual('Scenario without steps');

    });
  });
});