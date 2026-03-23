using Microsoft.AspNetCore.Mvc;

namespace CheckpointAPI.Controllers
{
    /// <summary>
    /// Kimlik doğrulama controller'ı
    /// Kullanıcı kayıt ve giriş işlemleri
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        // TODO: IAuthService enjekte edilecek

        /// <summary>
        /// Yeni kullanıcı kaydı
        /// </summary>
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            // TODO: Kullanıcı kayıt iş mantığı
            return Ok(new { message = "Kullanıcı başarıyla kaydedildi", userId = 1 });
        }

        /// <summary>
        /// Kullanıcı girişi
        /// </summary>
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // TODO: JWT token üretimi
            return Ok(new { token = "jwt-token-placeholder", userId = 1 });
        }

        /// <summary>
        /// Mevcut kullanıcı profili
        /// </summary>
        [HttpGet("profile")]
        public IActionResult GetProfile()
        {
            // TODO: Token'dan kullanıcı bilgisi alınacak
            return Ok(new { message = "Profil bilgileri" });
        }
    }

    // Request modelleri
    public class RegisterRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
