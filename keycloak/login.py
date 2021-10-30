import requests
import json

# CURL CMD
# curl --location --request POST 'http://localhost:8080/auth/realms/master/protocol/openid-connect/token' \
# --header 'Content-Type: application/x-www-form-urlencoded' \
# --data-urlencode 'grant_type=client_credentials' \
# --data-urlencode 'client_id=admin-cli' \
# --data-urlencode 'client_secret=???'
client_secret = 'd12490ac-5cbf-42bc-89b7-ad090c60ccb9'
username = 'loic'
res = requests.post(
    'http://localhost:8080/auth/realms/nftmarketplace/protocol/openid-connect/token',
    headers={'Content-Type': 'application/x-www-form-urlencoded'},
    data={
        'grant_type': 'client_credentials',
        'client_id': 'admin-cli',
        'username': username,
        'password': 'password',
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

headers = {'Content-Type': 'application/json', 'Authorization': f'{token_type} {access_token}'}

res = requests.get(
    'http://localhost:8080/auth/admin/realms/nftmarketplace/users',
    headers=headers,
)

print('', 'Status code: ' + str(res.status_code), sep='\n')
try:
    print(f"POST Request no. 2 keys : {res.json().keys()}")
except:
    pass

if False:
    users = res.json()
    users_filtered = filter(lambda user: user['username'] == username, users)
    print(list(users_filtered)[0])
    print(f'{username} does{" " if len(users) > 0 else "not "}exist in the database.')

#print(f"POST Request no. 2 [{res.status_code} - {res.reason}] :\nJSON: {res.json()}")

