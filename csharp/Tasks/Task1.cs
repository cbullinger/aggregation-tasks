using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using AggregationStudyCSharp.Models;

namespace AggregationStudyCSharp.Tasks
{
    public static class Task1
    {
        public static async Task RunAsync()
        {
            var db = Config.GetDatabase();
            var businessColl = db.GetCollection<Business>("business");

var 
            var pipeline = new EmptyPipelineDefinition<BsonDocument>()
            // Build a raw BsonDocument pipeline identical to Python/Node logic:

            Console.WriteLine("Task 1: Highly Rated Restaurants (sorted by reputationScore):\n");
            foreach (var biz in typedResults)
            {
                Console.WriteLine($"{biz.Name} ({biz.City}) – Stars: {biz.Stars}, Reviews: {biz.ReviewCount}");
            }
        }
    }
}
