package com.example.aggregation;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.ReadConcern;
import com.mongodb.ReadPreference;
import com.mongodb.WriteConcern;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;


public final class MongoClientProvider {
    private static final Logger LOGGER = LoggerFactory.getLogger(MongoClientProvider.class);

    static volatile MongoClient mongoClient;

    private MongoClientProvider() {
        // private constructor to prevent instantiation
    }

    /**
     * Returns a singleton MongoClient instance.
     * If not yet initialized, reads configuration and creates it.
     */
    public static MongoClient getClient() {
        if (mongoClient == null) {
            synchronized (MongoClientProvider.class) {
                if (mongoClient == null) {
                    mongoClient = createClient();
                }
            }
        }
        return mongoClient;
    }

    /**
     * Creates and configures a MongoClient based on env var.
     * @return an initialized MongoClient
     */
    private static MongoClient createClient() {
        String uri = System.getenv("MONGODB_URI");
        if (uri == null || uri.isBlank()) {
            Dotenv dotenv = Dotenv.load();
            uri = dotenv.get("MONGODB_URI");
        }
        if (uri == null || uri.isBlank()) {
            LOGGER.error("No 'MONGODB_URI' provided in environment or .env file.");
            throw new IllegalStateException("Missing MongoDB URI. Set MONGODB_URI in environment or .env file.");
        }

        ConnectionString connectionString = new ConnectionString(uri);

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                // Recommended codecs/validators come from the driver by default
                .applyToSocketSettings(builder ->
                        builder.connectTimeout((int) Duration.ofSeconds(10).toMillis(), java.util.concurrent.TimeUnit.MILLISECONDS))
                .applyToClusterSettings(builder ->
                        builder.serverSelectionTimeout((int) Duration.ofSeconds(10).toMillis(), java.util.concurrent.TimeUnit.MILLISECONDS))
                // Use “unified topology” automatically with the 4.x driver
                .readPreference(ReadPreference.primary())
                .readConcern(ReadConcern.MAJORITY)
                .writeConcern(WriteConcern.W1.withJournal(true))
                .build();

        LOGGER.info("Creating MongoClient with URI: {}", uri);
        return MongoClients.create(settings);
    }

}
