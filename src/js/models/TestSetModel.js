  /**
  * TestSet Model description
  *
  * @module TestSetModel
  */
define(['models/TE_FeatureModel'], function (FeatureModel) {


  /**
  * TestSet Model
  * @constructs TestSet
  * @alias module:TestSetModel
  * @param {} features - table of features for TestSet
  */
  function TestSet () {
    /** feature list of this TestSet */
    this.features = [];

    /** description */
    this.desc = {
      executorName: null,
      moduleUnderTest: null,
      verUnderTest: null,
      testType: null
    };

    Object.defineProperty(this, 'stats', {
      get: function () {
        var stats = {pass: 0, fail: 0, norun: 0, undef: 0};
        this.features.forEach(function (feature) {
          var featStats = feature.stats;
          for (var stat in featStats) {
            stats[stat] += featStats[stat];
          }
        });
        return stats;
      }
    });

  }

  $.extend(TestSet.prototype, {
    /**
    * sets description properties of Test Set
    * @param {String} name - name of Test Set executor
    * @param {String} module - name of module under test
    * @param {String} ver - version of software under test
    * @param {String} type - type of tests
    * or
    * @param {object} description - description object
    */

    setDescription: function () {
      if ($.type(arguments[0]) == 'object') {
        //passed description object
        this.desc = arguments[0];
      } else {
        var desc = this.desc;
        desc.executorName = arguments[0];
        desc.moduleUnderTest = arguments[1];
        desc.verUnderTest = arguments[2];
        desc.testType = arguments[3];
      }
    },

    /**
    * Creates new Feature object
    * @param {String | Object} data - name of new feature, or plain object with feature details
    * @returns {Feature}  - new feature object
    */
    createNewFeature: function (data) {
      return FeatureModel.create(data);
    },

    /**
    * Addes feature to Test Set
    * @param {Feature} feature - feature object
    */
    addFeature: function (feature) {
      this.features.push(feature);
    }
  });

  return {
    create: function (features) {
      return new TestSet(features);
    }
  };
});