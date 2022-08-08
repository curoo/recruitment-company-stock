CREATE TABLE "public"."User" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  passcode VARCHAR(4) NOT NULL
);

CREATE TABLE "public"."Company" (
  id SERIAL PRIMARY KEY NOT NULL,
  tickerCode VARCHAR NOT NULL,
  name VARCHAR NOT NULL
);

INSERT INTO "public"."Company"
  (tickerCode, name)
  VALUES
  ('GOOG', 'Google'),
  ('MSFT', 'Microsoft Corporation'),
  ('APPL', 'Apple Inc'),
  ('NFLX', 'Netflix Inc'),
  ('TEAM', 'Atlassian Corporation PLC'),
  ('DELL', 'Dell Technologies Inc');

SELECT * FROM "public"."Company";
