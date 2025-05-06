using System;
using MongoDB.Driver;
using DotNetEnv;

namespace AggregationStudyCSharp
{
    public static class Config
    {
        private static readonly Lazy<IMongoClient> _lazyClient = new Lazy<IMongoClient>(() =>
        {
            // Load .env from project root
            Env.Load();

            var mongoUri = Environment.GetEnvironmentVariable("MONGODB_URI");
            if (string.IsNullOrWhiteSpace(mongoUri))
                throw new InvalidOperationException("MONGODB_URI must be set in .env");

            return new MongoClient(mongoUri);
        });

        public static IMongoClient Client => _lazyClient.Value;

        public static IMongoDatabase GetDatabase()
        {
            var dbName = Environment.GetEnvironmentVariable("DATABASE_NAME") ?? "yelp";
            return Client.GetDatabase(dbName);
        }
    }
}