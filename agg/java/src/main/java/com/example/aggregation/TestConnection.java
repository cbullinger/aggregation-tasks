package com.example.aggregation;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// To test connection, compile and run: `mvn exec:java -Ptest`

public class TestConnection {
    private static final Logger LOGGER = LoggerFactory.getLogger(TestConnection.class);

    public static void main(String[] args) {

        try (MongoClient mongoClient = MongoClientProvider.getClient()) {

            MongoDatabase database = mongoClient.getDatabase("yelp");
            MongoCollection<Document> businessColl = database.getCollection("business");

            if (mongoClient != null) {
                LOGGER.info("Successfully connected to MongoDB.");
                System.out.println("Successfully connected to MongoDB.");
            } else {
                LOGGER.error("Failed to connect to MongoDB.");
                return;
            }

            long count = businessColl.countDocuments();
            System.out.println(count + " documents found in 'business' collection.");

            Document sample = businessColl.find().first();
            if (sample != null) {
                System.out.println(sample.toJson());
            } else {
                LOGGER.warn("'business' collection is empty or no documents found.");
                System.out.println("'business' collection is empty or no documents found.");
            }

        } catch (Exception e) {
            LOGGER.error("Error while testing MongoDB connection:", e);
        } finally {
            // 5. Always close the client when done
            LOGGER.info("MongoClient closed.");
            System.out.println("MongoClient closed.");
        }
        System.exit(0);
    }
}
