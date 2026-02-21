package com.example.aggregation;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

/**
 Task 1: Find highly rated, reputable restaurants
 =================================================
 This file connects to the 'yelp.business' collection.

 Your task is to find highly rated restaurants, then compute a reputation score:
     1. Find highly rated restaurants:
        - The `categories` array includes 'Restaurants'
        - Has a 4.6 rating (`stars`) or higher
        - Has more than 500 reviews (`review_count`)
     2. Calculate a new `reputationScore` field as the product of `stars` and `review_count`, rounded to the nearest integer
     3. Return only the `name`, `city`, and `reputationScore` fields
     4. Sort by `reputationScore` in descending order

 See: https://www.mongodb.com/docs/drivers/java/sync/current/builders/aggregates/
 */

public class Task1 {

    public static void main(String[] args) {
        try (MongoClient mongoClient = MongoClientProvider.getClient()) {

            MongoDatabase database = mongoClient.getDatabase("yelp");
            MongoCollection<Document> businessColl = database.getCollection("business");

//            var pipeline =
//                    Arrays.asList(

// TODO: Add your aggregation logic here, then compile and run: `mvn exec:java -P1`

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
