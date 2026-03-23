using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CheckpointAPI.Entities
{
    /// <summary>
    /// Kullanıcı takip sistemi entity
    /// </summary>
    public class UserFollow
    {
        public int FollowerId { get; set; }

        [ForeignKey("FollowerId")]
        public User Follower { get; set; } = null!;

        public int FollowingId { get; set; }

        [ForeignKey("FollowingId")]
        public User Following { get; set; } = null!;

        public DateTime FollowedAt { get; set; } = DateTime.UtcNow;
    }
}
