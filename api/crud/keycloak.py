"""
Keycloak users management
=========================

....
"""
# External packages
import requests
import json

# Constants for token generation
TOKEN_CLIENT_SECRET = 'ebcb2930-8e9b-49a9-bd23-ceb8644b3083'
TOKEN_URL = 'http://auth:8080/auth/realms/master/protocol/openid-connect/token'
TOKEN_HEADERS = {'Content-Type': 'application/x-www-form-urlencoded'}
TOKEN_DATA = {
    'grant_type': 'client_credentials',
    'client_id': 'admin-cli',
    'username': 'admin',
    'password': 'admin',
    'grant_type': 'password',
    'client_secret': TOKEN_CLIENT_SECRET
}
USER_URL = 'http://auth:8080/auth/admin/realms/nftmarketplace/users'

# Constants for user login
LOGIN_CLIENT_SECRET = 'd12490ac-5cbf-42bc-89b7-ad090c60ccb9'
LOGIN_URL = 'http://auth:8080/auth/realms/nftmarketplace/protocol/openid-connect/token'
LOGIN_HEADERS = {'Content-Type': 'application/x-www-form-urlencoded'}


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
        (dict) dictonary representing a REST API header for user creation
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
        user (dict-like) : User representation
    
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

    # Check if response if 201 (successful)
    return response_user.status_code == 201

def generate_data_user_login(username: str, password: str) -> dict:
    """
    Generate a data dictionary for user login.

    Parameters:
    ===========
        username (str) : username
        password (str) : user's password
    
    Returns:
    ========
        (dict) dictonary representing a REST API data for user login
    """
    data = {
        'grant_type': 'client_credentials',
        'client_id': 'admin-cli',
        'username': username,
        'password': password,
        'grant_type': 'password',
        'client_secret': LOGIN_CLIENT_SECRET
    }

    return data

def login_user(username: str, password: str) -> bool:
    """
    Launch a POST request to check user credentials and allow login.

    Parameters:
    ===========
        username (str) : username
        password (str) : user's password
    
    Returns:
    ========
        (bool) return True if the login was successful otherwise False
    """
    # Prepare POST request
    data = generate_data_user_login(username, password)

    # POST request for user login
    res = requests.post(
        LOGIN_URL,
        headers=LOGIN_HEADERS,
        data=data
    )

    # Check status code
    return res.status_code == 200
