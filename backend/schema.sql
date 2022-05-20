/* CREATE DATABASE company; */

CREATE TABLE companies (
  id SERIAL,
  tickerCode VARCHAR NOT NULL,
  name VARCHAR NOT NULL
);

INSERT INTO companies
  (tickerCode, name)
  VALUES
  ('GOOG', 'Google'),
  ('MSFT', 'Microsoft Corporation'),
  ('APPL', 'Apple Inc'),
  ('NFLX', 'Netflix Inc'),
  ('TEAM', 'Atlassian Corporation PLC'),
  ('DELL', 'Dell Technologies Inc');

SELECT * FROM companies;