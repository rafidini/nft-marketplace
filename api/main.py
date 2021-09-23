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
from crud.crud import get_nfts, get_nft, insert_nft

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