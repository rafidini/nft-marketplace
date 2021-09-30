import pymongo
from pymongo import MongoClient

def get_client():
    # Connect to MongoDB
    client = MongoClient('mongodb://mongodb:27017/')
    return client

def get_nfts(database: str, limit):
    # Connect
    client = get_client()

    # Link with the database
    database = client[database]

    # Link with the collection
    collection = database['nfts']

    # Get NFTs
    nfts = [ _ for _ in collection.find({}).sort("date", pymongo.DESCENDING).limit(limit)]

    return nfts

def get_nft(database: str, id: str):
    # Connect
    client = get_client()

    # Link with the database
    database = client[database]

    # Link with the collection
    collection = database['nfts']

    # Get NFTs
    nft = collection.find_one({'_id':id})

    return nft

def insert_nft(database: str, nft):
    # Connect
    client = get_client()

    # Link with the database
    database = client[database]

    # Link with the collection
    collection = database['nfts']

    # Check if NFT is already in database
    if collection.find_one({'link': nft['link']}) is not None:
        return False
    
    # Add the NFT in database
    collection.insert_one(nft)
    
    return True
