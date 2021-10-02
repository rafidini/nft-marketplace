from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId
from .base import PyObjectId


class CryptoModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    acronym: str = Field(...)
    name: str = Field(...)
    price: float = Field(..., ge=0.0)
    currency: str = Field(...)
    date: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                    "acronym": "BTC",
                    "name": "Bitcoin", 
                    "price": 37075.08, 
                    "date": "2021-09-30 16:47:24.206061",
                    "currency": "€"
            }
        }
