using BoardGameList.Models;
using Microsoft.AspNetCore.Mvc;

namespace BoardGameList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardGameController : ControllerBase
    {
        private ILogger<BoardGameController> _logger;

        public BoardGameController(ILogger<BoardGameController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetBoardGames")]
        [ResponseCache(Location = ResponseCacheLocation.Any, Duration = 60)]
        public IEnumerable<BoardGame> Get()
        {
            return new[] {
                new BoardGame {
                    Id = 1,
                    Name = "Board Game 1",
                    Year = 1992,
                    MinPlayers = 2500,
                    MaxPlayers = 3800
                },
                new BoardGame {
                    Id = 2,
                    Name = "Board Game 2",
                    Year = 1996,
                    MinPlayers = 2450,
                    MaxPlayers = 4560
                },
                new BoardGame {
                    Id = 3,
                    Name = "Board Game 3",
                    Year = 1997,
                    MinPlayers = 3560,
                    MaxPlayers = 7865
                },
                new BoardGame {
                    Id = 4,
                    Name = "Board Game 4",
                    Year = 2005,
                    MinPlayers = 15690,
                    MaxPlayers = 18050
                },
                new BoardGame {
                    Id = 5,
                    Name = "Board Game 5",
                    Year = 2022,
                    MinPlayers = 25000,
                    MaxPlayers = 65800
                }
            };
        }
    }
}