# MongoDB Aggregation Pipeline Study: Node.js Driver

This study will help us learn how you use MongoDB documentation to build aggregation pipelines. 
You will work with the Yelp sample dataset (business and review collections) already loaded in MongoDB Atlas.

This Node.js project contains a series of tasks that require an aggregation pipeline to return the desired data.  
Your job is to write the aggregation pipeline logic in each task file. 
Connection code and data setup are already handled for you.

> **This is not a test of your skill or knowledge.** We want to see how you use our documentation.
> If you feel stuck or confused, that is our responsibility.

## Project Structure

```text
.
├── tasks/                      # The self-contained tasks to complete 
|   ├── taskDescriptions.md     # Task prompts and descriptions
│   ├── task1.js
│   ├── task2.js
│   └── task3.js
├── config.js                   # Atlas connection logic
├── index.js                    # Entry point to run the tasks
├── testConnection.js           # Tests connection and read access 
├── package.json                
└── README.md
```

## Setup

1. Confirm you have the following, or install if needed (both are required to run the MongoDB Node.js driver):
   - Node.js v16.20.1 or later
   - npm (Node Package Manager)

2. Clone this repository, and navigate to the `nodejs` project root.
   ```bash
   git clone https://github.com/cbullinger/aggregation-tasks.git && cd aggregation-tasks/nodejs
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set your `MONGODB_URI` variable to the connection string provided by the moderator.
    You can choose export it as a global var or create a `.env` at the project root.
5. Verify your setup:

   ```bash
    npm run testConnection 
   ```

## Running a Task

To run any task, use:

```bash
npm run task <taskNumeral>
```

For example `npm run task 1`.

---
### Sample Document

```json
{
  "business_id": "biz_223",
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
  "hours": {
    "Monday":    "10:00–21:00",
    "Tuesday":   "10:00–21:00",
    "Wednesday": "10:00–21:00",
    "Thursday":  "10:00–21:00",
    "Friday":    "10:00–21:00",
    "Saturday":  "10:00–21:00",
    "Sunday":    "Closed"
  }
}
```

| Field          | Type          | Description                                      |
| -------------- |---------------|--------------------------------------------------|
| `business_id`  | string        | Unique business identifier                       |
| `name`         | string        | Business name                                    |
| `city`         | string        | City name                                        |
| `stars`        | float         | Average rating (½-star increments)               |
| `review_count` | integer       | Total number of reviews                          |
| `is_open`      | bool          | true = open, false = closed                      |
| `categories`   | array[string] | List of category labels                          |
| `hours`        | object        | Operating hours by day (24-hour `"HH:MM–HH:MM"`) |


### Sample Review Document

```json
{
  "review_id": "rev_001",
  "user_id": "user_004",
  "business_id": "biz_003",
  "stars": 5,
  "date": "2023-10-01",
  "text": "Great food and service!",
  "useful": 10,
  "unhelpful": 2
}
```

| Field         | Type     | Description                                          |
|---------------| -------- |------------------------------------------------------|
| `review_id`   | string   | Unique review identifier                             |
| `user_id`     | string   | Unique user identifier (maps to `user.json`)         |
| `business_id` | string   | Unique business identifier (maps to `business.json`) |
| `stars`       | integer  | Star rating                                          |
| `date`        | string   | Review date in `YYYY-MM-DD` format                   |
| `text`        | string   | Full review text                                     |
| `useful`      | integer  | Number of “useful” votes received                    |
| `unhelpful`   | integer  | Number of “unhelpful” votes received                 |



