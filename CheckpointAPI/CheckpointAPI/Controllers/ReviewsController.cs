using Microsoft.AspNetCore.Mvc;

namespace CheckpointAPI.Controllers
{
    /// <summary>
    /// Yorum yönetimi controller'ı
    /// Oyun yorumları CRUD işlemleri
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        /// <summary>
        /// Oyuna ait yorumları getir
        /// </summary>
        [HttpGet("game/{gameId}")]
        public IActionResult GetByGame(int gameId)
        {
            // TODO: Oyuna ait yorumları getir
            return Ok(new object[] { });
        }

        /// <summary>
        /// Kullanıcıya ait yorumları getir
        /// </summary>
        [HttpGet("user/{userId}")]
        public IActionResult GetByUser(int userId)
        {
            // TODO: Kullanıcının yorumlarını getir
            return Ok(new object[] { });
        }

        /// <summary>
        /// Yeni yorum oluştur
        /// </summary>
        [HttpPost]
        public IActionResult Create([FromBody] CreateReviewRequest request)
        {
            // TODO: Yorum oluştur
            return CreatedAtAction(nameof(GetByGame), new { gameId = request.GameId },
                new { message = "Yorum oluşturuldu" });
        }

        /// <summary>
        /// Yorumu güncelle
        /// </summary>
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] CreateReviewRequest request)
        {
            // TODO: Yorumu güncelle
            return Ok(new { message = "Yorum güncellendi" });
        }

        /// <summary>
        /// Yorumu sil
        /// </summary>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // TODO: Yorumu sil
            return NoContent();
        }
    }

    public class CreateReviewRequest
    {
        public int GameId { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public string? Tags { get; set; }
        public bool IsDraft { get; set; }
    }
}
