import requests
import json

url = "http://localhost:8000"
input_data = "What is 1+1?"

headers = {
    "Content-Type": "application/json"
}

# Construct the body payload
payload = {
    "message": input_data
}

# Send the POST request
response = requests.post(url, headers=headers, data=json.dumps(payload))

# Print the response (optional)
print(response.status_code)
print(response.json())  # assuming the response is JSON formatted
