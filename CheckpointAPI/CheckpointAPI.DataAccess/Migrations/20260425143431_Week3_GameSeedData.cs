using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CheckpointAPI.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Week3_GameSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Developer = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Publisher = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ReleaseYear = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    CoverImageUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Rating = table.Column<double>(type: "float", nullable: false),
                    ReviewCount = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Genres",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genres", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AvatarUrl = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Bio = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Level = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GameGenres",
                columns: table => new
                {
                    GameId = table.Column<int>(type: "int", nullable: false),
                    GenreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameGenres", x => new { x.GameId, x.GenreId });
                    table.ForeignKey(
                        name: "FK_GameGenres_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GameGenres_Genres_GenreId",
                        column: x => x.GenreId,
                        principalTable: "Genres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Achievements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    GameName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    UnlockedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Achievements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Achievements_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    GameId = table.Column<int>(type: "int", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    Tags = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    IsDraft = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reviews_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reviews_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserFollows",
                columns: table => new
                {
                    FollowerId = table.Column<int>(type: "int", nullable: false),
                    FollowingId = table.Column<int>(type: "int", nullable: false),
                    FollowedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFollows", x => new { x.FollowerId, x.FollowingId });
                    table.ForeignKey(
                        name: "FK_UserFollows_Users_FollowerId",
                        column: x => x.FollowerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserFollows_Users_FollowingId",
                        column: x => x.FollowingId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserLibraries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    GameId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Progress = table.Column<int>(type: "int", nullable: false),
                    AddedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastPlayedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLibraries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserLibraries_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserLibraries_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Games",
                columns: new[] { "Id", "CoverImageUrl", "CreatedAt", "Description", "Developer", "Publisher", "Rating", "ReleaseYear", "ReviewCount", "Title" },
                values: new object[,]
                {
                    { 1, "https://picsum.photos/seed/eldenring/300/400", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "George R.R. Martin ile birlikte geliştirilen açık dünya aksiyon RPG. Lands Between'i keşfet, zorlu patronlarla savaş ve Elden Ring'i yeniden topla.", "FromSoftware", "Bandai Namco", 4.9000000000000004, 2022, 0, "Elden Ring" },
                    { 2, "https://picsum.photos/seed/cyberpunk/300/400", new DateTime(2024, 1, 2, 0, 0, 0, 0, DateTimeKind.Utc), "Night City'de geçen açık dünya aksiyon RPG. V olarak oyna ve efsanevi implant peşinde koş.", "CD Projekt Red", "CD Projekt", 4.2999999999999998, 2020, 0, "Cyberpunk 2077" },
                    { 3, "https://picsum.photos/seed/starfield/300/400", new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc), "Constellation üyesi olarak yıldızlar arası keşfe çık. 1000'den fazla gezegende keşif ve macera.", "Bethesda Game Studios", "Bethesda Softworks", 3.8999999999999999, 2023, 0, "Starfield" },
                    { 4, "https://picsum.photos/seed/godofwar/300/400", new DateTime(2024, 1, 4, 0, 0, 0, 0, DateTimeKind.Utc), "Kratos ve Atreus, Ragnarök'ü durdurmak için Dokuz Diyar'ı gezer. Epik bir baba-oğul hikayesi.", "Santa Monica Studio", "Sony Interactive", 4.7999999999999998, 2022, 0, "God of War Ragnarök" },
                    { 5, "https://picsum.photos/seed/hollowknight/300/400", new DateTime(2024, 1, 5, 0, 0, 0, 0, DateTimeKind.Utc), "Harap olmuş böcek krallığı Hallownest'te geçen 2D aksiyon macera. Zorlu ama ödüllendirici bir yolculuk.", "Team Cherry", "Team Cherry", 4.7000000000000002, 2017, 0, "Hollow Knight" },
                    { 6, "https://picsum.photos/seed/hades/300/400", new DateTime(2024, 1, 6, 0, 0, 0, 0, DateTimeKind.Utc), "Olympus'a kaçmaya çalışan yeraltı tanrısı Zagreus'u oyna. Her ölümde daha güçlen.", "Supergiant Games", "Supergiant Games", 4.7999999999999998, 2020, 0, "Hades" },
                    { 7, "https://picsum.photos/seed/witcher3/300/400", new DateTime(2024, 1, 7, 0, 0, 0, 0, DateTimeKind.Utc), "Geralt of Rivia olarak kızını ara, canavarlarla savaş. En iyi açık dünya RPG'lerinden biri.", "CD Projekt Red", "CD Projekt", 4.9000000000000004, 2015, 0, "The Witcher 3: Wild Hunt" },
                    { 8, "https://picsum.photos/seed/rdr2/300/400", new DateTime(2024, 1, 8, 0, 0, 0, 0, DateTimeKind.Utc), "Arthur Morgan olarak Amerika'nın dönüm noktasında hayatta kalmaya çalış. Muhteşem açık dünya.", "Rockstar Games", "Rockstar Games", 4.7999999999999998, 2018, 0, "Red Dead Redemption 2" },
                    { 9, "https://picsum.photos/seed/discoelysium/300/400", new DateTime(2024, 1, 9, 0, 0, 0, 0, DateTimeKind.Utc), "Başarısız bir dedektif olarak şehri keşfet. Metin tabanlı kararların her şeyi değiştirir.", "ZA/UM", "ZA/UM", 4.5999999999999996, 2019, 0, "Disco Elysium" },
                    { 10, "https://picsum.photos/seed/civ6/300/400", new DateTime(2024, 1, 10, 0, 0, 0, 0, DateTimeKind.Utc), "Bir uygarlık kur ve tarih boyunca geliştir. Strateji türünün zirvesi.", "Firaxis Games", "2K Games", 4.5, 2016, 0, "Sid Meier's Civilization VI" }
                });

            migrationBuilder.InsertData(
                table: "Genres",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "RPG" },
                    { 2, "Action" },
                    { 3, "Adventure" },
                    { 4, "Open World" },
                    { 5, "Sci-Fi" },
                    { 6, "Fantasy" },
                    { 7, "Indie" },
                    { 8, "Rogue-like" },
                    { 9, "Racing" },
                    { 10, "Strategy" }
                });

            migrationBuilder.InsertData(
                table: "GameGenres",
                columns: new[] { "GameId", "GenreId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 2 },
                    { 1, 4 },
                    { 1, 6 },
                    { 2, 1 },
                    { 2, 2 },
                    { 2, 4 },
                    { 2, 5 },
                    { 3, 1 },
                    { 3, 4 },
                    { 3, 5 },
                    { 4, 2 },
                    { 4, 3 },
                    { 5, 2 },
                    { 5, 3 },
                    { 5, 7 },
                    { 6, 2 },
                    { 6, 7 },
                    { 6, 8 },
                    { 7, 1 },
                    { 7, 4 },
                    { 7, 6 },
                    { 8, 2 },
                    { 8, 3 },
                    { 8, 4 },
                    { 9, 1 },
                    { 9, 3 },
                    { 9, 7 },
                    { 10, 10 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Achievements_UserId",
                table: "Achievements",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_GameGenres_GenreId",
                table: "GameGenres",
                column: "GenreId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_GameId",
                table: "Reviews",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_UserId_GameId",
                table: "Reviews",
                columns: new[] { "UserId", "GameId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserFollows_FollowingId",
                table: "UserFollows",
                column: "FollowingId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLibraries_GameId",
                table: "UserLibraries",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLibraries_UserId_GameId",
                table: "UserLibraries",
                columns: new[] { "UserId", "GameId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Achievements");

            migrationBuilder.DropTable(
                name: "GameGenres");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "UserFollows");

            migrationBuilder.DropTable(
                name: "UserLibraries");

            migrationBuilder.DropTable(
                name: "Genres");

            migrationBuilder.DropTable(
                name: "Games");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
