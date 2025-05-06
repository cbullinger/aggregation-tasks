# MongoDB Aggregation Pipeline Study: Node.js Driver

This study will help us learn how you use MongoDB documentation to build aggregation pipelines using the [MongoDB Node driver](https://www.mongodb.com/docs/drivers/node/current/).

You’ll work with a subset of the Yelp sample dataset (the `business` and `review` collections) already loaded in MongoDB Atlas.
Your only job is to write aggregation pipelines in the provided task files. Connection code and data setup are already handled.

> **This is not a test of your skill or knowledge.** We want to see how you use our documentation. If you feel stuck or confused, that is our responsibility.

## Project Structure

```text
.
├── tasks/                      # Self-contained tasks to complete 
│   ├── task1.js
│   ├── task2.js
│   └── task3.js
├── config.js                    # Atlas connection logic
├── index.js                    # Entry point to run the tasks
├── testConnection.js           # Verify Atlas connection 
└── package.json                
```

## Setup

### Prerequisites

You must have the following:
- [Node.js 16.20.1 or later](https://nodejs.org/en/download/) installed
- [npm (Node Package Manager)](https://www.npmjs.com/get-npm) installed
- An IDE that can run Python code (e.g. PyCharm or VS Code)
- A web browser

> NOTE: During the session, please disable any AI-assisted code tools (Copilot, etc.).

You do not need to create your own Atlas cluster—connection details will be provided.

### Installation Steps

1. Clone this repository, and navigate to the `nodejs` project root.
   ```bash
   git clone https://github.com/cbullinger/aggregation-tasks.git && cd aggregation-tasks/nodejs
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your `MONGODB_URI` variable to the connection string provided by the moderator:

   ```text
    export MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.example.mongodb.net"
    ```

   Alternatively, create a `.env` file in the project root and add the connection string. It should look similar to:

   ```dotenv
    MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.example.mongodb.net"
   ```
   
4. Verify your setup:

   ```bash
    npm run testConnection 
   ```

If you see errors, check that:

- The connection string is correct.
- IP is whitelisted in Atlas.
- The virtual environment is successfully set up with project dependencies.

## Tasks

There are three tasks (`task1`, `task2`, `task3`).
Each file has a `# TODO` placeholder where you should write your aggregation pipeline logic.

> **NOTE:** You only need to focus on building the aggregation stages. All connection setup is done for you.

## Run a Task

To run any task, use:

```bash
npm run task <taskNumeral>
```

For example `npm run task 1`.

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

| Field          | Type           | Description                        |
| -------------- | -------------- | ---------------------------------- |
| `business_id`  | string         | Unique business identifier         |
| `name`         | string         | Business name                      |
| `city`         | string         | City name                          |
| `stars`        | float          | Average rating (½-star increments) |
| `review_count` | integer        | Total number of reviews            |
| `is_open`      | boolean        | `true` = open, `false` = closed    |
| `categories`   | array\[string] | List of category labels            |

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
| `stars`       | integer | Star rating                         |
| `date`        | string  | Review date (`YYYY-MM-DD`)           |
| `text`        | string  | Full review text                     |
| `useful`      | integer | Number of “useful” votes received    |
| `unhelpful`   | integer | Number of “unhelpful” votes received |
