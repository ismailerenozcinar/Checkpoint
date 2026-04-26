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

            // Seed Data - Başlangıç oyunları
            modelBuilder.Entity<Game>().HasData(
                new Game { Id = 1, Title = "Elden Ring", Developer = "FromSoftware", Publisher = "Bandai Namco", ReleaseYear = 2022, Description = "George R.R. Martin ile birlikte geliştirilen açık dünya aksiyon RPG. Lands Between'i keşfet, zorlu patronlarla savaş ve Elden Ring'i yeniden topla.", CoverImageUrl = "https://picsum.photos/seed/eldenring/300/400", Rating = 4.9, ReviewCount = 0, CreatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new Game { Id = 2, Title = "Cyberpunk 2077", Developer = "CD Projekt Red", Publisher = "CD Projekt", ReleaseYear = 2020, Description = "Night City'de geçen açık dünya aksiyon RPG. V olarak oyna ve efsanevi implant peşinde koş.", CoverImageUrl = "https://picsum.photos/seed/cyberpunk/300/400", Rating = 4.3, ReviewCount = 0, CreatedAt = new DateTime(2024, 1, 2, 0, 0, 0, DateTimeKind.Utc) },
                new Game { Id = 3, Title = "Starfield", Developer = "Bethesda Game Studios", Publisher = "Bethesda Softworks", ReleaseYear = 2023, Description = "Constellation üyesi olarak yıldızlar arası keşfe çık. 1000'den fazla gezegende keşif ve macera.", CoverImageUrl = "https://picsum.photos/seed/starfield/300/400", Rating = 3.9, ReviewCount = 0, CreatedAt = new DateTime(2024, 1, 3, 0, 0, 0, DateTimeKind.Utc) },
                new Game { Id = 4, Title = "God of War Ragnarök", Developer = "Santa Monica Studio", Publisher = "Sony Interactive", ReleaseYear = 2022, Description = "Kratos ve Atreus, Ragnarök'ü durdurmak için Dokuz Diyar'ı gezer. Epik bir baba-oğul hikayesi.", CoverImageUrl = "https://picsum.photos/seed/godofwar/300/400", Rating = 4.8, ReviewCount = 0, CreatedAt = new DateTime(2024, 1, 4, 0, 0, 0, DateTimeKind.Utc) },
                new Game { Id = 5, Title = "Hollow Knight", Developer = "Team Cherry", Publisher = "Team Cherry", ReleaseYear = 2017, Description = "Harap olmuş böcek krallığı Hallownest'te geçen 2D aksiyon macera. Zorlu ama ödüllendirici bir yolculuk.", CoverImageUrl = "https://picsum.photos/seed/hollowknight/300/400", Rating = 4.7, ReviewCount = 0, CreatedAt = new DateTime(2024, 1, 5, 0, 0, 0, DateTimeKind.Utc) },
                new Game { Id = 6, Title = "Hades", Developer = "Supergiant Games", Publisher = "Supergiant Games", ReleaseYear = 2020, Description = "Olympus'a kaçmaya çalışan yeraltı tanrısı Zagreus'u oyna. Her ölümde daha güçlen.", CoverImageUrl = "https://picsum.photos/seed/hades/300/400", Rating = 4.8, ReviewCount = 0, CreatedAt = new DateTime(2024, 1, 6, 0, 0, 0, DateTimeKind.Utc) },
                new Game { Id = 7, Title = "The Witcher 3: Wild Hunt", Developer = "CD Projekt Red", Publisher = "CD Projekt", ReleaseYear = 2015, Description = "Geralt of Rivia olarak kızını ara, canavarlarla savaş. En iyi açık dünya RPG'lerinden biri.", CoverImageUrl = "https://picsum.photos/seed/witcher3/300/400", Rating = 4.9, ReviewCount = 0, CreatedAt = new DateTime(2024, 1, 7, 0, 0, 0, DateTimeKind.Utc) },
                new Game { Id = 8, Title = "Red Dead Redemption 2", Developer = "Rockstar Games", Publisher = "Rockstar Games", ReleaseYear = 2018, Description = "Arthur Morgan olarak Amerika'nın dönüm noktasında hayatta kalmaya çalış. Muhteşem açık dünya.", CoverImageUrl = "https://picsum.photos/seed/rdr2/300/400", Rating = 4.8, ReviewCount = 0, CreatedAt = new DateTime(2024, 1, 8, 0, 0, 0, DateTimeKind.Utc) },
                new Game { Id = 9, Title = "Disco Elysium", Developer = "ZA/UM", Publisher = "ZA/UM", ReleaseYear = 2019, Description = "Başarısız bir dedektif olarak şehri keşfet. Metin tabanlı kararların her şeyi değiştirir.", CoverImageUrl = "https://picsum.photos/seed/discoelysium/300/400", Rating = 4.6, ReviewCount = 0, CreatedAt = new DateTime(2024, 1, 9, 0, 0, 0, DateTimeKind.Utc) },
                new Game { Id = 10, Title = "Sid Meier's Civilization VI", Developer = "Firaxis Games", Publisher = "2K Games", ReleaseYear = 2016, Description = "Bir uygarlık kur ve tarih boyunca geliştir. Strateji türünün zirvesi.", CoverImageUrl = "https://picsum.photos/seed/civ6/300/400", Rating = 4.5, ReviewCount = 0, CreatedAt = new DateTime(2024, 1, 10, 0, 0, 0, DateTimeKind.Utc) }
            );

            // Seed Data - Oyun-Tür ilişkileri
            // 1: RPG, 2: Action, 3: Adventure, 4: Open World, 5: Sci-Fi, 6: Fantasy, 7: Indie, 8: Rogue-like, 10: Strategy
            modelBuilder.Entity<GameGenre>().HasData(
                // Elden Ring - RPG, Action, Fantasy, Open World
                new GameGenre { GameId = 1, GenreId = 1 },
                new GameGenre { GameId = 1, GenreId = 2 },
                new GameGenre { GameId = 1, GenreId = 6 },
                new GameGenre { GameId = 1, GenreId = 4 },
                // Cyberpunk 2077 - RPG, Action, Sci-Fi, Open World
                new GameGenre { GameId = 2, GenreId = 1 },
                new GameGenre { GameId = 2, GenreId = 2 },
                new GameGenre { GameId = 2, GenreId = 5 },
                new GameGenre { GameId = 2, GenreId = 4 },
                // Starfield - RPG, Sci-Fi, Open World
                new GameGenre { GameId = 3, GenreId = 1 },
                new GameGenre { GameId = 3, GenreId = 5 },
                new GameGenre { GameId = 3, GenreId = 4 },
                // God of War Ragnarök - Action, Adventure
                new GameGenre { GameId = 4, GenreId = 2 },
                new GameGenre { GameId = 4, GenreId = 3 },
                // Hollow Knight - Action, Indie, Adventure
                new GameGenre { GameId = 5, GenreId = 2 },
                new GameGenre { GameId = 5, GenreId = 7 },
                new GameGenre { GameId = 5, GenreId = 3 },
                // Hades - Action, Rogue-like, Indie
                new GameGenre { GameId = 6, GenreId = 2 },
                new GameGenre { GameId = 6, GenreId = 8 },
                new GameGenre { GameId = 6, GenreId = 7 },
                // The Witcher 3 - RPG, Open World, Fantasy
                new GameGenre { GameId = 7, GenreId = 1 },
                new GameGenre { GameId = 7, GenreId = 4 },
                new GameGenre { GameId = 7, GenreId = 6 },
                // Red Dead Redemption 2 - Action, Adventure, Open World
                new GameGenre { GameId = 8, GenreId = 2 },
                new GameGenre { GameId = 8, GenreId = 3 },
                new GameGenre { GameId = 8, GenreId = 4 },
                // Disco Elysium - RPG, Adventure, Indie
                new GameGenre { GameId = 9, GenreId = 1 },
                new GameGenre { GameId = 9, GenreId = 3 },
                new GameGenre { GameId = 9, GenreId = 7 },
                // Civilization VI - Strategy
                new GameGenre { GameId = 10, GenreId = 10 }
            );
        }
    }
}
