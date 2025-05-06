// Models/Review.cs
using MongoDB.Bson.Serialization.Attributes;

namespace AggregationStudyCSharp.Models
{
    public class Review
    {
        [BsonElement("review_id")]
        public string ReviewId { get; set; } = null!;

        [BsonElement("user_id")]
        public string UserId { get; set; } = null!;

        [BsonElement("business_id")]
        public string BusinessId { get; set; } = null!;

        [BsonElement("stars")]
        public int? Stars { get; set; }

        [BsonElement("date")]
        public string? Date { get; set; } // ISO "YYYY-MM-DD"

        [BsonElement("text")]
        public string? Text { get; set; }

        [BsonElement("useful")]
        public int? Useful { get; set; }

        [BsonElement("unhelpful")]
        public int? Unhelpful { get; set; }
    }
}