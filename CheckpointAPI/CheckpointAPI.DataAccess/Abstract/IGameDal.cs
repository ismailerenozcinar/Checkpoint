using CheckpointAPI.Entities;

namespace CheckpointAPI.DataAccess.Abstract
{
    public interface IGameDal : IRepository<Game>
    {
        Task<List<Game>> GetTrendingAsync(int count = 10);
        Task<Game?> GetByIdWithGenresAsync(int id);
        Task<List<Game>> SearchAsync(string query, string? genre = null);
        Task<List<Game>> GetSimilarAsync(int gameId, int count = 6);
    }
}
