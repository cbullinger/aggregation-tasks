# MongoDB Aggregation Pipeline Study: Python Driver

This study will help us learn how you use MongoDB documentation to build 
aggregation pipelines. 
You will work with the Yelp sample dataset (`business` and `review` collections) 
already loaded in MongoDB Atlas.

This Python project contains a series of tasks that require an aggregation 
pipeline to return the desired data.
Your job is to write the aggregation pipeline logic in each task file. 
Connection code and data setup are already handled for you.

> **This is not a test of your skill or knowledge.** We want to see how you use our documentation. If you feel stuck or confused, that is our responsibility.

## Project Structure

```
.
├── .env.example           # Sample environment variables file
├── README.md             
├── requirements.txt      
├── config.py              # loads .env
├── mongo_client.py        # Atlas connection and client setup
├── main.py                # Entry point to run the tasks
└── tasks/                 # The self-contained tasks to complete
    ├── __init__.py       
    ├── testConnection.py  # Tests connection and read access     
    ├── task1.py          
    ├── task2.py          
    └── task3.py          
```

## Setup

1. Clone this repository, and navigate to the `nodejs` project root.
   ```bash
   git clone https://github.com/cbullinger/aggregation-tasks.git && cd python
   ```

2. Create and activate a virtual environment:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate    # macOS/Linux
   # .venv\Scripts\activate   # Windows Powershell
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables using the provided `.env.example` file:

   ```bash
   cp .env.example .env
   ```

   Open the `.env` and set the `MONGODB_URI` variable to the connection string 
   provided by the moderator. 

## Verify Your Setup

Run the connection test to ensure you can reach Atlas and read from the `business` collection:

```bash
python main.py testConnection 
```

You should see output like:

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

## Running a Task

You can execute any task in the `tasks` module through the main entry point or as a module:

* Main entry point:

  ```bash
  python main.py task1   # Runs task1.py
  python main.py task2   # Runs task2.py
  python main.py task3   # Runs task3.py
  ```

* Module:

  ```bash
  python -m tasks.task1
  python -m tasks.task2
  python -m tasks.task3
  ```

## Sample Documents

### Business Document

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
    "Gastropubs"
  ],
  "hours": { ... }
}
```

| Field          | Type           | Description                        |
| -------------- | -------------- | ---------------------------------- |
| `business_id`  | string         | Unique business identifier         |
| `name`         | string         | Business name                      |
| `city`         | string         | City name                          |
| `stars`        | float          | Average rating (½-star increments) |
| `review_count` | integer        | Total number of reviews            |
| `is_open`      | boolean        | `true` = open, `false` = closed    |
| `categories`   | array\[string] | List of category labels            |

### Review Document

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
| `stars`       | integer | Star rating                          |
| `date`        | string  | Review date (`YYYY-MM-DD`)           |
| `text`        | string  | Full review text                     |
| `useful`      | integer | Number of “useful” votes received    |
| `unhelpful`   | integer | Number of “unhelpful” votes received |
