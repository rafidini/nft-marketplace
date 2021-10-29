import requests
import json

# CURL CMD
# curl --location --request POST 'http://localhost:8080/auth/realms/master/protocol/openid-connect/token' \
# --header 'Content-Type: application/x-www-form-urlencoded' \
# --data-urlencode 'grant_type=client_credentials' \
# --data-urlencode 'client_id=admin-cli' \
# --data-urlencode 'client_secret=???'
client_secret = 'ebcb2930-8e9b-49a9-bd23-ceb8644b3083'
res = requests.post(
    'http://localhost:8080/auth/realms/master/protocol/openid-connect/token',
    headers={'Content-Type': 'application/x-www-form-urlencoded'},
    data={
        'grant_type': 'client_credentials',
        'client_id': 'admin-cli',
        'username': 'admin',
        'password': 'admin',
        'grant_type': 'password',
        'client_secret': client_secret
    }
)
print(f"POST Request no. 1 [{res.status_code} - {res.reason}] : {res.json()}")

if res.reason.lower() != 'ok':
    print(f"Fail - {res.json().get('error_description')}")
    exit()

access_token = res.json()['access_token']
token_type = res.json()['token_type']

# CURL CMD
# curl --location --request POST 'http://localhost:8080/auth/admin/realms/nftmarketplace/users' \
# --header 'Content-Type: application/json' \
# --header 'Authorization: Bearer {token}' \
# --data-raw '{"firstName":"{}","lastName":"{}", "email":"{}", "enabled":"true", "username":"{}"}'
headers = {'Content-Type': 'application/json', 'Authorization': f'{token_type} {access_token}'}
data = { "username":"jojob", "email":"jojo.bizarre@gmail.com", "firstName":"bizarre",
    "lastName":"bizarre", "enabled":"true",
}

res = requests.post(
    'http://localhost:8080/auth/admin/realms/nftmarketplace/users',
    headers=headers,
    data=json.dumps(data)
)

print()
try:
    print(f"POST Request no. 2 keys : {res.json().keys()}")
except:
    pass

print(f"POST Request no. 2 [{res.status_code} - {res.reason}] :\nJSON: {res.json()}")
