Feature: Data type examples

  Background:

    Given First background step with datatable
     | data | table      |
     | in   | background |
    And Last background step

  Scenario: Inline variables

    Given When define "inline" variable
    When Define "one", "two" inline variables and even "three"
    Then Test is ok

  Scenario: Data tables

    Given Data table
      | datakey | datavalue |
      | key1    | value1    |
      | key2    | value2    |
      | key3    | <value3>  |

    When User reads this scenario
    Then Data table is correctly rendered
