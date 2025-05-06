package com.example.aggregation;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

/*
 Task 2: Find acupuncture businesses with wait-related complaints
 ================================================================
 This file connects to the 'yelp.business' collection.

 Your task is to find acupuncture businesses that reviews related to wait times.
  1. Find open businesses (`is_open` == true) with 'Acupuncture' in `categories`
  2. Join the `business` and `review` collections by their `business_id` fields using `$lookup`
  3. Unwind the reviews array to process each review individually
  4. Filter for review `text` mentioning wait-related complaints ("wait", "waited", "waiting", "slow service") using a regex match
  5. Group filtered results by:
        - `businessName`
        - `city`
        - `waitReviewCount` (count of reviews per business)
  6. Return only the unique `businessName`, `city`, and`waitReviewCount` fields
  7. Sort by `waitReviewCount` in descending order

 See:
 - Aggregation: https://www.mongodb.com/docs/drivers/java/sync/current/aggregation/
 - Aggregates Builders: https://www.mongodb.com/docs/drivers/java/sync/current/builders/aggregates/
*/

public class Task2 {

    public static void main(String[] args) {
        try (MongoClient mongoClient = MongoClientProvider.getClient()) {

            MongoDatabase database = mongoClient.getDatabase("yelp");
            MongoCollection<Document> businessColl = database.getCollection("business");

//            var pipeline =
//                    Arrays.asList(

            // TODO: Add your aggregation logic here, then compile and run: `mvn exec:java -P2`

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
