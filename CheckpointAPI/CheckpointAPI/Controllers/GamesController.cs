using Microsoft.AspNetCore.Mvc;

namespace CheckpointAPI.Controllers
{
    /// <summary>
    /// Oyun yönetimi controller'ı
    /// Oyun CRUD işlemleri, arama ve trend oyunlar
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class GamesController : ControllerBase
    {
        /// <summary>
        /// Trend oyunları getir
        /// </summary>
        [HttpGet("trending")]
        public IActionResult GetTrending()
        {
            // TODO: En popüler oyunları getir
            var games = new[]
            {
                new { Id = 1, Title = "Elden Ring", Developer = "FromSoftware", Rating = 4.9 },
                new { Id = 2, Title = "Cyberpunk 2077", Developer = "CD Projekt Red", Rating = 4.8 },
                new { Id = 3, Title = "Starfield", Developer = "Bethesda", Rating = 4.2 }
            };
            return Ok(games);
        }

        /// <summary>
        /// ID ile oyun detayını getir
        /// </summary>
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            // TODO: Veritabanından oyun detayı
            return Ok(new { Id = id, Title = "Oyun Detayı", Message = "Detay bilgileri burada" });
        }

        /// <summary>
        /// Oyun arama
        /// </summary>
        [HttpGet("search")]
        public IActionResult Search([FromQuery] string? query, [FromQuery] string? genre)
        {
            // TODO: Arama ve filtreleme
            return Ok(new { Results = new object[] { }, TotalCount = 0, Query = query });
        }

        /// <summary>
        /// Benzer oyunları getir
        /// </summary>
        [HttpGet("{id}/similar")]
        public IActionResult GetSimilar(int id)
        {
            // TODO: Tür bazlı benzer oyunlar
            return Ok(new object[] { });
        }
    }
}
