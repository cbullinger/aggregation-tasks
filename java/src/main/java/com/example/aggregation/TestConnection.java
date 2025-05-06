package com.example.aggregation;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * TestConnection.java
 *
 * Verifies that we can connect to MongoDB Atlas, read the "yelp" database
 * and the "business" collection. Prints the total count and one sample document.
 *
 * Requires:
 *   - MongoClientProvider (which reads `mongodb.uri` from application.properties or MONGODB_URI)
 *   - SLF4J + Logback on the classpath
 *
 * Usage:
 *   mvn exec:java -Dexec.mainClass="com.example.yelpstudy.TestConnection"
 */
public class TestConnection {
    private static final Logger LOGGER = LoggerFactory.getLogger(TestConnection.class);

    public static void main(String[] args) {
        // 1. Obtain a MongoClient (singleton) from our provider
        MongoClient mongoClient = MongoClientProvider.getClient();

        try {
            // 2. Get the "yelp" database and "business" collection
            MongoDatabase database = mongoClient.getDatabase("yelp");
            MongoCollection<Document> businessColl = database.getCollection("business");

            // 3. Count documents in "business"
            long count = businessColl.countDocuments();
            LOGGER.info("Connected to 'yelp.business'. Document count: {}", count);

            // 4. Retrieve one sample document (if any)
            Document sample = businessColl.find().first();
            if (sample != null) {
                LOGGER.info("Sample document: {}", sample.toJson());
            } else {
                LOGGER.warn("'business' collection is empty or no documents found.");
            }

        } catch (Exception e) {
            LOGGER.error("Error while testing MongoDB connection:", e);
        } finally {
            // 5. Always close the client when done
            mongoClient.close();
            LOGGER.info("MongoClient closed.");
        }
    }
}
