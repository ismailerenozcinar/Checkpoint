using Microsoft.AspNetCore.Mvc;

namespace CheckpointAPI.Controllers
{
    /// <summary>
    /// Kütüphane yönetimi controller'ı
    /// Kullanıcının oyun kütüphanesini yönetir (Playing, Completed, Backlog, Wishlist)
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class LibraryController : ControllerBase
    {
        /// <summary>
        /// Kullanıcının kütüphanesini getir (duruma göre filtreleme)
        /// </summary>
        [HttpGet]
        public IActionResult GetMyLibrary([FromQuery] string? status)
        {
            // TODO: Kullanıcının kütüphanesini getir
            return Ok(new { Games = new object[] { }, TotalCount = 0 });
        }

        /// <summary>
        /// Kütüphaneye oyun ekle
        /// </summary>
        [HttpPost]
        public IActionResult AddGame([FromBody] AddGameRequest request)
        {
            // TODO: Oyunu kütüphaneye ekle
            return CreatedAtAction(nameof(GetMyLibrary), new { message = "Oyun kütüphaneye eklendi" });
        }

        /// <summary>
        /// İlerleme güncelle
        /// </summary>
        [HttpPut("{id}")]
        public IActionResult UpdateProgress(int id, [FromBody] UpdateProgressRequest request)
        {
            // TODO: İlerlemeyi güncelle
            return Ok(new { message = "İlerleme güncellendi" });
        }

        /// <summary>
        /// Kütüphaneden oyun kaldır
        /// </summary>
        [HttpDelete("{id}")]
        public IActionResult RemoveGame(int id)
        {
            // TODO: Oyunu kütüphaneden kaldır
            return NoContent();
        }
    }

    public class AddGameRequest
    {
        public int GameId { get; set; }
        public string Status { get; set; } = "Playing";
    }

    public class UpdateProgressRequest
    {
        public int Progress { get; set; }
    }
}
