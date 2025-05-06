// Models/Business.cs
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace AggregationStudyCSharp.Models
{
    public class Business
    {
        [BsonElement("business_id")]
        public string BusinessId { get; set; } = null!;

        [BsonElement("name")]
        public string Name { get; set; } = null!;

        [BsonElement("city")]
        public string City { get; set; } = null!;

        [BsonElement("stars")]
        public int? Stars { get; set; }

        [BsonElement("review_count")]
        public int? ReviewCount { get; set; }

        [BsonElement("is_open")]
        public bool? IsOpen { get; set; }

        [BsonElement("categories")]
        public List<string> Categories { get; set; } = new List<string>();        
        
        [BsonElement("hours")]
        public Dictionary<string, string> Hours { get; set; } = new Dictionary<string, string>();
    }
}