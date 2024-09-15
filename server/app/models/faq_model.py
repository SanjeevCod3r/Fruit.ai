from pydantic import BaseModel
from typing import List

class FAQ(BaseModel):
    question: str
    answer: str

class FAQInDB(FAQ):
    id: int

faqs_db: List[FAQInDB] = []

def get_all_faqs() -> List[FAQInDB]:
    return faqs_db

def get_faq_by_id(faq_id: int) -> FAQInDB:
    for faq in faqs_db:
        if faq.id == faq_id:
            return faq
    return None

def create_faq(faq: FAQ) -> FAQInDB:
    new_faq = FAQInDB(**faq.dict(), id=len(faqs_db) + 1)
    faqs_db.append(new_faq)
    return new_faq

def update_faq(faq_id: int, faq: FAQ) -> FAQInDB:
    existing_faq = get_faq_by_id(faq_id)
    if existing_faq:
        existing_faq.question = faq.question
        existing_faq.answer = faq.answer
        return existing_faq
    return None

def delete_faq(faq_id: int) -> bool:
    global faqs_db
    faqs_db = [faq for faq in faqs_db if faq.id != faq_id]
    return not any(faq.id == faq_id for faq in faqs_db)
