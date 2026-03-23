using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CheckpointAPI.Entities
{
    /// <summary>
    /// Kullanıcı yorumları entity
    /// </summary>
    public class Review
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; } = null!;

        [Required]
        public int GameId { get; set; }

        [ForeignKey("GameId")]
        public Game Game { get; set; } = null!;

        [Range(1, 5)]
        public int Rating { get; set; }

        [MaxLength(2000)]
        public string? Comment { get; set; }

        [MaxLength(500)]
        public string? Tags { get; set; } // Virgülle ayrılmış etiketler: "Amazing Graphics,Compelling Story"

        public bool IsDraft { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
