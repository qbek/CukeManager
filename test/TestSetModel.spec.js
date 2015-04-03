define(['models/TestSetModel'], function (TestSetModel) {

  describe('TestSet Model', function () {

    it('factory TesSetModel.create(features) create new TestSet', function () {
      var features = {test1:1};
      var testModel = TestSetModel.create(features);
      expect(testModel.features).toBe(features);
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
        var testModel = TestSetModel.create({});
        var description = {
          executorName: 'Jan Kowalski',
          moduleUnderTest: 'Module under test',
          verUnderTest: 'version 1.2.12.4b',
          testType: 'test type',
        };

        testModel.setDescription(description);
        expect(testModel.desc).toEqual(description);
      });
    });

    describe('properties', function () {
      it('stats - contains statistics for test set', function () {
        //prepare mock data
        var feat_1 = {stats: {pass: 0, fail: 3, norun: 4, undef: 0}};
        var feat_2 = {stats: {pass: 1, fail: 2, norun: 3, undef: 4}};
        var feat_3 = {stats: {pass: 3, fail: 1, norun: 0, undef: 0}};

        var features = [];
        features.push(feat_1);
        var testModel = TestSetModel.create(features);
        expect(testModel.stats).toEqual({pass: 0, fail: 3, norun: 4, undef: 0});

        features.push(feat_2);
        testModel = TestSetModel.create(features);
        expect(testModel.stats).toEqual({pass: 1, fail: 5, norun: 7, undef: 4});

        features.push(feat_3);
        testModel = TestSetModel.create(features);
        expect(testModel.stats).toEqual({pass: 4, fail: 6, norun: 7, undef: 4});
      });
    });
  });

});