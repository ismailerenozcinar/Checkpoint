using Microsoft.AspNetCore.Mvc;

namespace CheckpointAPI.Controllers
{
    /// <summary>
    /// Kullanıcı yönetimi controller'ı  
    /// Profil, takip sistemi
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        /// <summary>
        /// Kullanıcı profilini getir
        /// </summary>
        [HttpGet("{id}")]
        public IActionResult GetProfile(int id)
        {
            // TODO: Kullanıcı profilini getir
            return Ok(new
            {
                Id = id,
                Username = "Checkpoint_Pro",
                Level = 42,
                Title = "RPG Enthusiast",
                Played = 124,
                Completed = 86,
                Reviews = 32
            });
        }

        /// <summary>
        /// Profili güncelle
        /// </summary>
        [HttpPut("profile")]
        public IActionResult UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            // TODO: Profil bilgilerini güncelle
            return Ok(new { message = "Profil güncellendi" });
        }

        /// <summary>
        /// Takipçileri getir
        /// </summary>
        [HttpGet("{id}/followers")]
        public IActionResult GetFollowers(int id)
        {
            return Ok(new object[] { });
        }

        /// <summary>
        /// Takip edilenleri getir
        /// </summary>
        [HttpGet("{id}/following")]
        public IActionResult GetFollowing(int id)
        {
            return Ok(new object[] { });
        }

        /// <summary>
        /// Kullanıcıyı takip et
        /// </summary>
        [HttpPost("{userId}/follow")]
        public IActionResult Follow(int userId)
        {
            return Ok(new { message = "Takip edildi" });
        }

        /// <summary>
        /// Takibi bırak
        /// </summary>
        [HttpDelete("{userId}/follow")]
        public IActionResult Unfollow(int userId)
        {
            return NoContent();
        }
    }

    public class UpdateProfileRequest
    {
        public string? Username { get; set; }
        public string? Bio { get; set; }
        public string? AvatarUrl { get; set; }
    }
}
