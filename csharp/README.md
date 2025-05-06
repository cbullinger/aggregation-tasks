# MongoDB Aggregation Pipeline Study: C#/.NET Driver

This study will help us learn how you use MongoDB documentation to build aggregation pipelines using the [MongoDB C# driver](https://www.mongodb.com/docs/drivers/csharp/current/).

You’ll work with a subset of the Yelp sample dataset (the `business` and `review` collections) already loaded in MongoDB Atlas. 
Your only job is to write aggregation pipelines in the provided task files. Connection code and data setup are already handled.

> **This is not a test of your skill or knowledge.** We want to see how you use our documentation. If you feel stuck or confused, that is our responsibility.

## Project Structure

```text
.
├── AggregationStudyCSharp.csproj
├── Program.cs
├── Config.cs            # Atlas connection logic and client setup
├── TestConnection.cs   # Verify Atlas connection 
├── Models/
│   ├── Business.cs
│   └── Review.cs
└── Tasks/              # Self-contained tasks to complete
    ├── Task1.cs
    ├── Task2.cs
    └── Task3.cs
```

## Setup

### Prerequisites

You must have the following:
- [.NET 8.0)](https://dotnet.microsoft.com/en-us/download) installed
- An IDE that can open a .NET project (e.g. Visual Studio, Rider, or VS Code)
- A web browser

> NOTE: During the session, please disable any AI-assisted code tools (Copilot, etc.).

You do not need to create your own Atlas cluster—connection details will be provided.

### Installation Steps

1. Clone the repository, and navigate to the `csharp` folder:
   ```bash
   git clone https://github.com/cbullinger/aggregation-tasks.git 
   cd aggregation-tasks/csharp
   ```

2. Create a `.env` file in project root, and paste the `MONGO_URI` connection string
   and `DATABASE_NAME` provided by the moderator.

   It should look similar to:

   ```dotenv
    MONGODB_URI="mongodb+srv://<user>:<password>@cluster0.mongodb.net"
    DATABASE_NAME="yelp"
    ```
3. Restore and build the project:

    ```bash
   dotnet restore
   dotnet build 
   ```
   
### Verify Connection

Run the TestConnection class to confirm you can read from `yelp.business`:

```bash
dotnet run --project TestConnection.cs
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
- `dotnet build` ran successfully.

## Tasks

There are three tasks (`Task1`, `Task2`, `Task3`). 
Each file has a `// TODO` placeholder where you should write your aggregation pipeline logic.

> **NOTE:** You only need to focus on building the aggregation stages. All connection setup is done for you.

### Run a Task

To run a specific task, use the following command syntax:

```bash
# Task 1
dotnet run -- 1

# Task 2
dotnet run -- 2

# Task 3
dotnet run -- 3
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
