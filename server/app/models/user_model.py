from pydantic import BaseModel
from typing import List
from app.db import get_db

class User(BaseModel):
    email: str

class UserSignup(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

def get_all_users() -> List[User]:
    db = get_db()
    collection = db.users
    users = collection.find({}, {"email": 1, "_id": 0})
    return [User(email=user["email"]) for user in users]

def get_user_by_id(user_id: str):
    db = get_db()
    collection = db.users
    user = collection.find_one({"_id": user_id})
    if user:
        return User(email=user["email"])
    return None
