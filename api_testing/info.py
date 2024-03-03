print("Hello World!")
import requests
from requests.auth import HTTPBasicAuth




def post_PR(url, data, headers):
    response = requests.post(
        url, 
        data=data,
        headers=headers
    ) 

    return response.text

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNhbXQiLCJwYXNzd29yZCI6IiRHb29zZTAxIiwiYWRtaW4iOnRydWUsImlhdCI6MTcwNDY5MTM0MywiZXhwIjoxNzA0OTUwNTQzfQ.gtwkbRO6QGwaEKUf6rfPbPhakYckVG0EkRZujFAdg9I", 

headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNhbXQiLCJwYXNzd29yZCI6IiRHb29zZTAxIiwiYWRtaW4iOnRydWUsImlhdCI6MTcwNDY5MTM0MywiZXhwIjoxNzA0OTUwNTQzfQ.gtwkbRO6QGwaEKUf6rfPbPhakYckVG0EkRZujFAdg9I'
}

url = "http://localhost:8001/api/pr/generate-pr-number/"

data ={
    'userName': 'TEST_API',
    'supplier': "API_SUPPLIER",
    'API_SUPPLIER_CODE': 'APISTG',
    'API_NOTE': 'This is an api test'
    }

pr_array  = []
for pr in range(0, 50):
    data = post_PR(url, data, headers)
    pr_array.append(data)

print(pr_array)
    
