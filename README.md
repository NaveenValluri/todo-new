# CRON EXPRESSION PARSER

## Description

command line application or script which parses a cron string and expands each field
to show the times at which it will run. 

The output should be formatted as a table with the field name taking the first 14 columns and
the times as a space-separated list following it.

For eg:
* For "*/15 0 1,15 * 1-5 /usr/bin/find"
* Response should be </br>
    minute 0 15 30 45</br>
    hour 0</br>
    day of month 1 15</br>
    month 1 2 3 4 5 6 7 8 9 10 11 12</br>
    day of week 1 2 3 4 5</br>
    command /usr/bin/find</br>

## Prerequisite

* Ruby 2.5.7 or above

## Instructions

* Navigate to deliveroo_coding_task folder
* run command 
  <pre>ruby run.rb "1 1 1 1 1 command"</pre>
* For test cases, run
  <pre>ruby cron_expression_parser_test.rb</pre>
