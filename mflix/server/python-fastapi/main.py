"""
MFlix Python FastAPI Server
Updated: 2026-04-20 (copier test)
"""
from fastapi import FastAPI
from contextlib import asynccontextmanager
from pymongo import AsyncMongoClient
import os


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize MongoDB connection on startup."""
    uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    app.state.client = AsyncMongoClient(uri)
    app.state.db = app.state.client["sample_mflix"]
    yield
    app.state.client.close()


app = FastAPI(title="MFlix API", lifespan=lifespan)


@app.get("/")
async def root():
    return {"message": "MFlix API", "version": "2.0.0"}


@app.get("/movies")
async def list_movies(limit: int = 20, skip: int = 0):
    db = app.state.db
    movies = await db.movies.find().skip(skip).limit(limit).to_list()
    return {"movies": movies, "count": len(movies)}
