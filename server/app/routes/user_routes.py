from fastapi import APIRouter, HTTPException
from typing import List
from app.models.user_model import User, get_all_users, get_user_by_id

router = APIRouter()

@router.get("/alluser", response_model=List[User])
def get_all_user_emails():
    users = get_all_users()
    return users

@router.get("/{user_id}")
def get_user(user_id: str):
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
   