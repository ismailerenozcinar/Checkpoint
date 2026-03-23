using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CheckpointAPI.Entities
{
    /// <summary>
    /// Kullanıcı kütüphanesi - oyun durumu takibi
    /// </summary>
    public enum GameStatus
    {
        Playing = 0,
        Completed = 1,
        Backlog = 2,
        Wishlist = 3,
        Paused = 4
    }

    public class UserLibrary
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

        public GameStatus Status { get; set; } = GameStatus.Playing;

        [Range(0, 100)]
        public int Progress { get; set; } = 0;

        public DateTime AddedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastPlayedAt { get; set; }
    }
}
