define(function () {
  'use strict';
  var scenarios = [];

  function compileData (input) {
    // console.log(input);
    var data = $.parseJSON(input);
    console.log(data);

    //loop through features
    $.each(data, function (index, feature) {
      var featureName = feature.name;
      var featureTags = compileTags (feature.tags);
      var background;

      $.each(feature.elements, function (index, scenario) {
        var compiledScn;
        if(scenario.type === 'background') {
          // background = compileBackground(scenario);
        } else if (scenario.type === 'scenario') {
          compiledScn = compileScenario(scenario);
          compiledScn.tags = compiledScn.tags.concat(featureTags);
          compiledScn.feature = featureName;
          console.log(compiledScn);
        }
      });
    });


    // console.log(scenarios);
  }

  function compileBackground (background) {
    var output = {
      steps: []
    };
    $.each(background.steps, function (index, step) {
      output.steps.push( compileStep(step) );
    });
    return output;
  }

  function compileScenario (scenario) {
    return {
      name: scenario.name,
      description: scenario.description,
      steps: compileSteps(scenario.steps),
      tags: compileTags(scenario.tags)
    };
  }

  function compileTags (tags) {
    var output = [];

    $.each(tags, function (index, tag) {
      output.push(tag.name);
    });

    return output;
  }

  function compileSteps (steps) {
    var output = [];

    $.each(steps, function (index, step) {
      output.push({
        keyword: step.keyword,
        name: step.name,
        result: step.result
      });
    });

    return output;
  }

  var DataCompile = {
    readFile: function (file) {
      var fileReader = new FileReader();
      fileReader.onloadend = function (e) {
        console.log('file onloadend');
        var result = e.target.result;
        compileData(result);
      };
      fileReader.readAsText(file);
    }
  };

  return {
    init: function () {
      return Object.create(DataCompile);
    }
  };

});