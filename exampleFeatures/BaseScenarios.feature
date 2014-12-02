@featureTag1 @featureTag2
Feature: Base Scenario features

  @base @scenarioTag1
  Scenario: Steps display
    Given First given step
    And Second given step
    When First when step
    And Second when step
    Then First then step
    And Second then step

  @base @scenarioTag2
  Scenario: Scenario without steps