define(['models/TestSetModel'], function (TestSetModel) {

  describe('TestSet Model', function () {

    it('factory TesSetModel.create() create new TestSet', function () {
      // var features = {test1:1};
      var testModel = TestSetModel.create();
      expect(testModel.features).toEqual([]);
      expect(testModel.desc.executorName).toBe(null);
      expect(testModel.desc.moduleUnderTest).toBe(null);
      expect(testModel.desc.verUnderTest).toBe(null);
      expect(testModel.desc.testType).toBe(null);
    });

    describe('public functions', function () {
      it('setDescription(name, module, ver, type) - sets description details', function () {
        var testModel = TestSetModel.create({});

        var executorName = 'Jan Kowalski';
        var moduleUnderTest = 'Module under test';
        var verUnderTest = 'version 1.2.12.4b';
        var testType = 'test type';

        testModel.setDescription(executorName, moduleUnderTest, verUnderTest, testType);
        expect(testModel.desc.executorName).toBe(executorName);
        expect(testModel.desc.moduleUnderTest).toBe(moduleUnderTest);
        expect(testModel.desc.verUnderTest).toBe(verUnderTest);
        expect(testModel.desc.testType).toBe(testType);
      });

      it('setDescription(descObj) - sets description details', function () {
        var testModel = TestSetModel.create();
        var description = {
          executorName: 'Jan Kowalski',
          moduleUnderTest: 'Module under test',
          verUnderTest: 'version 1.2.12.4b',
          testType: 'test type',
        };

        testModel.setDescription(description);
        expect(testModel.desc).toEqual(description);
      });

      it('createNewFeature(name|obj) - creates and returns new feature object', function () {
        var testModel = TestSetModel.create();
        var feature = testModel.createNewFeature('Test feature');
        expect(feature.name).toEqual('Test feature');
      });

      it('addFeature(feature) - adds feature to TestSet\'s feature table', function () {
        var testModel = TestSetModel.create();
        var feature = testModel.createNewFeature('Test feature 1');
        testModel.addFeature(feature);
        feature = testModel.createNewFeature('Test feature 2');
        testModel.addFeature(feature);
        feature = testModel.createNewFeature('Test feature 3');
        testModel.addFeature(feature);

        expect(testModel.features.length).toEqual(3);
        expect(testModel.features[0].name).toEqual('Test feature 1');
        expect(testModel.features[1].name).toEqual('Test feature 2');
        expect(testModel.features[2].name).toEqual('Test feature 3');
      });
    });

    describe('properties', function () {
      it('stats - contains statistics for test set', function () {
        //prepare mock data
        var feat_1 = {stats: {pass: 0, fail: 3, norun: 4, undef: 0}};
        var feat_2 = {stats: {pass: 1, fail: 2, norun: 3, undef: 4}};
        var feat_3 = {stats: {pass: 3, fail: 1, norun: 0, undef: 0}};

        var testModel = TestSetModel.create();
        testModel.addFeature(feat_1);
        expect(testModel.stats).toEqual({pass: 0, fail: 3, norun: 4, undef: 0});
        testModel.addFeature(feat_2);
        expect(testModel.stats).toEqual({pass: 1, fail: 5, norun: 7, undef: 4});
        testModel.addFeature(feat_3);
        expect(testModel.stats).toEqual({pass: 4, fail: 6, norun: 7, undef: 4});
      });
    });
  });

});