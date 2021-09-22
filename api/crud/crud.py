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
    nfts = [ _ for _ in collection.find({}).limit(limit)]

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
