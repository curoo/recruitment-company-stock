from flask import Flask, jsonify, request, render_template

app = Flask(__name__, static_folder="./static", template_folder="./templates")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/data")
def data():
    return jsonify([{"price": "100"}, {"price": "200"}])


if __name__ == "__main__":
    app.run()
