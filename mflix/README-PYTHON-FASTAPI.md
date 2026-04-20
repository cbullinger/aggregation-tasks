# MFlix Python FastAPI Server

Updated: 2026-04-20 (copier test)

## Overview

This is the Python FastAPI backend for the MFlix movie browsing application.
It provides REST API endpoints for browsing movies, viewing details, and
running aggregation examples against a MongoDB Atlas cluster.

## Prerequisites

- Python 3.11+
- MongoDB Atlas cluster (or local MongoDB 7.0+)
- `pip` or `uv` for dependency management

## Quick Start

```bash
cd mflix/server/python-fastapi
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your MongoDB URI
uvicorn main:app --reload
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check |
| GET | `/movies` | List movies (paginated) |

## Testing

```bash
pytest
```
