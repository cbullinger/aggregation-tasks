using System;
using System.Linq;
using System.Threading.Tasks;
using AggregationStudyCSharp.Tasks;

namespace AggregationStudyCSharp
{
    class Program
    {
        static async Task<int> Main(string[] args)
        {
            if (args.Length != 1)
            {
                Console.WriteLine("Usage: dotnet run -- <taskNumber>");
                Console.WriteLine("  e.g. dotnet run -- 1");
                return 1;
            }

            var choice = args[0];
            try
            {
                switch (choice)
                {
                    case "1":
                        await Task1.RunAsync();
                        break;
                    case "2":
                        await Task2.RunAsync();
                        break;
                    case "3":
                        await Task3.RunAsync();
                        break;
                    default:
                        Console.WriteLine($"Unknown task: {choice}");
                        return 1;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"\nError: {ex.Message}");
                return 1;
            }

            return 0;
        }
    }
}
