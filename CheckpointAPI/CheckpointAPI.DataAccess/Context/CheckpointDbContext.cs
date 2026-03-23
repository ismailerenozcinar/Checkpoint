using Microsoft.EntityFrameworkCore;
using CheckpointAPI.Entities;

namespace CheckpointAPI.DataAccess.Context
{
    /// <summary>
    /// Checkpoint uygulamasının veritabanı bağlam sınıfı
    /// Entity Framework Core ile MSSQL bağlantısını yönetir
    /// </summary>
    public class CheckpointDbContext : DbContext
    {
        public CheckpointDbContext(DbContextOptions<CheckpointDbContext> options) : base(options)
        {
        }

        // DbSet tanımları
        public DbSet<User> Users { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<GameGenre> GameGenres { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<UserLibrary> UserLibraries { get; set; }
        public DbSet<Achievement> Achievements { get; set; }
        public DbSet<UserFollow> UserFollows { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // GameGenre - Composite Primary Key (Many-to-Many)
            modelBuilder.Entity<GameGenre>()
                .HasKey(gg => new { gg.GameId, gg.GenreId });

            modelBuilder.Entity<GameGenre>()
                .HasOne(gg => gg.Game)
                .WithMany(g => g.GameGenres)
                .HasForeignKey(gg => gg.GameId);

            modelBuilder.Entity<GameGenre>()
                .HasOne(gg => gg.Genre)
                .WithMany(g => g.GameGenres)
                .HasForeignKey(gg => gg.GenreId);

            // UserFollow - Composite Primary Key (Self-referencing Many-to-Many)
            modelBuilder.Entity<UserFollow>()
                .HasKey(uf => new { uf.FollowerId, uf.FollowingId });

            modelBuilder.Entity<UserFollow>()
                .HasOne(uf => uf.Follower)
                .WithMany()
                .HasForeignKey(uf => uf.FollowerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserFollow>()
                .HasOne(uf => uf.Following)
                .WithMany()
                .HasForeignKey(uf => uf.FollowingId)
                .OnDelete(DeleteBehavior.Restrict);

            // Review - Unique constraint (bir kullanıcı bir oyuna bir yorum)
            modelBuilder.Entity<Review>()
                .HasIndex(r => new { r.UserId, r.GameId })
                .IsUnique();

            // UserLibrary - Unique constraint (bir kullanıcı bir oyunu bir kez ekleyebilir)
            modelBuilder.Entity<UserLibrary>()
                .HasIndex(ul => new { ul.UserId, ul.GameId })
                .IsUnique();

            // User - Unique email
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // User - Unique username
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            // Seed Data - Başlangıç türleri
            modelBuilder.Entity<Genre>().HasData(
                new Genre { Id = 1, Name = "RPG" },
                new Genre { Id = 2, Name = "Action" },
                new Genre { Id = 3, Name = "Adventure" },
                new Genre { Id = 4, Name = "Open World" },
                new Genre { Id = 5, Name = "Sci-Fi" },
                new Genre { Id = 6, Name = "Fantasy" },
                new Genre { Id = 7, Name = "Indie" },
                new Genre { Id = 8, Name = "Rogue-like" },
                new Genre { Id = 9, Name = "Racing" },
                new Genre { Id = 10, Name = "Strategy" }
            );
        }
    }
}
