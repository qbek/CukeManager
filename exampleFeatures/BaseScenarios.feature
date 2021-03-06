@featureTag1 @featureTag2
Feature: Base Scenario features with "quote" and <tag>
  !Author: Jakub Szewczyk
  !Reviewer: Jan Kowalski

  !Overview:
  This is short description of feature
  This short description is multi line

  !Preconditions:
  - Global precondition for all scenarios
  - Another global precondition

  @base @scenarioTag1
  Scenario: Steps display with "quote" and <tag>
    !Overview:
      An overview of scenario
      with multi line text

    !Preconditions:
      - set of preconditions
      - required for scenario

    !Pass Criteria:
      - pass criteria
      - extra pass criteria

    Given First given step with "quote" and <tag>
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

    Given test

  Scenario Outline: Scenario outline example
  
    Given Given with <inline>
    When When with "<quoted>"
    Then Then with datatable
      | <table> |
  
    Examples:
      | inline | quoted | table | description |
      | 1      | 2      | 3     | numbers     |
      | one    | two    | three | strings     |
