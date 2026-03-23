using CheckpointAPI.Entities;

namespace CheckpointAPI.Business.Abstract
{
    /// <summary>
    /// Oyun servisi arayüzü
    /// </summary>
    public interface IGameService
    {
        Task<List<Game>> GetTrendingGamesAsync();
        Task<Game?> GetGameByIdAsync(int id);
        Task<List<Game>> SearchGamesAsync(string query, string? genre = null);
        Task<List<Game>> GetSimilarGamesAsync(int gameId);
    }

    /// <summary>
    /// Yorum servisi arayüzü
    /// </summary>
    public interface IReviewService
    {
        Task<List<Review>> GetReviewsByGameAsync(int gameId);
        Task<List<Review>> GetReviewsByUserAsync(int userId);
        Task<Review> CreateReviewAsync(Review review);
        Task<Review> UpdateReviewAsync(Review review);
        Task DeleteReviewAsync(int id);
    }

    /// <summary>
    /// Kütüphane servisi arayüzü
    /// </summary>
    public interface ILibraryService
    {
        Task<List<UserLibrary>> GetUserLibraryAsync(int userId, GameStatus? status = null);
        Task<UserLibrary> AddGameToLibraryAsync(int userId, int gameId, GameStatus status);
        Task<UserLibrary> UpdateProgressAsync(int libraryId, int progress);
        Task RemoveFromLibraryAsync(int libraryId);
    }

    /// <summary>
    /// Kullanıcı servisi arayüzü
    /// </summary>
    public interface IUserService
    {
        Task<User?> GetUserByIdAsync(int id);
        Task<User> UpdateProfileAsync(User user);
        Task FollowUserAsync(int followerId, int followingId);
        Task UnfollowUserAsync(int followerId, int followingId);
    }
}
