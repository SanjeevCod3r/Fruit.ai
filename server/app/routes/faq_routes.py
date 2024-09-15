from fastapi import APIRouter, HTTPException
from typing import List
from app.models.faq_model import FAQ, FAQInDB, get_all_faqs, get_faq_by_id, create_faq, update_faq, delete_faq

router = APIRouter()

@router.get("/", response_model=List[FAQInDB])
async def read_faqs():
    return get_all_faqs()

@router.get("/{faq_id}", response_model=FAQInDB)
async def read_faq(faq_id: int):
    faq = get_faq_by_id(faq_id)
    if faq is None:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return faq

@router.post("/", response_model=FAQInDB)
async def create_new_faq(faq: FAQ):
    return create_faq(faq)

@router.put("/{faq_id}", response_model=FAQInDB)
async def update_existing_faq(faq_id: int, faq: FAQ):
    updated_faq = update_faq(faq_id, faq)
    if updated_faq is None:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return updated_faq

@router.delete("/{faq_id}", response_model=dict)
async def delete_existing_faq(faq_id: int):
    deleted = delete_faq(faq_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return {"message": "FAQ deleted"}
