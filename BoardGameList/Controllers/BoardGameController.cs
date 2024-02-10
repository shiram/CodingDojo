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
        public IEnumerable<BoardGame> Get()
        {
            return new[] {
                new BoardGame {
                    Id = 1,
                    Name = "Edward",
                    Year = 1992
                },
                new BoardGame {
                    Id = 2,
                    Name = "Sam",
                    Year = 1996
                },
                new BoardGame {
                    Id = 3,
                    Name = "Tim",
                    Year = 1997
                },
                new BoardGame {
                    Id = 4,
                    Name = "Tevin",
                    Year = 2005
                },
                new BoardGame {
                    Id = 5,
                    Name = "Riley",
                    Year = 2022
                }
            };
        }
    }
}