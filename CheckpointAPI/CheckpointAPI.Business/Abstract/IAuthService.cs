using CheckpointAPI.Entities;

namespace CheckpointAPI.Business.Abstract
{
    public interface IAuthService
    {
        Task<AuthResult> RegisterAsync(RegisterDto request);
        Task<AuthResult> LoginAsync(LoginDto request);
    }

    public class AuthResult
    {
        public bool Success { get; set; }
        public string Token { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public User? User { get; set; }
    }

    public class RegisterDto
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
