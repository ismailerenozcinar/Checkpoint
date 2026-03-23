using System.ComponentModel.DataAnnotations;

namespace CheckpointAPI.Entities
{
    /// <summary>
    /// Kullanıcı bilgilerini tutan entity
    /// </summary>
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [MaxLength(255)]
        public string? AvatarUrl { get; set; }

        [MaxLength(500)]
        public string? Bio { get; set; }

        public int Level { get; set; } = 1;

        [MaxLength(50)]
        public string? Title { get; set; } // "RPG Enthusiast" gibi

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<UserLibrary> LibraryEntries { get; set; } = new List<UserLibrary>();
        public ICollection<Achievement> Achievements { get; set; } = new List<Achievement>();
    }
}
