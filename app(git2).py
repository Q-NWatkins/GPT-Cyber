# backend/app.py
from flask import Flask, render_template, jsonify, request
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

limiter = Limiter(key_func=get_remote_address, app=app, default_limits=["7 per minute"])

# API Keys
VIRUSTOTAL_API_KEY = "your_virustotal_api_key"
ABUSEIPDB_API_KEY = "your_abuseipdb_api_key"
NEWS_API_KEY = "your_news_api_key"
COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3"

# Home Page
@app.route("/")
def home():
    return render_template("home.html")

# Calendar Page
@app.route("/calendar")
def calendar_page():
    return render_template("calendar.html")

# About Page
@app.route("/about")
def about_page():
    return render_template("about.html")

# Crypto Page
@app.route("/crypto")
def crypto_page():
    return render_template("crypto.html")

# Get News API Endpoint
@app.route("/get-news", methods=["GET"])
@limiter.limit("7 per minute")
def get_news():
    query = request.args.get("query", "cybersecurity")
    date = request.args.get("date")
    
    params = {
        "q": query,
        "from": date,
        "to": date,
        "apiKey": NEWS_API_KEY,
        "pageSize": 5,
    }

    response = requests.get("https://newsapi.org/v2/everything", params=params)
    if response.status_code == 200:
        news_data = response.json().get("articles", [])
        return jsonify({"news": [{"title": article["title"], "url": article["url"], "source": article["source"]["name"], "publishedAt": article["publishedAt"]} for article in news_data]})
    else:
        return jsonify({"news": []}), response.status_code

# Get Crypto Data Endpoint
@app.route("/get-crypto", methods=["GET"])
@limiter.limit("7 per minute")
def get_crypto():
    response = requests.get(f"{COINGECKO_BASE_URL}/coins/markets", params={
        "vs_currency": "usd",
        "order": "market_cap_desc",
        "per_page": 10,
        "page": 1,
        "sparkline": False
    })
    if response.status_code == 200:
        crypto_data = response.json()
        return jsonify({"crypto": crypto_data})
    else:
        return jsonify({"crypto": []}), response.status_code

if __name__ == "__main__":
    app.run(debug=True)