"""
Keycloak users management
=========================

....
"""
# External packages
import requests
import json

# Constants for token generation
CLIENT_SECRET = 'ebcb2930-8e9b-49a9-bd23-ceb8644b3083'
TOKEN_URL = 'http://auth:8080/auth/realms/master/protocol/openid-connect/token'
TOKEN_HEADERS = {'Content-Type': 'application/x-www-form-urlencoded'}
TOKEN_DATA = {
    'grant_type': 'client_credentials',
    'client_id': 'admin-cli',
    'username': 'admin',
    'password': 'admin',
    'grant_type': 'password',
    'client_secret': CLIENT_SECRET
}
USER_URL = 'http://auth:8080/auth/admin/realms/nftmarketplace/users'

# Functions
def get_access_token() -> dict:
    """
    Get the admin token access.

    Returns:
    ========
        (dict) the response to the token generation
    """
    # POST request
    res = requests.post(
        TOKEN_URL,
        headers=TOKEN_HEADERS,
        data=TOKEN_DATA
    )

    return res.json()

def generate_header_user_creation(token_type: str, access_token: str) -> dict:
    """
    Generate a header for user creation post.

    Parameters:
    ===========
        token_type (str) : Type of the token
        access_token (str) : Token value
    
    Returns:
    ========
        (dict) dictonary representing a REST API header
    """
    headers = {
        'Content-Type': 'application/json', 
        'Authorization': f'{token_type} {access_token}'
    }

    return headers

def create_new_user(user) -> bool:
    """
    Create a user with the given attribute.

    Parameters:
    ===========
        user (dict) : User representation
    
    Returns:
    ========
        (bool) True if user was created otherwise False
    """
    # Response to token generation
    response_token = get_access_token()
    access_token = response_token['access_token']
    token_type = response_token['token_type']

    # Prepare user creation request
    user_headers = generate_header_user_creation(token_type, access_token)
     
    # Request for user creation
    user_dict = dict(user)
    response_user = requests.post(
        USER_URL,
        headers=user_headers,
        data=json.dumps(user_dict)
    )
    print("RES ->",response_user.text)

    # Check if response if 201 (successful)
    return response_user.status_code == 201
