import React from "react";

export const App: React.FC = () => (
  <div>
    <h1>Company Stock</h1>
    <CompanyList />
  </div>
);

export const CompanyList: React.FC = () => {
  const { companies } = useCompanies();

  if (companies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="companies-list">
      {companies.map((company, index) => {
        return <CompanyCard key={index} company={company} />;
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
          {company.tickerCode} {price && " - " + price}
        </div>
        <div className="card-news">
          {news.map((item, index) => {
            return (
              <div key={index} className="card-news-item">
                <p>
                  {item.content} <SentimentEmoji sentiment={item.sentiment} />
                </p>
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
    fetch(`/api/companies`)
      .then((res) => res.json())
      .then(({ data }) => setCompanies(data.companies));
  }, []);

  return {
    companies,
  };
};

const SentimentEmoji: React.FC<{ sentiment: string }> = ({ sentiment }) => (
  <>
    {sentiment === "positive" && "🙂"}
    {sentiment === "negative" && "🙁"}
    {sentiment === "neutral" && "😐"}
  </>
);
