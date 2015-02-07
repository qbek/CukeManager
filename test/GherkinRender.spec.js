define(['text!tmpl/TestScenario.tmpl.html', 'text!tmpl/TestFeature.tmpl.html', 'modules/GherkinRender', 'models/ScenarioModel', 'modules/DataCompile', 'text!testdata/example.json'],
function () {

  describe('GherkinRender Module definition', function () {
    var DataCompile = require('modules/DataCompile');
    var featuresSet = DataCompile.compile(require('text!testdata/example.json'));
    var GherkinRender = require('modules/GherkinRender');

    describe('renderScenario(scenario, background, $template) function', function () {
      var $scenarioTmpl = $(require('text!tmpl/TestScenario.tmpl.html'));

      it('returns jQuery object build on $template', function () {
        var scenario = featuresSet[0].scenarios[0];
        var $render = GherkinRender.renderScenario(scenario, null, $scenarioTmpl);
        expect($render).toBeMatchedBy('div');
      });

      it('fills data-gr="scn-name" with scenario name ', function () {
        var scenario = featuresSet[0].scenarios[0];
        var $render = GherkinRender.renderScenario(scenario, null, $scenarioTmpl);
        expect($('[data-gr="scn-name"]', $render)).toContainText(scenario.name);
      });

      // it('fills data-gr="scn-status" with scenario status', function () {
      //   var scenario = featuresSet[0].scenarios[0];
      //   var $render = GherkinRender.renderScenario(scenario, null, $scenarioTmpl);
      //   expect($('[data-gr="scn-status"]', $render)).toContainText('undefined');
      // });

      it('fills data-gr="scn-tags" with scenario tags', function () {
        var scenario = featuresSet[0].scenarios[0];
        var $render = GherkinRender.renderScenario(scenario, null, $scenarioTmpl);
        expect($('[data-gr="scn-tags"]', $render)).toContainText(scenario.tags.join(' '));
      });

      it('fills data-gr="scn-description" with scenario description', function () {
        var scenario = featuresSet[0].scenarios[0];
        var $render = GherkinRender.renderScenario(scenario, null, $scenarioTmpl);
        expect($('[data-gr="scn-description"]', $render)).toContainText(scenario.description);
      });

      it('fills data-gr="scn-steps" with scenario steps', function () {
        var scenario = featuresSet[0].scenarios[0];
        var background = featuresSet[0].background;
        var $render = GherkinRender.renderScenario(scenario, background, $scenarioTmpl);
        var $steps = $('[data-gr="scn-steps"] [data-gr="scn-step"]', $render);
        expect($steps.length).toEqual(6);
        var $testStep = $steps[1];
        expect($('[data-gr="step-keyword"]', $testStep)).toContainText(scenario.steps[1].keyword);
        expect($('[data-gr="step-name"]', $testStep)).toContainText(scenario.steps[1].name);
      });

      it('fills data-gr="scn-bg-steps" with scenario background steps', function () {
        var scenario = featuresSet[1].scenarios[0];
        var background = featuresSet[1].background;
        var $render = GherkinRender.renderScenario(scenario, background, $scenarioTmpl);
        var $bg_steps = $('[data-gr="scn-bg-steps"] [data-gr="scn-step"]', $render);
        expect($bg_steps.length).toEqual(2);
        var $testStep = $bg_steps[1];
        expect($('[data-gr="step-keyword"]', $testStep)).toContainText(background[1].keyword);
        expect($('[data-gr="step-name"]', $testStep)).toContainText(background[1].name);
      });
    });

    describe('renderFeature(feature, $template) function', function () {
      var $featureTmpl = $(require('text!tmpl/TestFeature.tmpl.html'));

      it('fills data-gr="feat-name" with feature name', function () {
        var $render = GherkinRender.renderFeature(featuresSet[0], $featureTmpl);
        expect($('[data-gr="feat-name"]', $render)).toContainText(featuresSet[0].name);
      });
    });

  });
});