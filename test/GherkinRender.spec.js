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

      it('removes "div.scenario-background" when background doesn\'t exists', function () {
        var scenario = featuresSet[1].scenarios[0];
        $render = GherkinRender.renderScenario(scenario, null, $scenarioTmpl);
        expect($render).not.toContainElement('div.scenario-background');
      });
    });

    describe('renderFeature(feature, $template) function', function () {
      var $featureTmpl = $(require('text!tmpl/TestFeature.tmpl.html'));
      //contain all Feature description elements
      var $render_fullDesc = GherkinRender.renderFeature(featuresSet[0], $featureTmpl);
      //doesn't contains Feature description elements
      var $render_noDesc = GherkinRender.renderFeature(featuresSet[1], $featureTmpl);

      it('fills data-gr="feat-name" with feature name', function () {
        expect($('[data-gr="feat-name"]', $render_fullDesc)).toContainText(featuresSet[0].name);
      });

      // it('fills data-gr="feat-description" with feature description', function () {
      //   expect($('[data-gr="feat-description"]', $render)).toContainText(featuresSet[0].description);
      // });

      it('fills data-gr="feat-author" with feature author', function () {
        expect($('[data-gr="feat-author"]', $render_fullDesc)).toContainText(featuresSet[0].author);
        //element is removed when author is null
        expect($render_noDesc).not.toContainElement('div.feature-author');
      });

      it('fills data-gr="feat-reviewer" with feature reviewer', function () {
        expect($('[data-gr="feat-reviewer"]', $render_fullDesc)).toContainText(featuresSet[0].reviewer);
        //element is removed when reviewer is null
        expect($render_noDesc).not.toContainElement('div.feature-reviewer');
      });

      it('fills data-gr="feat-overview" with feature overview', function () {
        expect($('[data-gr="feat-overview"]', $render_fullDesc).html()).toEqual(featuresSet[0].overview.replace(/\n/g, '<br>'));
        //element is removed when overview is null
        expect($render_noDesc).not.toContainElement('div.feature-overview');
      });

      it('fills data-gr="feat-preconditions" with feature preconditions', function () {
        expect($('[data-gr="feat-preconditions"]', $render_fullDesc).html()).toEqual(featuresSet[0].preconditions.replace(/\n/g, '<br>'));
        //element is removed when preconditions is null
        expect($render_noDesc).not.toContainElement('div.feature-preconditions');
      });



    });

  });
});