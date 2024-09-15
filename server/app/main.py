from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.faq_routes import router as faq_router
from app.routes.user_routes import router as user_router
from app.routes.auth_routes import router as auth_router

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(faq_router, prefix="/api/faqs")
app.include_router(user_router, prefix="/api/users")
app.include_router(auth_router, prefix="/auth")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Fruit Ai"}

@app.on_event("startup")
async def startup_event():
    from app.db import connect_db
    connect_db()
    print("MongoDB connection established.")
 