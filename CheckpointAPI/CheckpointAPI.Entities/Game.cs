using System.ComponentModel.DataAnnotations;

namespace CheckpointAPI.Entities
{
    /// <summary>
    /// Oyun bilgilerini tutan entity
    /// </summary>
    public class Game
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Developer { get; set; }

        [MaxLength(100)]
        public string? Publisher { get; set; }

        public int? ReleaseYear { get; set; }

        [MaxLength(2000)]
        public string? Description { get; set; }

        [MaxLength(500)]
        public string? CoverImageUrl { get; set; }

        public double Rating { get; set; } = 0;

        public int ReviewCount { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public ICollection<GameGenre> GameGenres { get; set; } = new List<GameGenre>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<UserLibrary> LibraryEntries { get; set; } = new List<UserLibrary>();
    }
}
