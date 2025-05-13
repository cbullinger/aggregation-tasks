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
│   ├── task1.js
│   ├── task2.js
│   └── task3.js
├── config.js                   # Atlas connection logic
├── index.js                    # Entry point to run the tasks
├── testConnection.js         # Tests connection and read access 
├── package.json                
└── README.md
```

## Setup

1. Confirm you have the following, or install if needed (both are required to run the MongoDB Node.js driver):
   - Node.js v16.20.1 or later
   - npm (Node Package Manager)

2. Clone this repository, and navigate to the `nodejs` project root.
   ```bash
   git clone https://github.com/cbullinger/aggregation-tasks.git && cd nodejs
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set your `MONGODB_URI` variable to the connection string provided by the moderator.
    You can choose export it as a global var or create a `.env` at the project root.
5. Verify your setup:

   ```bash
   npm start verifyConnection
   ```

## Logistics

* **Time estimate:** 60 minutes (about 3 tasks).
* **Session:** Virtual.
* **Privacy:** All data and feedback are confidential.

## Running a Task

To run any task, use:

```bash
npm start <taskname>
```

Replace `<taskname>` with the file name (without `.js`), for example `task1_simpleMatch`.

---
### Sample Document

```json
{
  "business_id": "tnhfDv5Il8EaGSXZGiuQGg",
  "name":        "Garaje",
  "address":     "475 3rd St",
  "city":        "San Francisco",
  "state":       "CA",
  "postal_code": "94107",
  "latitude":    37.7817529521,
  "longitude":  -122.39612197,
  "stars":        4.5,
  "review_count": 1198,
  "is_open":      1,
  "attributes": {
    "RestaurantsTakeOut": true,
    "BusinessParking": {
      "garage":    false,
      "street":    true,
      "validated": false,
      "lot":       false,
      "valet":     false
    }
  },
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
    "Sunday":    "11:00–18:00"
  }
}
```

| Field          | Type           | Description                                          |
| -------------- | -------------- | ---------------------------------------------------- |
| `business_id`  | string         | 22-character unique business identifier              |
| `name`         | string         | Business name                                        |
| `address`      | string         | Full street address                                  |
| `city`         | string         | City name                                            |
| `state`        | string         | 2-character state code                               |
| `postal_code`  | string         | ZIP or postal code                                   |
| `latitude`     | float          | Geolocation latitude                                 |
| `longitude`    | float          | Geolocation longitude                                |
| `stars`        | float          | Average rating (½-star increments)                   |
| `review_count` | integer        | Total number of reviews                              |
| `is_open`      | integer        | 1 = open, 0 = closed                                 |
| `attributes`   | object         | Key–value map of business attributes                 |
| `categories`   | array[string]  | List of category labels                              |
| `hours`        | object         | Operating hours by day (24-hour `"HH:MM–HH:MM"`)      |


### Sample Review Document

```json
{
  "review_id":   "r1g0v2x3y4z5a6b7c8d9e0f",
  "user_id":     "u1a2b3c4d5e6f7g8h9i0j1k",
  "business_id": "tnhfDv5Il8EaGSXZGiuQGg",
  "stars":       5,
  "date":        "2023-10-01",
  "text":        "Great food and service!",
  "useful":      10,
  "funny":       2,
  "cool":        5
}
```

| Field         | Type     | Description                                                    |
| ------------- | -------- | -------------------------------------------------------------- |
| `review_id`   | string   | 22-character unique review identifier                          |
| `user_id`     | string   | 22-character unique user identifier (maps to `user.json`)      |
| `business_id` | string   | 22-character business identifier (maps to `business.json`)     |
| `stars`       | integer  | Star rating                                                    |
| `date`        | string   | Review date in `YYYY-MM-DD` format                             |
| `text`        | string   | Full review text                                               |
| `useful`      | integer  | Number of “useful” votes received                              |
| `funny`       | integer  | Number of “funny” votes received                               |
| `cool`        | integer  | Number of “cool” votes received                                |



