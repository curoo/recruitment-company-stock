import json
from website.app import app

app.testing = True
app = app.test_client()


def test_api_data():
    data = app.get("/api/data").get_data(as_text=True)
    assert "price" in json.loads(data)[0]


def test_index_response():
    response = app.get("/")
    assert response.status_code == 200
