define(['models/FeatureModel'],
function (FeatureModel) {

  describe('Feature Model', function () {

    it('factory FeatureModel.create(name) create new feature', function () {
      var testFeatStr = 'Test feature';
      var feature = FeatureModel.create(testFeatStr);
      //checks feature variables
      expect(feature.name).toBe(testFeatStr);
      expect(feature.description).toBe(null);
      expect(feature.tags).toBe(null);
      expect(feature.background).toBe(null);
      expect(feature.scenarios).toEqual([]);
    });

    it('factory FeatureModel.create(fatureObj) create new feature', function () {
      var testFeatureObj = {
        "name": "Data type examples",
        "description": "",
        "tags": null,
        "background": [
          {
            "keyword": "Given",
            "name": "First background step"
          },
          {
            "keyword": "And",
            "name": "Last background step"
          }
        ],
        "scenarios": [
          {
            "name": "Inline variables",
            "tags": null,
            "description": "",
            "steps": [
              {
                "keyword": "Given",
                "name": "When define \"inline\" variable",
                "result": "undefined"
              },
              {
                "keyword": "When",
                "name": "Define \"one\", \"two\" inline variables and even \"three\"",
                "result": "undefined"
              },
              {
                "keyword": "Then",
                "name": "Test is ok",
                "result": "undefined"
              }
            ],
            "status": {
              "result": "undefined",
              "comment": null
            }
          },
          {
            "name": "Data tables",
            "tags": null,
            "description": "",
            "steps": [
              {
                "keyword": "Given",
                "name": "Data table",
                "result": "undefined",
                "dataTable": [
                  [
                    "datakey",
                    "datavalue"
                  ],
                  [
                    "key1",
                    "value1"
                  ],
                  [
                    "key2",
                    "value2"
                  ],
                  [
                    "key3",
                    "<value3>"
                  ]
                ]
              },
              {
                "keyword": "When",
                "name": "User reads this scenario",
                "result": "undefined"
              },
              {
                "keyword": "Then",
                "name": "Data table is correctly rendered",
                "result": "undefined"
              }
            ],
            "status": {
              "result": "undefined",
              "comment": null
            }
          }
        ]
      };

      var feature = FeatureModel.create(testFeatureObj);
      expect(feature.name).toBe(testFeatureObj.name);
      expect(feature.description).toBe(testFeatureObj.description);
      expect(feature.tags).toBe(testFeatureObj.tags);
      expect(feature.background).toBe(testFeatureObj.background);

      //check if for scenarios ScenarioModels are created
      expect(feature.scenarios[0].setStatus).toBeDefined();
      expect(feature.scenarios[0].name).toBe(testFeatureObj.scenarios[0].name);
      expect(feature.scenarios[0].description).toBe(testFeatureObj.scenarios[0].description);
      expect(feature.scenarios[0].tags).toBe(testFeatureObj.scenarios[0].tags);
      expect(feature.scenarios[0].steps).toBe(testFeatureObj.scenarios[0].steps);
      expect(feature.scenarios[0].status).toBe(testFeatureObj.scenarios[0].status);
    });

    it('Feature.stats property contains feature statistics', function () {
      var feature = FeatureModel.create('Testing feature statistics');
      expect(feature.stats).toEqual({pass: 0, norun: 0, fail: 0, undef: 0});

      feature.addScenario('Test Scenario 1');
      expect(feature.stats).toEqual({pass: 0, norun: 0, fail: 0, undef: 1});
      feature.addScenario('Test Scenario 2');
      expect(feature.stats).toEqual({pass: 0, norun: 0, fail: 0, undef: 2});
      feature.addScenario('Test Scenario 3');
      expect(feature.stats).toEqual({pass: 0, norun: 0, fail: 0, undef: 3});

      feature.scenarios[0].setStatus('pass');
      expect(feature.stats).toEqual({pass: 1, norun: 0, fail: 0, undef: 2});
      feature.scenarios[1].setStatus('fail', 'commnet');
      expect(feature.stats).toEqual({pass: 1, norun: 0, fail: 1, undef: 1});
      feature.scenarios[2].setStatus('norun');
      expect(feature.stats).toEqual({pass: 1, norun: 1, fail: 1, undef: 0});
    });

    describe('public functions', function () {
      var feature;
      beforeEach(function () {
        feature = FeatureModel.create('Test Feature name');
      });

      it('setTags(tags[]) - sets feature.tags', function () {
        var testTagsTable = ['@tag1', '@tag2'];
        feature.setTags(testTagsTable);
        expect(feature.tags).toEqual(testTagsTable);
      });

      it('setDescription(description) - sets feature.description', function () {
        var testDescString = 'Example description';
        feature.setDescription(testDescString);
        expect(feature.description).toEqual(testDescString);
      });

      it('addBackgroundStep(keyword, name, datatable) - adds step to feature.background', function () {
        var testStepNameStr1 = 'Given';
        var testStepStr1 = 'Test step one';
        feature.addBackgroundStep(testStepNameStr1, testStepStr1);
        expect(feature.background[0]).toEqual({keyword:testStepNameStr1, name:testStepStr1});

        var testStepNameStr2 = 'When';
        var testStepStr2 = 'Test step two';
        var testDataTable = [[1,2 ], [3,4]];
        feature.addBackgroundStep(testStepNameStr2, testStepStr2, testDataTable);
        expect(feature.background[1]).toEqual({keyword:testStepNameStr2,
                                               name:testStepStr2,
                                               datatable: testDataTable});
      });

      it('addScenario(name, description, tags[]) - adds new scenario and returns it\'s id', function() {
        var testScenarioName1 = 'Test Scenario 1';
        var testScenarioDesc1 = 'Test Description 1';
        var testScenarioTags1 = ['tag11', 'tag12'];
        expect(feature.addScenario(testScenarioName1, testScenarioDesc1, testScenarioTags1)).toBe(0);
        expect(feature.scenarios.length).toBe(1);
        expect(feature.scenarios[0].name).toEqual(testScenarioName1);
        expect(feature.scenarios[0].description).toEqual(testScenarioDesc1);
        expect(feature.scenarios[0].tags).toEqual(testScenarioTags1);
        // expect(feature.stats.undef).toBe(1);

        var testScenarioName2 = 'Test Scenario 2';
        var testScenarioDesc2 = 'Test Description 2';
        var testScenarioTags2 = ['tag21', 'tag22'];
        expect(feature.addScenario(testScenarioName2, testScenarioDesc2, testScenarioTags2)).toBe(1);
        expect(feature.scenarios.length).toBe(2);
        expect(feature.scenarios[1].name).toEqual('Test Scenario 2');
        expect(feature.scenarios[1].description).toEqual(testScenarioDesc2);
        expect(feature.scenarios[1].tags).toEqual(testScenarioTags2);
        // expect(feature.stats.undef).toBe(1);
      });

      it('addScenarioStep(id, keyword, name, datatable, result) - adds step to scenario', function () {
        var testScenarioName1 = 'Test Scenario 1';
        var testScenarioDesc1 = 'Test Description 1';
        var testScenarioTags1 = ['tag11', 'tag12'];
        feature.addScenario(testScenarioName1, testScenarioDesc1, testScenarioTags1);
        var testScenarioName2 = 'Test Scenario 2';
        var testScenarioDesc2 = 'Test Description 2';
        var testScenarioTags2 = ['tag21', 'tag22'];
        feature.addScenario(testScenarioName2, testScenarioDesc2, testScenarioTags2);

        var testId = 1;
        var testStepKeyword1 = 'Given';
        var testStepnName1 = 'Test step one';
        var testStepResult1 = 'undefined';

        var testStepKeyword2 = 'When';
        var testStepnName2 = 'Test step two';
        var testStepResult2 = 'undefined';

        var testStepKeyword3 = 'Then';
        var testStepnName3 = 'Test step three';
        var testStepResult3 = 'undefined';
        var testStepDatatable3 = [['key1', 'value1'], ['key2', 'value2']];

        // var testStepG = {keyword: 'Given',   name: 'Test', result: 'undefined'};
        // var testStepW = {keyword: 'When',   name: 'Test 2', result: 'undefined'};
        // var testStepT = {keyword: 'Then',   name: 'Test 3', result: 'undefined', dataTable:[['key1', 'value1'], ['key2', 'value2']]};
        feature.addScenarioStep(testId, testStepKeyword1, testStepnName1, testStepResult1);
        feature.addScenarioStep(testId, testStepKeyword2, testStepnName2, testStepResult2);
        feature.addScenarioStep(testId, testStepKeyword3, testStepnName3, testStepResult3, testStepDatatable3);

        expect(feature.scenarios[testId].steps.length).toBe(3);
        expect(feature.scenarios[testId].steps[0]).toEqual({keyword: testStepKeyword1,
                                                       name: testStepnName1,
                                                       result: testStepResult1});
        expect(feature.scenarios[testId].steps[1]).toEqual({keyword: testStepKeyword2,
                                                       name: testStepnName2,
                                                       result: testStepResult2});
        expect(feature.scenarios[testId].steps[2]).toEqual({keyword: testStepKeyword3,
                                                       name: testStepnName3,
                                                       result: testStepResult3,
                                                       dataTable: testStepDatatable3});
      });
    });



  });
   // xdescribe('FeatureListView module', function () {

  //   describe('FeatureView object created by createFeatureView(featureModel) function', function() {
  //     var feature;

  //     beforeEach(function () {
  //       feature = FeatureModel.create('Test Feature name');
  //       feature.setTags(['@featureTag1', '@featureTag2']);
  //       feature.setDescription('Example description');
  //       view = FeatureView.createFeatureView(feature);
  //     });

  //     it('It has "$render" element with fully rendered feature element', function() {
  //       expect(view.$render).toBeMatchedBy('.feature');
  //       //feature name is correctly rendered
  //       expect($('.feature-name', view.$render)).toContainText(feature.name);
  //       //feature tags are correctly rendered
  //       expect($('.feature-tags', view.$render)).toContainText('@featureTag1 @featureTag2');
  //       //feature description is correctly rendered
  //       expect($('.feature-description', view.$render)).toContainText('Example description');
  //     });

  //     it('It has "addScenario(view)" function to add "scenario.$render" to "feature.$render"', function() {
  //       var scnView = FeatureView.createScenarioView({name: 'Test Scenario 1'});
  //       view.addScenario(scnView);
  //       expect($('.feature-scenarios', view.$render)).toContainElement('.scenario');

  //       scnView = FeatureView.createScenarioView({name: 'Test Scenario 2'});
  //       scnView = FeatureView.createScenarioView({name: 'Test Scenario 3'});
  //     });

  //     it('toggleScenario() - toggles class .feature-scenarios-hidden on .feature-scenario element', function () {
  //       expect($('.feature-scenarios', view.$render)).not.toHaveClass('feature-scenarios-hidden');
  //       view.toggleScenarios();
  //       expect($('.feature-scenarios', view.$render)).toHaveClass('feature-scenarios-hidden');
  //       view.toggleScenarios();
  //       expect($('.feature-scenarios', view.$render)).not.toHaveClass('feature-scenarios-hidden');
  //     })
  //   });

  //   describe('ScenarioView object created by createScenarioView(scenarioModel, featureId, scenarioId) function', function() {
  //     var scenario;
  //     var view;

  //     beforeEach(function () {
  //       scenario = ScenarioModel.create('Test name');
  //       scenario.setTags(['scnTag1', 'scnTag2']);
  //       scenario.setDescription('Example description');
  //       view = FeatureView.createScenarioView(scenario, 1, 1);
  //     });

  //     it('It has "$render" with rendered scenario element', function () {
  //       expect(view.$render).toBeDefined();
  //       expect(view.$render).toBeMatchedBy('.scenario');
  //       //renders scenario name
  //       expect($('.scenario-name', view.$render)).toContainText(scenario.name);
  //       //renders scenario tags
  //       expect($('.scenario-tags', view.$render)).toContainText('scnTag1 scnTag2');
  //       //renders scenario description
  //       expect($('.scenario-description', view.$render)).toContainText('Example description');
  //       //renders scenario status
  //       expect($('.scenario-status', view.$render)).toContainText('undefined');
  //       //adds class .scenario-status-pass when on pass
  //       scenario.setStatus('pass');
  //       expect($('.scenario-status', view.$render)).toHaveClass('scenario-status-pass');
  //       //check if removing status removes also class
  //       scenario.setStatus('undefined');
  //       expect($('.scenario-status', view.$render)).not.toHaveClass('scenario-status-pass');
  //       scenario.setStatus('fail');
  //       expect($('.scenario-status', view.$render)).toHaveClass('scenario-status-fail');
  //       scenario.setStatus('no run');
  //       expect($('.scenario-status', view.$render)).toHaveClass('scenario-status-norun');


  //       //adds data-featureid and data-scenarioid attr to .feature-label element
  //       expect($('.scenario-label', view.$render)).toHaveAttr('data-featureid', '1');
  //       expect($('.scenario-label', view.$render)).toHaveAttr('data-scenarioid', '1');
  //     });

  //     it('Updates status in $render on "change:status" even triggered by scenario model', function () {
  //       expect($('.scenario-status', view.$render)).toContainText('undefined');
  //       scenario.setStatus('pass');
  //       expect($('.scenario-status', view.$render)).toContainText('pass');
  //     });
  //   });

  // });
});