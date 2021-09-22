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
from crud.crud import get_client, get_nfts, get_nft

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
    # url = 'http://localhost:8000/nft'
    # headers = {'accept': 'application/json', 'Content-Type': 'application/json'}
    # requests.post(url, data=json.dumps(data), headers=headers)

    # Logic
    client = get_client()
    db = client['local']
    nft = jsonable_encoder(nft)
    new_nft = db["nfts"].insert_one(nft)
    created_student = db["nfts"].find_one({"_id": new_nft.inserted_id})
    content_response = {"date": str(datetime.now()), "created":created_student}
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=content_response)