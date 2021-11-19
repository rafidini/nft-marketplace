"""
Main module for API.
"""
# External packages
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import Collection, Optional, List
from datetime import datetime

# Internal packages
from models.nft import NFTModel
from models.crypto import CryptoModel
from models.comment import CommentModel
from crud.crud import get_nfts, get_nft, insert_nft, get_cryptos, get_crypto, insert_crypto, \
    get_comments, insert_comment
from crud.keycloak import create_new_user, login_user

# Initialize
app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

@app.get("/nfts")
def get_all_nfts(limit: Optional[int] = 10):
    nfts = get_nfts('local', limit=limit)
    return JSONResponse(status_code=200, content=nfts)

@app.get("/nft")
def get_one_nft(id: str):
    nft = get_nft('local', id)
    return JSONResponse(status_code=200, content=nft)

@app.post("/add_nft", response_description="Add new NFT", response_model=NFTModel)
def create_nft(nft: NFTModel = Body(...)):
    # Response content
    content_response = {"date": str(datetime.now())}

    # Encode the NFT
    nft = jsonable_encoder(nft)

    # Insert the NFT
    if not insert_nft('local', nft):
        # Response content
        content_response["status"] = "Failure"

        return JSONResponse(status_code=409, content=content_response)
    
    # Response content
    content_response["status"] = "Success"
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=content_response)

@app.get("/cryptos")
def get_all_cryptos(limit: Optional[int] = 10):
    nfts = get_cryptos('local', limit=limit)
    return JSONResponse(status_code=200, content=nfts)

@app.get("/crypto")
def get_one_crypto(ticker: str):
    nft = get_crypto('local', ticker)
    return JSONResponse(status_code=200 if nft is not None else 404, content=nft)

@app.post("/add_crypto", response_description="Add new crypto", response_model=CryptoModel)
def create_crypto(crypto: CryptoModel = Body(...)):
    # Response content
    content_response = {"date": str(datetime.now())}

    # Encode the NFT
    crypto = jsonable_encoder(crypto)

    # Insert the NFT
    if not insert_crypto('local', crypto):
        # Response content
        content_response["status"] = "Failure"

        return JSONResponse(status_code=409, content=content_response)
    
    # Response content
    content_response["status"] = "Success"
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=content_response)

@app.get("/comments/get")
def get_all_comments():
    comments = get_comments('local')
    return JSONResponse(status_code=200, content=comments)

@app.post("/comments/add")
def add_one_comment(comment: CommentModel = Body(...)):
    comment = jsonable_encoder(comment)

    if insert_comment('local', comment):
        return JSONResponse(status_code=201, content=comment)
    else:
        return JSONResponse(status_code=400, content="Fail to add comment.")
