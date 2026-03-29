using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using CheckpointAPI.Business.Abstract;
using CheckpointAPI.DataAccess.Abstract;
using CheckpointAPI.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CheckpointAPI.Business.Concrete
{
    public class AuthService : IAuthService
    {
        private readonly IUserDal _userDal;
        private readonly IConfiguration _configuration;

        public AuthService(IUserDal userDal, IConfiguration configuration)
        {
            _userDal = userDal;
            _configuration = configuration;
        }

        public async Task<AuthResult> LoginAsync(LoginDto request)
        {
            var user = await _userDal.GetByEmailAsync(request.Email);
            if (user == null)
            {
                return new AuthResult { Success = false, Message = "Kullanıcı bulunamadı." };
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if (!isPasswordValid)
            {
                return new AuthResult { Success = false, Message = "Hatalı şifre." };
            }

            string token = GenerateJwtToken(user);

            return new AuthResult
            {
                Success = true,
                Token = token,
                User = user,
                Message = "Giriş başarılı."
            };
        }

        public async Task<AuthResult> RegisterAsync(RegisterDto request)
        {
            var existingUserByEmail = await _userDal.GetByEmailAsync(request.Email);
            if (existingUserByEmail != null)
            {
                return new AuthResult { Success = false, Message = "Bu email adresi zaten kullanılıyor." };
            }

            var existingUserByUsername = await _userDal.GetByUsernameAsync(request.Username);
            if (existingUserByUsername != null)
            {
                return new AuthResult { Success = false, Message = "Bu kullanıcı adı zaten kullanılıyor." };
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var newUser = new User
            {
                Username = request.Username,
                Email = request.Email,
                PasswordHash = passwordHash,
                Level = 1,
                CreatedAt = DateTime.UtcNow
            };

            var addedUser = await _userDal.AddAsync(newUser);
            string token = GenerateJwtToken(addedUser);

            return new AuthResult
            {
                Success = true,
                Token = token,
                User = addedUser,
                Message = "Kayıt işlemi başarılı."
            };
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:SecretKey"]!);
            
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Username)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
