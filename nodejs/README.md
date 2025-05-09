# Yelp Aggregation with Node.js

This sample project connects to a MongoDB Atlas cluster and runs a simple aggregation on the Yelp sample dataset.

## Prerequisites

- Node.js ≥ 16
- An Atlas cluster with the [Yelp sample dataset](https://www.mongodb.com/docs/atlas/sample-data/) loaded
- Your IP address added to Atlas Network Access

## Setup

1. Clone the `aggregation-tasks` repo
   ```bash
   git clone https://github.com/cbullinger/aggregation-tasks.git && cd nodejs
   ```
2. Install project dependencies 
   ```bash
   npm install
   ```
3. Define the MongoDB connection string in a `.env` file
   ```bash
   touch .env
   ```
   Add the following line to the `.env` file, replacing the placeholders with your actual MongoDB connection details:
   ```bash
   # .env
   # Replace <username>, <password>, <cluster>, and <database> with your actual values
   MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"
   ```
   Example of a connection string in
a `.env` file
    ```
   MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"
   ```
4. Run `npm start`

You should see the top 10 cities by restaurant count printed, then a clean shutdown.

## Project Structure



### Sample Document

```
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

```
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


---

### Next steps

- Replace the pipeline in `index.js` to explore other aggregation operators
- Write additional modules (e.g. Map-Reduce examples, faceted search tasks)
- Integrate this into the ethnography study’s task runner

