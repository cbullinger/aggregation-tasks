# MongoDB Aggregation Pipeline Study: PyMongo Driver

This study will help us learn how you use MongoDB documentation to build aggregation pipelines using the [MongoDB PyMongo driver](https://www.mongodb.com/docs/languages/python/pymongo-driver/current/).

You’ll work with a subset of the Yelp sample dataset (the `business` and `review` collections) already loaded in MongoDB Atlas.
See the [Data Model](#data-model) at the end of this README.md for example structure and field descriptions. 

Your only job is to write aggregation pipelines in the provided task files. Connection code and data setup are already handled.

> **This is not a test of your skill or knowledge.** We want to see how you use our documentation. If you feel stuck or confused, that is our responsibility.

## Project Structure

```text
.
├── tasks/                  # Self-contained tasks to complete
|   ├──  __init__.py
|   ├──  task1.py
|   ├──  task2.py
|   └── task3.py
├── requirements.txt
├── config.py               # Set Atlas connection string
├── ping.py                 # Verify Atlas connection
├── mongo_client.py        
└── main.py
```

## Setup

### Prerequisites

You must have the following:
- [Python3 version 3.8 or later](https://www.python.org/downloads/) installed
- [pip](https://pip.pypa.io/en/stable/installation/) installed
- An IDE that can run Python code (e.g. PyCharm or VS Code)
- A web browser

> NOTE: During the session, please disable any AI-assisted code tools (Copilot, etc.).

You do not need to create your own Atlas cluster—connection details will be provided.

### Install

1. Clone this repository:
   ```bash
   git clone https://github.com/cbullinger/aggregation-tasks.git
   ```

2. From the `python` project root, create and activate a virtual environment:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate    # macOS/Linux
   # .venv\Scripts\activate   # Windows Powershell
   ```

3. Install project dependencies:

   ```bash
   pip3 install -r requirements.txt
   ```

4. Set the MongoDB connection string: 
    
    Open `config.py` and paste the connection string provided by the moderator.

5. Run the following to confirm you can read from `yelp.business`:

   ```bash
   python3 ping.py
   ```

   You should see output similar to:

   ```
   Successfully connected to Atlas
   Top 5 Cities by Business Count:
     San Diego: 20
     Long Beach: 17
     Fresno: 16
     Santa Barbara: 14
     Montecito: 12
   
   Connection closed
   ```
   If you see errors, check that:
   
   - The connection string is correct.
   - IP is whitelisted in Atlas.
   - The virtual environment is successfully set up with project dependencies.

## Tasks

There are three tasks (`1`, `2`, `3`).
Each file has a `# TODO` placeholder where you should write your aggregation pipeline logic.

> **NOTE:** You only need to focus on building the aggregation stages. All connection setup is done for you.

## Run a Task

You can run the tasks in two ways: through the `main.py` entry point or directly from the task files.

- Main entry point:

  ```bash
  python3 main.py 1   # Runs 1.py
  python3 main.py 2   # Runs 2.py
  python3 main.py 3   # Runs 3.py
  ```

- Module:

  ```bash
  python3 -m tasks.1 # Runs 1.py
  python3 -m tasks.2 # Runs 2.py
  python3 -m tasks.3 # Runs 3.py
  ```

You should see the results print to console.

## Data Model

You'll work with two collections: `business` and `review`. Below are sample documents and field descriptions.

### `business` Collection

```json
{
  "business_id": "biz_001",
  "name":        "Garaje",
  "city":        "San Francisco",
  "stars":        4.5,
  "review_count": 1198,
  "is_open":      true,
  "categories": [
    "Mexican",
    "Burgers",
    "Restaurants"
  ],
  "hours": {
    "Monday":    "10:00-21:00",
    "Tuesday":   "10:00-21:00",
    "Wednesday": "10:00-21:00",
    "Thursday":  "10:00-21:00",
    "Friday":    "10:00-21:00",
    "Saturday":  "10:00-21:00",
    "Sunday":    "Closed"
  }
}
```

| Field          | Type           | Description                        |
| -------------- | -------------- | ---------------------------------- |
| `business_id`  | string         | Unique business identifier         |
| `name`         | string         | Business name                      |
| `city`         | string         | City name                          |
| `stars`        | double         | Average rating (½-star increments) |
| `review_count` | integer        | Total number of reviews            |
| `is_open`      | boolean        | `true` = open, `false` = closed    |
| `categories`   | array[string]  | List of category labels            |

### `review` Collection

```json
{
  "review_id":   "rev_002",
  "user_id":     "user_001",
  "business_id": "biz_003",
  "stars":       5,
  "date":        "2023-10-01",
  "text":        "Great food and service!",
  "useful":      10,
  "unhelpful":   2
}
```

| Field         | Type    | Description                          |
| ------------- | ------- | ------------------------------------ |
| `review_id`   | string  | Unique review identifier             |
| `user_id`     | string  | Unique user identifier               |
| `business_id` | string  | Unique business identifier           |
| `stars`       | double  | Star rating                          |
| `date`        | string  | Review date (`YYYY-MM-DD`)           |
| `text`        | string  | Full review text                     |
| `useful`      | integer | Number of "useful" votes received    |
| `unhelpful`   | integer | Number of "unhelpful" votes received |
