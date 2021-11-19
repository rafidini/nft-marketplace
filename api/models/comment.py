from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId
from .base import PyObjectId


class CommentModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    title: str = Field(...)
    mood: int = Field(...)
    comment: str = Field(...)
    image: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                    "name": "Itokiana",
                    "title": "CEO @ Empty", 
                    "mood": 3, 
                    "comment": "I love this app!",
                    "image": "https://media-exp1.licdn.com/dms/image/D4E35AQGWKk…eta&t=NqHmWcuBnBcRauaDUpbT7skwQ1Pu-Cjm9mXY1gIOMgQ"
            }
        }
