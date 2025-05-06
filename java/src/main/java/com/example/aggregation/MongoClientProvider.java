package com.example.aggregation;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.ReadConcern;
import com.mongodb.ReadPreference;
import com.mongodb.WriteConcern;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;
import java.util.Properties;


public final class MongoClientProvider {
    private static final Logger LOGGER = LoggerFactory.getLogger(MongoClientProvider.class);
    private static final String PROPS_FILE = "/application.properties";    private static final String MONGODB_URI_KEY = "mongodb.uri";

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
     * Creates and configures a MongoClient based on application.properties / env var.
     * @return an initialized MongoClient
     */
    private static MongoClient createClient() {
        String uri = loadUriFromProperties();
        if (uri == null || uri.isBlank()) {
            LOGGER.error("No 'mongodb.uri' provided in application.properties or environment variable.");
            throw new IllegalStateException("Missing MongoDB URI. Set environment variable MONGODB_URI or application.properties.");
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

    /**
     * Loads application.properties from the classpath and returns the "mongodb.uri" value.
     */
    private static String loadUriFromProperties() {
        Properties props = new Properties();
        try (InputStream in = MongoClientProvider.class.getResourceAsStream(PROPS_FILE)) {
            if (in == null) {
                LOGGER.warn("application.properties not found on classpath.");
                return System.getenv("MONGODB_URI");
            }
            props.load(in);
            // First look for property; if empty, fallback to environment variable
            String uri = props.getProperty(MONGODB_URI_KEY);
            if (uri != null && !uri.isBlank()) {
                return uri;
            }
            return System.getenv("MONGODB_URI");
        } catch (IOException e) {
            LOGGER.error("Failed to load application.properties", e);
            // fallback to environment variable
            return System.getenv("MONGODB_URI");
        }
    }
}
