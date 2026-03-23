using System.ComponentModel.DataAnnotations;

namespace CheckpointAPI.Entities
{
    /// <summary>
    /// Oyun türlerini tutan entity
    /// </summary>
    public class Genre
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        // Navigation Property
        public ICollection<GameGenre> GameGenres { get; set; } = new List<GameGenre>();
    }
}
