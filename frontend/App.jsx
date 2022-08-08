import React from "react"

export const App = () => {
  return (
    <div>
      <h1>Company Stock</h1>
      <CompanyList />
    </div>
  );
};

export const CompanyList = () => {
  const { companies } = useCompanies();

  if (companies.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="companies-list">
      {companies.map((item, index) => {
        return <CompanyCard key={index} {...item} />;
      })}
    </div>
  );
};

export const CompanyCard = ({ company, price = null, news = [] }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{company.name}</h3>
      </div>
      <div className="card-body">
        <div className="card-title">
          {company.ticker} {price && " - " + price}
        </div>
        <div className="card-news">
          {news.map((item, index) => {
            return (
              <div key={index} className="card-news-item">
                <p>{item.content} <SentimentEmoji sentiment={item.sentiment} /></p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --

const useCompanies = () => {
  const [companies, setCompanies] = React.useState([]);

  React.useEffect(() => {
    fetch(`${process.env.API_URL}/api/companies`)
      .then(res => res.json())
      .then(data => setCompanies(data));
  }, []);

  return {
    companies
  }
}


const SentimentEmoji = ({sentiment}) => {
  switch (sentiment) {
    case "positive": return "🙂"
    case "negative": return "🙁"
    case "neutral": return "😐"
  }
}
