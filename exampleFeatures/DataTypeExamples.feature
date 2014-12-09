Feature: Data type examples

  Scenario: Inline variables

    Given When define "inline" variable
    When Define "one", "two" inline variables and even "three"
    Then Test is ok

  Scenario: Data tables

    Given Data table
      | datakey | datavalue |
      | key1    | value1    |
      | key2    | value2    |
      | key3    | value3    |
    When User reads this scenario
    Then Data table is correctly rendered
