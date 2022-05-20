from flask import Flask, jsonify, render_template

from backend.db import get_company_list, get_session


app = Flask(
    __name__,
    static_folder="../static",
    template_folder="../templates"
)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/companies")
def data():
    session = get_session()
    companies = get_company_list(session)

    api_response = [
        {
            "company": {"name": company.name, "ticker": company.tickercode},
        }
        for company in companies
    ]

    return jsonify(api_response)


if __name__ == "__main__":
    app.run()
