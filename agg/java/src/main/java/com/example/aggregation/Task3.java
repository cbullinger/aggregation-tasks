package com.example.aggregation;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

/*
    Task 3: Find medical businesses with poor customer experience
    ==============================================================
    This file connects to the 'yelp.review' collection.

    Your task is to find medical businesses with poor customer experience based on their reviews.
      1. Group reviews by `business_id`, and get the count for:
            - `totalReviews` (reviews per business)
            - `oneStarReviews` (reviews with 1 star per business)
      2. Compute new field `oneStarRatio` as `oneStarReviews`:`totalReviews`
      3. Bucket new field `customerExperience` based on `oneStarRatio`:
            - Excellent ≤ 5%
            - Good ≤ 15%
            - Fair ≤ 25%
            - Poor > 25%
      4. Join the `review` and `business` collections by `business_id` field to a new `biz` array
      5. Unwind and filter results by:
            - "Poor" customer experience
            - "Health & Medical" in `biz.categories`
      6. Collapse back to one document per business
      7. Return the business `name`, `city`, `oneStarRatio`, and `customerExperience` fields
      8. Sort by `oneStarRatio` descending

See: https://www.mongodb.com/docs/drivers/java/sync/current/builders/aggregates/
*/

public class Task3 {

    public static void main(String[] args) {
        try (MongoClient mongoClient = MongoClientProvider.getClient()) {

            MongoDatabase database = mongoClient.getDatabase("yelp");
            MongoCollection<Document> businessColl = database.getCollection("business");

//            var pipeline =
//                    Arrays.asList(

// TODO: Add your aggregation logic here, then compile and run: `mvn exec:java -P3`

//            );

//            AggregateIterable<Document> results = businessColl.aggregate(pipeline);
//            for (Document doc : results) {
//                System.out.println(doc.toJson());
//            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        System.exit(0);
    }
}
