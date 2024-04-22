using BoardGameList.Models;
using BoardGameList.Models.Csv;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace BoardGameList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController : Controller
    {
        private readonly ApplicationDBContext _context;
        private readonly ILogger<SeedController> _logger;
        private readonly IWebHostEnvironment _env;
        public SeedController(ApplicationDBContext context, ILogger<SeedController> logger, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }

        [HttpPut(Name = "Seed")]
        [ResponseCache(NoStore = true)]
        public async Task<IActionResult> Put()
        {
            //Set up
            var config = new CsvConfiguration(CultureInfo.GetCultureInfo("pt-BR"))
            {
                Delimiter = ";",
                HasHeaderRecord = true
            };
            using var reader = new StreamReader(Path.Combine(_env.ContentRootPath, "DATA/bgg_dataset.csv"));
            using var csv = new CsvReader(reader, config);

            var existingBoardGames = await _context.BoardGames.ToDictionaryAsync(x => x.Id);
            var existingMechanics = await _context.Mechanics.ToDictionaryAsync(x => x.Name);
            var existingDomains = await _context.Domains.ToDictionaryAsync(x => x.Name);
            int publisherCount = await _context.Publishers.CountAsync();
            int categoryCount = await _context.Categories.CountAsync();

            var now = DateTime.Now;

            //Create a list of publishers
            var publishers = new List<string>();
            for (int i = 0; i < 100; i++)
            {
                publishers.Add($"Publisher {i}");
            }

            //create a sample publishers
            if (publisherCount == 0)
            {
                foreach (var publisher in publishers)
                {
                    var newPublisher = new Publishers()
                    {
                        Name = publisher,
                        LastModifiedDate = now
                    };
                    _context.Publishers.Add(newPublisher);
                }
                await _context.SaveChangesAsync();
            }

            //Create a list of 50 strings as categories for creating in Category Model
            var categories = new List<string>();
            for (int i = 0; i < 100; i++)
            {
                categories.Add($"Category {i}");
            }

            //Add categories to Category table
            if (categoryCount == 0)
            {
                foreach (var category in categories)
                {
                    var newCategory = new Category()
                    {
                        Name = category,
                        CreatedDate = now,
                        LastTimeModified = now
                    };
                    _context.Categories.Add(newCategory);
                }
                await _context.SaveChangesAsync();
            }
            //get all existing categories
            var existingCategories = await _context.Categories.ToListAsync();

            //get the existing publisher
            var existingPublishers = await _context.Publishers.ToListAsync();
            //get a random publisher from existingPublisher
            var randomPublisher = existingPublishers[new Random().Next(0, existingPublishers.Count)];

            //Read the CSV
            var records = csv.GetRecords<BggRecord>();
            var skippedRows = 0;

            foreach (var record in records)
            {
                if (!record.ID.HasValue || string.IsNullOrEmpty(record.Name) || existingBoardGames.ContainsKey(record.ID.Value))
                {
                    skippedRows++;
                    continue;
                }

                var boardgame = new BoardGame()
                {
                    Id = record.ID.Value,
                    Name = record.Name,
                    Year = record.YearPublished,
                    MinPlayers = record.MinPlayers,
                    MaxPlayers = record.MaxPlayers ?? 0,
                    MinAge = record.MinAge ?? 0,
                    BGGRank = record.BGGRank ?? 0,
                    ComplexityAverage = record.ComplexityAverage ?? 0,
                    OwnedUsers = record.OwnedUsers ?? 0,
                    PlayTime = record.PlayTime ?? 0,
                    UsersRated = record.UsersRated ?? 0,
                    RatingAverage = record.RatingAverage ?? 0,
                    CreatedDate = now,
                    LastTimeModified = now,
                    Flags = 0,
                    PublisherId = randomPublisher!.Id
                };

                _context.BoardGames.Add(boardgame);

                //get a random category from existingCategories
                var category = existingCategories[new Random().Next(0, existingCategories.Count)];
                _context.BoardGames_Categories.Add(new BoardGames_Categories()
                {
                    BoardGame = boardgame,
                    Category = category,
                    CreateDate = now
                });

                if (!string.IsNullOrEmpty(record.Domains))
                {
                    var domains = record.Domains
                                    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                                    .Distinct(StringComparer.InvariantCultureIgnoreCase);
                    foreach (var domainName in domains)
                    {
                        var domain = existingDomains.GetValueOrDefault(domainName);
                        if (domain == null)
                        {
                            domain = new Domains()
                            {
                                Name = domainName,
                                CreatedDate = now,
                                LastTimeModified = now
                            };
                            _context.Domains.Add(domain);
                            existingDomains.Add(domainName, domain);

                            _context.BoardGames_Domains.Add(new BoardGames_Domains()
                            {
                                BoardGame = boardgame,
                                Domain = domain,
                                CreateDate = now
                            });
                        }
                    }

                }

                if (!string.IsNullOrEmpty(record.Mechanics))
                {
                    var mechanics = record.Mechanics
                                    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                                    .Distinct(StringComparer.InvariantCultureIgnoreCase);
                    foreach (var mechanicName in mechanics)
                    {
                        var mechanic = existingMechanics.GetValueOrDefault(mechanicName);
                        if (mechanic == null)
                        {
                            mechanic = new Mechanics()
                            {
                                Name = mechanicName,
                                CreatedDate = now,
                                LastTimeModified = now
                            };
                            _context.Mechanics.Add(mechanic);
                            existingMechanics.Add(mechanicName, mechanic);

                            _context.BoardGames_Mechanics.Add(new BoardGames_Mechanics()
                            {
                                BoardGame = boardgame,
                                Mechanic = mechanic,
                                CreateDate = now
                            });
                        }
                    }
                }
            }

            //Save
            using var transaction = _context.Database.BeginTransaction();
            _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT BoardGames ON");
            await _context.SaveChangesAsync();
            _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT BoardGames OFF");
            transaction.Commit();

            //Recap

            return new JsonResult(new
            {
                BoardGames = _context.BoardGames.Count(),
                Domains = _context.Domains.Count(),
                Mechanics = _context.Mechanics.Count(),
                Publishers = _context.Publishers.Count(),
                Categories = _context.Categories.Count(),
                SkippedRows = skippedRows
            });
        }

        [HttpPatch(Name = "PatchPublisher")]
        [ResponseCache(NoStore = true)]
        public async Task<IActionResult> EditPublisherId()
        {
            var boardGames = await _context.BoardGames.ToListAsync();
            var publishers = await _context.Publishers.ToListAsync();
            var now = DateTime.Now;

            foreach (var boardGame in boardGames)
            {
                var randomPublisher = publishers[new Random().Next(0, publishers.Count)];
                boardGame.PublisherId = randomPublisher.Id;
                boardGame.LastTimeModified = now;

                _context.BoardGames.Update(boardGame);
            }
            await _context.SaveChangesAsync();

            return new JsonResult(new
            {
                BoardGames = _context.BoardGames.Count()
            });
        }
    }
}
