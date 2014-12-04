@featureTag1 @featureTag2
Feature: Base Scenario features
  !Author: Jakub Szewczyk
  !Reviewer:
  This is short description of feature



  @base @scenarioTag1
  Scenario: Steps display
    !Overview: An overview of scenario

    !Preconditions:
      - set of preconditions

    !Pass Criteria:
      - some pass criteria

    Given First given step
    And Second given step
    When First when step
    And Second when step
    Then First then step
    And Second then step

  @base @scenarioTag2
  Scenario: Scenario without steps
    !Overview: An overview of second scenario

    !Preconditions:
      - set of preconditions for second scenario

    !Pass Criteria:
      - some pass criteria