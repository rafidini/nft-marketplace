"""
Module for testing purpose.
"""
import requests
import json
import time

filename = "data.json"

with open(filename, 'r') as f:
    data = json.load(f)

success = 0
failures = 0

for nft in data:
    # Quick processing
    del nft['id']
    amount, currency = nft['amount'].split(' ')
    nft['amount'] = float(amount)
    nft['currency'] = currency
    nft['date'] = 'idk'

    # Request
    url = 'http://api:8000/add_nft'
    headers = {'accept': 'application/json', 'Content-Type': 'application/json'}
    response = requests.post(url, data=json.dumps(nft), headers=headers)
    success += 1 if response.status_code == 201 else 0
    failures += 1 if response.status_code != 201 else 0

print(f"Total    : {len(data)}")
print(f"Success  : {success}")
print(f"Failures : {failures}")