import pytest
import json

from backend.app import app
from test.testhelpers import db_not_available

app.testing = True
app = app.test_client()


def test_index_response():
    response = app.get("/")
    assert response.status_code == 200


@pytest.mark.skipif(db_not_available, reason="Database not available")
def test_api_data():
    data = app.get("/api/companies").get_data(as_text=True)

    a_company = json.loads(data)[0]

    assert "company" in a_company
    assert "name" in a_company["company"]
    assert "ticker" in a_company["company"]
