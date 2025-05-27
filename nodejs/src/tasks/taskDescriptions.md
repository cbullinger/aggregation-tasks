# Task Prompts
Task prompts for tasks in the `yelp` dataset.
Each task corresponds to a file in the `tasks` directory.

You will use the MongoDB Node.js documentation to complete these tasks:
https://www.mongodb.com/docs/drivers/node/current/

## Task 1: Find highly rated, reputable restaurants
You are given a dataset of businesses that includes restaurants through the `yelp.business` collection.
Your task is to find restaurants that have a high rating and a significant number of reviews, then compute a reputation score.

1. Find restaurants with a 4.6 rating (`stars`) or higher and more than 500 reviews (`review_count`)
2. Calculate a new `reputationScore` field as the product of `stars` and `review_count`
3. Return only the `name`, `city`, and `reputationScore` fields, sorted by `reputationScore` in descending order

## Task 2: Find acupuncture businesses with wait-related complaints
You are given a dataset of businesses that includes acupuncture clinics through the `yelp.business` collection.
Your task is to find acupuncture businesses that reviews related to wait times.

1. Find open businesses with 'Acupuncture' in `categories`
2. Join the `business` and `review` collections by their `business_id` fields using `$lookup`
3. Filter for reviews with `text` that mention wait-related complaints (e.g. "waited a long time", "slow service" )using a regex match
4. Group filtered results by unique `businessName`
5. Return only the `businessName`, `city`, and calculated `waitReviewCount`, sorted by `waitReviewCount` in descending order

## Task 3: Find medical businesses with poor customer experience
You are given a dataset of reviews for businesses through the `yelp.review` collection.
Your task is to find medical businesses that have received one-star ratings.
> **NOTE:** This task connects to the `review` collection, not the `business` collection.

1. Find businesses in the `yelp.business` collection with 'Medical' in `categories`
2. Join the `business` and `review` collections by their `business_id` fields using `$lookup`
3. Filter for reviews with a `stars` rating of 1
4. Group filtered results by unique `businessName`
5. Return only the `businessName`, `city`, and calculated `poorReviewCount`, sorted by `poorReviewCount` in descending order