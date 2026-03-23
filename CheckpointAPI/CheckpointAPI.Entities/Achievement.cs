using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CheckpointAPI.Entities
{
    /// <summary>
    /// Kullanıcı başarımları entity
    /// </summary>
    public class Achievement
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; } = null!;

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        [MaxLength(100)]
        public string? GameName { get; set; }

        public DateTime UnlockedAt { get; set; } = DateTime.UtcNow;
    }
}
