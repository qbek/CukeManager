define(['views/ScenarioView', 'models/FeatureModel', 'views/FeatureView', 'ctrls/FeatureCtrl'], function (ScenarioView, FeatureModel, FeatureView, FeatureCtrl) {

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

  describe('Feature View', function () {
    var feature;
    var view;

    beforeEach(function () {
      feature = FeatureModel.create('Test Feature name');
      feature.setTags(['@featureTag1', '@featureTag2']);
      feature.setDescription('Example description');
      view = FeatureView.create(feature);
    });

    it('It has "$render" element with fully rendered feature element', function() {
      expect(view.$render).toBeMatchedBy('.feature');

      //feature name is correctly rendered
      expect($('.feature-name', view.$render)).toContainText(feature.name);
      //feature tags are correctly rendered
      expect($('.feature-tags', view.$render)).toContainText('@featureTag1 @featureTag2');
      //feature description is correctly rendered
      expect($('.feature-description', view.$render)).toContainText('Example description');

      //scenarios views are attached
      // view.addScenarioView(scnView);
    });

    it('It has "addScenario(view)" function to add "scenario.$render" to "feature.$render"', function() {
      var scnView = ScenarioView.create({name: 'Test Scenario 1'});
      view.addScenario(scnView);
      expect($('.feature-scenarios', view.$render)).toContainElement('.scenario');

      scnView = ScenarioView.create({name: 'Test Scenario 2'});
      scnView = ScenarioView.create({name: 'Test Scenario 3'});
    })

    xit('"$render" element is visible only when feature.visible is true', function () {
      // TODO: this test doesn't work
    });






  });





})