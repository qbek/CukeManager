define(['views/ScenarioView', 'models/FeatureModel', 'views/FeatureView', 'ctrls/FeatureCtrl'], function (ScenarioView, FeatureModel, FeatureView, FeatureCtrl) {

  describe('Feature Model', function () {
    var feature;

    beforeEach(function () {
      feature = FeatureModel.create('Test Feature name');
    });

    it('has "name" with name of the feature', function () {
      expect(feature.name).toEqual('Test Feature name');
    });

    it('It has "visible" set to true by default', function () {
      expect(feature.visible).toEqual(true);
    });

    it('It has "scenarios[]" table for Scenario models', function () {
      expect(feature.scenarios).toBeDefined();
      expect(feature.scenarios.length).toBe(0);
    });

    xit('It has "addTags(tags[])" function which updates "tags" property', function () {
      expect(feature.addTags).toBeDefined();
      var tags = ['@tag1', '@tag2'];
    });

    describe('It has "addScenario(name)" function:', function() {
      it('returns id of added scenario', function () {
        expect(feature.addScenario).toBeDefined();
        expect(feature.addScenario('Test Scenario 1')).toBe(0);
        expect(feature.addScenario('Test Scenario 2')).toBe(1);
        expect(feature.addScenario('Test Scenario 3')).toBe(2);
      });

      it('creates new Scenario model and adds it to "scenarios[]" table', function () {
        feature.addScenario('Test Scenario 1');
        expect(feature.scenarios.length).toBe(1);
        expect(feature.scenarios[0].name).toEqual('Test Scenario 1');

        feature.addScenario('Test Scenario 2');
        expect(feature.scenarios.length).toBe(2);
        expect(feature.scenarios[1].name).toEqual('Test Scenario 2');

      });
    });

  });

  describe('Feature View', function () {
    var feature;
    var view;

    beforeEach(function () {
      feature = FeatureModel.create('Test Feature name');
      view = FeatureView.create(feature);
    });

    it('It has "addScenario(view)" function to add "scenario.$render" to "feature.$render"', function() {
      var scnView = ScenarioView.create({name: 'Test Scenario 1'});
      view.addScenario(scnView);
      expect($('.feature-scenarios', view.$render)).toContainElement('.scenario');

      scnView = ScenarioView.create({name: 'Test Scenario 2'});
      scnView = ScenarioView.create({name: 'Test Scenario 3'});


    });

    it('It has "$render" element with rendered feature element', function() {
      expect(view.$render).toBeMatchedBy('.feature');

      //feature name is correctly rendered
      expect($('.feature-name', view.$render)).toContainText(feature.name);

      //scenarios views are attached
      // view.addScenarioView(scnView);
    });

    xit('"$render" element is visible only when feature.visible is true', function () {
      // TODO: this test doesn't work
    });






  });





})