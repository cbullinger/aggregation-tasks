package com.example.aggregation;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.Arrays;

/**
 * Task 2: Aggregation with $bucket
 * Created: 2026-04-20 (copier test)
 */
public class Task2 {
    public static void run(MongoDatabase db) {
        MongoCollection<Document> collection = db.getCollection("movies");

        // Bucket movies by IMDb rating
        collection.aggregate(Arrays.asList(
            new Document("$match", new Document("imdb.rating", new Document("$exists", true))),
            new Document("$bucket", new Document("groupBy", "$imdb.rating")
                .append("boundaries", Arrays.asList(0, 2, 4, 6, 8, 10))
                .append("default", "unrated")
                .append("output", new Document("count", new Document("$sum", 1))
                    .append("avgRuntime", new Document("$avg", "$runtime"))))
        )).forEach(doc -> System.out.println(doc.toJson()));
    }
}
