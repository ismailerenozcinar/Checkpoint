using Microsoft.AspNetCore.Mvc;
using CheckpointAPI.Business.Abstract;

namespace CheckpointAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly IGameService _gameService;

        public GamesController(IGameService gameService)
        {
            _gameService = gameService;
        }

        /// <summary>
        /// Trend oyunları getir (rating ve yorum sayısına göre)
        /// </summary>
        [HttpGet("trending")]
        public async Task<IActionResult> GetTrending()
        {
            var games = await _gameService.GetTrendingGamesAsync();
            var result = games.Select(g => new
            {
                g.Id,
                g.Title,
                g.Developer,
                g.Publisher,
                g.ReleaseYear,
                g.Description,
                g.CoverImageUrl,
                g.Rating,
                g.ReviewCount,
                Genres = g.GameGenres.Select(gg => gg.Genre.Name).ToList()
            });
            return Ok(result);
        }

        /// <summary>
        /// ID ile oyun detayını getir
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var game = await _gameService.GetGameByIdAsync(id);
            if (game == null)
                return NotFound(new { Message = "Oyun bulunamadı." });

            return Ok(new
            {
                game.Id,
                game.Title,
                game.Developer,
                game.Publisher,
                game.ReleaseYear,
                game.Description,
                game.CoverImageUrl,
                game.Rating,
                game.ReviewCount,
                Genres = game.GameGenres.Select(gg => gg.Genre.Name).ToList()
            });
        }

        /// <summary>
        /// Oyun arama ve genre filtreleme
        /// </summary>
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string? query, [FromQuery] string? genre)
        {
            var games = await _gameService.SearchGamesAsync(query ?? string.Empty, genre);
            var result = games.Select(g => new
            {
                g.Id,
                g.Title,
                g.Developer,
                g.CoverImageUrl,
                g.Rating,
                g.ReviewCount,
                Genres = g.GameGenres.Select(gg => gg.Genre.Name).ToList()
            });
            return Ok(new { Results = result, TotalCount = games.Count, Query = query });
        }

        /// <summary>
        /// Aynı türdeki benzer oyunları getir
        /// </summary>
        [HttpGet("{id}/similar")]
        public async Task<IActionResult> GetSimilar(int id)
        {
            var games = await _gameService.GetSimilarGamesAsync(id);
            var result = games.Select(g => new
            {
                g.Id,
                g.Title,
                g.Developer,
                g.CoverImageUrl,
                g.Rating,
                Genres = g.GameGenres.Select(gg => gg.Genre.Name).ToList()
            });
            return Ok(result);
        }
    }
}
