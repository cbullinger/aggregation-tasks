# MongoDB Aggregation Pipeline Study: Java (Sync) Driver

This study will help us learn how you use MongoDB documentation to build aggregation pipelines using the [MongoDB Java (Sync) driver](https://www.mongodb.com/docs/drivers/java/sync/current/).

You’ll work with a subset of the Yelp sample dataset (the `business` and `review` collections) already loaded in MongoDB Atlas.
Your only job is to write aggregation pipelines in the provided task files. Connection code and data setup are already handled.

> **This is not a test of your skill or knowledge.** We want to see how you use our documentation. If you feel stuck or confused, that is our responsibility.

## Project Structure

```text
.
├── pom.xml
├── README.md
└── src
    └── main
      ├── java/com.example.aggregation
      │   ├── MongoClientProvider.java  # Atlas connection logic and client setup
      │   ├── TestConnection.java       # Verify Atlas connection
      │   ├── Task1.java                # Self-contained tasks to complete
      │   ├── Task2.java                #  ...
      │   └── Task3.java                #  ...
      └── resources
          └── application.properties
```

## Setup

### Prerequisites

You must have the following:
- [JDK 8 (or later)](https://www.oracle.com/java/technologies/javase-downloads.html) installed
- An IDE that can import a Maven project
- A web browser

> NOTE: During the session, please disable any AI-assisted code tools (Copilot, etc.).

You do not need to create your own Atlas cluster—connection details will be provided.

### Installation Steps

1. Clone the repository, and navigate to the `java` folder:
   ```bash
   git clone https://github.com/cbullinger/aggregation-tasks.git
   cd aggregation-tasks/java
   ```

2. Compile dependencies:

    ```bash
   mvn compile
   ```
3. Set your Atlas connection string (provided by the moderator):

   ```text
    export MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.example.mongodb.net"
    ```

   Alternatively, open `src/main/resources/application.properties` and paste the URI.

### Verify Connection

Run the TestConnection class to confirm you can read from `yelp.business`:

```bash
mvn compile
mvn exec:java -Dexec.mainClass="com.example.aggregation.TestConnection"
```

You should see output similar to:

```text
INFO  TestConnection - Connected to 'yelp.business'. Document count: 4523
INFO  TestConnection - Sample document: { "business_id": "Xxx...", "name": "...", ... }
INFO  TestConnection - MongoClient closed.
```

If you see errors, check that:

- The connection string is correct.
- IP is whitelisted in Atlas.
- `mvn compile` ran successfully.

## Tasks

There are three tasks (`Task1`, `Task2`, `Task3`).
Each file has a `// TODO` placeholder where you should write your aggregation pipeline logic.

> **NOTE:** You only need to focus on building the aggregation stages. All connection setup is done for you.

### Run a Task

Compile, if not already done:

```bash
mvn compile
```
Then run the specific task using Maven's exec plugin. Each task is run with a different profile (`-P1`, `-P2`, `-P3`):

```bash
#  Run Task1
mvn exec:java -P1

# Run Task2
mvn exec:java -P2

# Run Task3
mvn exec:java -P3
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
