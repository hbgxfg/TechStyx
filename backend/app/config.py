import os

class Config:
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/periodpal")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-key")
