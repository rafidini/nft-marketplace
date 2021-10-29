from pydantic import BaseModel, Field
from bson import ObjectId
from .base import PyObjectId


class NFTModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    image: str = Field(...)
    amount: float = Field(..., ge=0.0)
    currency: str = Field(...)
    creator: str = Field(...)
    date: str = Field(...)
    description: str = Field(...)
    contract_address: str = Field(...)
    link: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Jejune Hustler",
                "image": "https://lh3.googleusercontent.com/Hu8R9ZDsElNZ_S3bnbUGIY3vS6h3wjzm15d7ZOjoMJp17omUKtY3h78syRh2jaVQUiA34Ml0O2881vHlHtymipIpGz0_jcNCMTDuWA=w600",
                "amount": "0.0001",
                "currency": "ETH",
                "creator": "Neon District Season One Item",
                "date": "March 17, 2022 at 1:46pm CEST",
                "description": "Armor found within Neon District. \nA Neon District: Season One game item, playable on https://portal.neondistrict.io.\nNeon District is a free-to-play cyberpunk role-playing game. Collect characters and gear, craft and level up teams, and battle against other players through competitive multiplayer and in turn-based combat.",
                "contract_address": "0x7227e371540cf7b8e512544ba6871472031f3335",
                "link": "https://opensea.io/assets/matic/0x7227e371540cf7b8e512544ba6871472031f3335/158456332462567099841992013138"
            }
        }
