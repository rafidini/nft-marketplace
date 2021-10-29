"""
User model
==========

User modelization for REST API requests.
"""

# External packages
from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId

class UserModel(BaseModel):
    """
    """
    username: str = Field(...)
    firstName: str = Field(...)
    lastName: str = Field(...)
    email: str = EmailStr(...)
    enabled: str = 'true'

    # Configuration
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "username": "jotaro",
                "firstName": "Jojo",
                "lastName": "Bizarre",
                "email": "jojo.bizarre@gmail.com",
                "enabled": "true"
            }
        }
