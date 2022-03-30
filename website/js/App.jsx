import React from "react"
import { companies } from "./data"

export const Card = ({ company, price, news }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{company.name}</h3>
      </div>
      <div className="card-body">
        <div className="card-title">
          {company.ticker} - {price}
        </div>
        <div className="card-news">
          {news.map((item, index) => {
            return (
              <div key={index} className="card-news-item">
                <p>{item.content}</p>
                <p>{item.sentiment}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <div>
      <h1>Company Stock</h1>
      {companies.map((item, index) => {
        return <Card key={index} {...item} />;
      })}
    </div>
  );
};
