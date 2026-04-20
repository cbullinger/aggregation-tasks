package com.example.aggregation;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.Arrays;

/**
 * Task 1: Basic aggregation - $match and $group
 * Created: 2026-04-20 (copier test)
 */
public class Task1 {
    public static void run(MongoDatabase db) {
        MongoCollection<Document> collection = db.getCollection("movies");

        // Count movies by year decade
        collection.aggregate(Arrays.asList(
            new Document("$match", new Document("year", new Document("$gte", 2000))),
            new Document("$group", new Document("_id",
                new Document("$subtract", Arrays.asList(
                    "$year",
                    new Document("$mod", Arrays.asList("$year", 10))
                )))
                .append("count", new Document("$sum", 1))),
            new Document("$sort", new Document("_id", 1))
        )).forEach(doc -> System.out.println(doc.toJson()));
    }
}
