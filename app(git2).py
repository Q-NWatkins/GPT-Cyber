from flask import Flask, jsonify, request
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
import requests

app = Flask(__name__)
CORS(app)

# Replace with your actual API keys
ABUSEIPDB_API_KEY = "your_abuseipdb_api_key"
VIRUSTOTAL_API_KEY = "your_virustotal_api_key"
# start cr here

# Cached data
cached_search_results = {}

@app.route('/api/news', methods=['GET'])
def get_news():
    # For future news sources
    return jsonify([])  # Empty list

@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('query', '').strip().lower()
    if not query:
        return jsonify([])

    if query in cached_search_results:
        return jsonify(cached_search_results[query])

    search_results = []
    try:
        # Fetch details from AbuseIPDB
        print(f"Querying AbuseIPDB for: {query}")
        abuseipdb_response = requests.get(
            f'https://api.abuseipdb.com/api/v2/check?ipAddress={query}',
            headers={'Key': ABUSEIPDB_API_KEY, 'Accept': 'application/json'}
        )
        if abuseipdb_response.status_code == 200:
            abuseipdb_data = abuseipdb_response.json().get('data', {})
            search_results.append({
                'title': 'AbuseIPDB Report',
                'description': abuseipdb_data,
                'url': f'https://www.abuseipdb.com/check/{query}'
            })
            print("AbuseIPDB data received:", abuseipdb_data)
        else:
            print("Error with AbuseIPDB:", abuseipdb_response.status_code, abuseipdb_response.text)

        # Fetch threat data from VirusTotal
        print(f"Querying VirusTotal for: {query}")
        virustotal_response = requests.get(
            f'https://www.virustotal.com/api/v3/search?query={query}',
            headers={'x-apikey': VIRUSTOTAL_API_KEY}
        )
        if virustotal_response.status_code == 200:
            virustotal_data = virustotal_response.json().get('data', [])
            for item in virustotal_data[:2]:  # Limiting to 2 results
                search_results.append({
                    'title': item.get('attributes', {}).get('meaningful_name', 'VirusTotal Report'),
                    'description': item.get('attributes', {}).get('last_analysis_stats', {}),
                    'url': f'https://www.virustotal.com/gui/{item["type"]}/{item["id"]}/detection'
                })
            print("VirusTotal data received:", virustotal_data)
        else:
            print("Error with VirusTotal:", virustotal_response.status_code, virustotal_response.text)

        # Cache results
        cached_search_results[query] = search_results

    except Exception as e:
        print("Exception occurred:", e)

    return jsonify(search_results)

if __name__ == '__main__':
    app.run(debug=True)
