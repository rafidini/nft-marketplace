import requests

# CURL CMD
# curl --location --request POST 'http://localhost:8080/auth/realms/master/protocol/openid-connect/token' \
# --header 'Content-Type: application/x-www-form-urlencoded' \
# --data-urlencode 'grant_type=client_credentials' \
# --data-urlencode 'client_id=admin-cli' \
# --data-urlencode 'client_secret=???'
res = requests.post(
    'http://localhost:8080/auth/realms/master/protocol/openid-connect/token',
    headers={'Content-Type': 'application/x-www-form-urlencoded'},
    data={
        'grant_type': 'client_credentials',
        'client_id': 'admin-cli',
        'username': 'admin',
        'password': 'admin',
        'grant_type': 'password',
        'client_secret': '13f56628-83ab-49bd-8c79-4df0409607f0'
    }
)
print(f"POST Request [{res.status_code} - {res.reason}] : {res.json()}")

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
res = requests.post(
    'http://localhost:8080/auth/admin/realms/nftmarketplace/users',
    headers={
        'Authorization': f'{token_type} {access_token}',
        'Content-Type': 'application/json'
    },
    data={
        "username":"mweah",
        "email":"meh.bwah@gmail.com",
        "firstName":"Meh",
        "lastName":"Bwah",
        "enabled":"true",
        "emailVerified": "false",
    }
)

print()
print(f"POST Request [{res.status_code} - {res.reason}] : {res.json()}")
