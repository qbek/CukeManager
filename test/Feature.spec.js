define(['models/ScenarioModel', 'models/FeatureModel', 'views/FeatureListView', 'ctrls/FeatureCtrl'], function (ScenarioModel, FeatureModel, FeatureView, FeatureCtrl) {

  describe('Feature Model', function () {
    var feature;

    beforeEach(function () {
      feature = FeatureModel.create('Test Feature name');
    });

    it('has "name" with name of the feature', function () {
      expect(feature.name).toEqual('Test Feature name');
    });

    it('has "visible" set to true by default', function () {
      expect(feature.visible).toEqual(true);
    });

    it('has "tags" set to null by default', function () {
      expect(feature.tags).toBe(null);
    })

    it('It has "scenarios[]" table for Scenario models', function () {
      expect(feature.scenarios).toBeDefined();
      expect(feature.scenarios.length).toBe(0);
    });

    it('It has "setTags(tags[])" function which updates "tags" property', function () {
      expect(feature.setTags).toBeDefined();
      var tags = ['@tag1', '@tag2'];
      feature.setTags(tags);

      expect(feature.tags).toEqual(tags);
    });

    it('has "setDescription()" function with sets "description" property', function () {
      var desc = 'Example description';
      //check if user cannot set property using =
      feature.description = "New description";
      expect(feature.description).toEqual(null);
      //check if function sets correctly property
      feature.setDescription(desc);
      expect(feature.description).toEqual(desc);
    })

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

    it('has "setScenarioTags(id, tagsArray)" function which sets scenario tags', function () {
      var idOne = feature.addScenario('Test Scenario 1');
      var idTwo = feature.addScenario('Test Scenario 2');
      feature.setScenarioTags(idOne, ['tag11', 'tag12']);
      feature.setScenarioTags(idTwo, ['tag21', 'tag22', 'tag23']);

      expect(feature.scenarios[0].tags).toEqual(['tag11', 'tag12']);
      expect(feature.scenarios[1].tags).toEqual(['tag21', 'tag22', 'tag23']);
    });

    it('setScenarioSteps(id, stepsArray) - sets scenario steps', function () {
      feature.addScenario('Test Scenario 1');
      var idTwo = feature.addScenario('Test Scenario 2');
      var steps = [{ name: 'Name 1', keyword: 'Given', result: 'undefined'},
                   { name: 'Name 2', keyword: 'When', result: 'undefined'}];

      feature.setScenarioSteps(idTwo, steps);
      expect(feature.scenarios[1].steps).toEqual(steps);
    });

    it('setScenarioDescription(id, description) - sets scenario description', function () {
      feature.addScenario('Test Scenario 1');
      feature.addScenario('Test Scenario 2');
      var desc = 'Example description';
      feature.setScenarioDescription(1, desc);
      expect(feature.scenarios[1].description).toEqual(desc);
    })

  });

  describe('FeatureListView module', function () {

    describe('FeatureView object created by createFeatureView(featureModel) function', function() {
      var feature;

      beforeEach(function () {
        feature = FeatureModel.create('Test Feature name');
        feature.setTags(['@featureTag1', '@featureTag2']);
        feature.setDescription('Example description');
        view = FeatureView.createFeatureView(feature);
      });

      it('It has "$render" element with fully rendered feature element', function() {
        expect(view.$render).toBeMatchedBy('.feature');
        //feature name is correctly rendered
        expect($('.feature-name', view.$render)).toContainText(feature.name);
        //feature tags are correctly rendered
        expect($('.feature-tags', view.$render)).toContainText('@featureTag1 @featureTag2');
        //feature description is correctly rendered
        expect($('.feature-description', view.$render)).toContainText('Example description');
      });

      it('It has "addScenario(view)" function to add "scenario.$render" to "feature.$render"', function() {
        var scnView = FeatureView.createScenarioView({name: 'Test Scenario 1'});
        view.addScenario(scnView);
        expect($('.feature-scenarios', view.$render)).toContainElement('.scenario');

        scnView = FeatureView.createScenarioView({name: 'Test Scenario 2'});
        scnView = FeatureView.createScenarioView({name: 'Test Scenario 3'});
      });

      it('toggleScenario() - toggles class .feature-scenarios-hidden on .feature-scenario element', function () {
        expect($('.feature-scenarios', view.$render)).not.toHaveClass('feature-scenarios-hidden');
        view.toggleScenarios();
        expect($('.feature-scenarios', view.$render)).toHaveClass('feature-scenarios-hidden');
        view.toggleScenarios();
        expect($('.feature-scenarios', view.$render)).not.toHaveClass('feature-scenarios-hidden');
      })
    });

    describe('ScenarioView object created by createScenarioView(scenarioModel, featureId, scenarioId) function', function() {
      var scenario;
      var view;

      beforeEach(function () {
        scenario = ScenarioModel.create('Test name');
        scenario.setTags(['scnTag1', 'scnTag2']);
        scenario.setDescription('Example description');
        view = FeatureView.createScenarioView(scenario, 1, 1);
      });

      it('It has "$render" with rendered scenario element', function () {
        expect(view.$render).toBeDefined();
        expect(view.$render).toBeMatchedBy('.scenario');
        //renders scenario name
        expect($('.scenario-name', view.$render)).toContainText(scenario.name);
        //renders scenario tags
        expect($('.scenario-tags', view.$render)).toContainText('scnTag1 scnTag2');
        //renders scenario description
        expect($('.scenario-description', view.$render)).toContainText('Example description');
        //renders scenario status
        expect($('.scenario-status', view.$render)).toContainText('undefined');
        //adds data-featureid and data-scenarioid attr to .feature-label element
        expect($('.scenario-label', view.$render)).toHaveAttr('data-featureid', '1');
        expect($('.scenario-label', view.$render)).toHaveAttr('data-scenarioid', '1');
      });
    });

  });
});