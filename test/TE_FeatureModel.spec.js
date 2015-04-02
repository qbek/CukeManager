define(['models/TE_FeatureModel'],
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

    it('factory FeatureModel.create(fatureObj) creates new feature', function () {
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

    describe('properties', function () {

      it('stats - contains feature statistics', function () {
        var feature = FeatureModel.create('Testing feature statistics');
        expect(feature.stats).toEqual({pass: 0, norun: 0, fail: 0, undef: 0});

        var scenario = feature.createNewScenario('Test Scenario 1');
        feature.addScenario(scenario);
        expect(feature.stats).toEqual({pass: 0, norun: 0, fail: 0, undef: 1});
        scenario = feature.createNewScenario('Test Scenario 2');
        feature.addScenario(scenario);
        expect(feature.stats).toEqual({pass: 0, norun: 0, fail: 0, undef: 2});
        scenario = feature.createNewScenario('Test Scenario 3');
        feature.addScenario(scenario);
        expect(feature.stats).toEqual({pass: 0, norun: 0, fail: 0, undef: 3});

        feature.scenarios[0].setStatus('pass');
        expect(feature.stats).toEqual({pass: 1, norun: 0, fail: 0, undef: 2});
        feature.scenarios[1].setStatus('fail', 'commnet');
        expect(feature.stats).toEqual({pass: 1, norun: 0, fail: 1, undef: 1});
        feature.scenarios[2].setStatus('norun');
        expect(feature.stats).toEqual({pass: 1, norun: 1, fail: 1, undef: 0});
      });

      it('author - contains feature author', function () {
        var feature = FeatureModel.create('Testing feature statistics');
        expect(feature.author).toEqual(null);
        feature.description = '!Overview: Feature description \n !Author: Jakub Szewczyk';
        expect(feature.author).toEqual('Jakub Szewczyk');
        feature.description = '!Author: Jakub Baran \n !Reviewer: Edward Kowalski \n !Overview: Feature description';
        expect(feature.author).toEqual('Jakub Baran');
        feature.description = '!Reviewer: Edward Kowalski \n !Author: Jakub Kot \n !Overview: Feature description';
        expect(feature.author).toEqual('Jakub Kot');
      });

      it('reviewer - contains feature reviewer', function () {
        var feature = FeatureModel.create('Testing feature statistics');
        expect(feature.reviewer).toEqual(null);
        feature.description = '!Overview: Feature description \n !Author: Jakub Szewczyk';
        expect(feature.reviewer).toEqual(null);
        feature.description = '!Author: Jakub Baran \n !Reviewer: Edward Kowalski \n !Overview: Feature description';
        expect(feature.reviewer).toEqual('Edward Kowalski');
        feature.description = '!Reviewer: Edward Slon \n !Author: Jakub Kot \n !Overview: Feature description';
        expect(feature.reviewer).toEqual('Edward Slon');
      });

      it('overview - contains feature overview', function () {
        var feature = FeatureModel.create('Testing feature statistics');
        expect(feature.overview).toEqual(null);
        feature.description = '!Author: Jakub Baran \n !Reviewer: Edward Kowalski \n !Overview:\n Feature description \n second line of description';
        expect(feature.overview).toEqual('Feature description \n second line of description');
      });

      it('preconditions - contains feature preconditions', function () {
        var feature = FeatureModel.create('Testing feature statistics');
        expect(feature.preconditions).toEqual(null);
        feature.description = '!Author: Jakub Baran \n !Reviewer: Edward Kowalski \n !Overview:\n Feature description \n second line of description \n !Preconditions:\n - first precondition\n - second precondition';
        expect(feature.preconditions).toEqual('- first precondition\n - second precondition');
      });
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

      it('createNewScenario(name) - creates and returns new scenario model to fill with data', function () {
        var newScenario_1 = feature.createNewScenario('Test scenario 1');
        expect(newScenario_1.name).toEqual('Test scenario 1');
      });

      it('addScenario(scenario) - adds scenario to feature\'s scenarios list', function () {
        var scenario = feature.createNewScenario('Test scenario 1');
        feature.addScenario(scenario);
        expect(feature.scenarios[0].name).toEqual('Test scenario 1');

        scenario = feature.createNewScenario('Test scenario 2');
        feature.addScenario(scenario);
        expect(feature.scenarios[1].name).toEqual('Test scenario 2');
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