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
        collection.update_one({'link': nft['link']}, {"$set": {k:nft[k] for k in nft if k!="_id"}})
    else:
        # Add the NFT in database
        collection.insert_one(nft)
    
    return True

def get_cryptos(database: str, limit):
    # Connect
    client = get_client()

    # Link with the database
    database = client[database]

    # Link with the collection
    collection = database['cryptos']

    # Get NFTs
    cryptos = [ _ for _ in collection.find({}).limit(limit)]

    return cryptos

def get_crypto(database: str, ticker: str):
    # Connect
    client = get_client()

    # Link with the database
    database = client[database]

    # Link with the collection
    collection = database['cryptos']

    # Get NFTs
    crypto = [_ for _  in collection.find({'acronym':ticker}).sort("date", -1).limit(1)]

    if len(crypto) > 0:
        return crypto[0]
    else:
        return {}

def insert_crypto(database: str, crypto):
    # Connect
    client = get_client()

    # Link with the database
    database = client[database]

    # Link with the collection
    collection = database['cryptos']
    
    # Add the NFT in database
    collection.insert_one(crypto)
    
    return True

def get_comments(database: str):
    # Connect
    client = get_client()

    # Link with the database
    database = client[database]

    # Link with the collection
    collection = database['comments']

    # Get comments
    comments = [_ for _  in collection.find({})]

    return comments

def insert_comment(database: str, comment):
    # Connect
    client = get_client()

    # Link with the database
    database = client[database]

    # Link with the collection
    collection = database['comments']
    
    # Add the NFT in database
    collection.insert_one(comment)
    
    return True
