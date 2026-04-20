# MFlix JavaScript Express Server

Updated: 2026-04-20 (copier test)

## Overview

This is the Express.js backend for the MFlix movie browsing application.
It provides REST API endpoints for browsing movies, viewing details, and
running aggregation examples against a MongoDB Atlas cluster.

## Prerequisites

- Node.js 20+
- MongoDB Atlas cluster (or local MongoDB 7.0+)
- npm or yarn

## Quick Start

```bash
cd mflix/server/js-express
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check |
| GET | `/movies` | List movies (paginated) |

## Testing

```bash
npm test
npm run test:integration
```
