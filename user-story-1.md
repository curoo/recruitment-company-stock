# Objective

Create a web application to display the following information about a company:

- Company name
- Stock ticker code
- Stock price
- The two most recent news stories
- The sentiment (positive, negative or neutral) of each news story

We have created some APIs to help you with the task, but you will need to write code that calculates the sentiment based on the rules in this document.

# UI

The application should display the information in a 'card' format. The design is up to you but the card should roughly look like this:

![example](https://i.imgur.com/hcSubsi.jpg)

This is only a guide. Feel free to deviate from the mockup as long as you present the information in a user-friendly way.

# Data

## Ticker Code Lookup

A Postgres database exists that contains company names and ticker codes.

Schema and sample dataset:

```sql
INSERT INTO companies
  (tickerCode, name)
  VALUES
  ('GOOG', 'Google'),
  ('MSFT', 'Microsoft Corporation'),
  ('NFLX', 'Netflix Inc'),
  ('TEAM', 'Atlassian Corporation PLC');
```

## Stock Price

The stock price is available as a JSON document at:

`https://dev.expend.io/company/{company_ticker_code}`

For example, a call to `https://dev.expend.io/company/GOOG`
might return

```json
{
  "tickerCode": "GOOG",
  "latestPrice": 54407,
  "priceUnits": "GBP:pence",
  "asOf": "2015-05-06T15:05:59.912Z",
  "storyFeed": [
    {
      "id": 74,
      "headline": "Google going strong, but maybe not for long.",
      "body": "Google has some concerns to address the balance of this year, and beyond. Over the long run, the consensus analyst recommendation for Google as a 'strong buy' is warranted as the company continues driving a healthy double-digit top line growth. But that doesn't mean there won't be a hurdle, or three, to overcome along the way."
    },
    {
      "id": 141,
      "headline": "Ad revenues still primary source of Google revenue.",
      "body": "Investors were encouraged by a healthy gain in the number of people looking at Google's ads, even as the average prices for those marketing messages extended a three-and-half year slump. The market also had been bracing for more disappointing numbers, triggering a 'relief rally' when the results weren't as bad as feared, BGC Partners analyst Colin Gillis said."
    }
  ]
}
```

See [Stock Price dataset](./stock-price.json)

# Story Sentiment Analysis

Each story should be assigned a positivity score - its formula is:

`positivity = positive_word_count - negative_word_count`

- `positive_word_count` is the number of times a positive word appears in the article body
- `negative_word_count` is the number of times a negative word appears in the article body
- If the value of `positivity` is less than 2, the sentiment analysis is _neutral_.
- If `positivity` is positive, the sentiment analysis is _positive_.
- If `positivity` is negative, the sentiment analysis is _negative_.

Positive words: positive, success, grow, gains, happy, healthy

Negative words: disappointing, concerns, decline, drag, slump, feared

Calculate each story's sentiment analysis and display it next to the story headline in the card.

# What Now?

- Ask any questions
- `git clone https://github.com/curoo/recruitment-company-stock`
- Start pairing!
