from fastapi import APIRouter
from app.models.user_model import UserSignup, UserLogin

router = APIRouter()

@router.post("/signup")
async def signup(user: UserSignup):
    from app.db import get_db
    db = get_db()
    collection = db.users
    result = collection.insert_one({"email": user.email, "password": user.password})
    if result.inserted_id:
        return {"message": "Signup successful", "user": user}
    return {"message": "Signup failed"}

@router.post("/login")
async def login(user: UserLogin):
    # Login logic (e.g., authenticate user)
    return {"message": "Login successful"}
