using CheckpointAPI.Business.Abstract;
using CheckpointAPI.DataAccess.Abstract;
using CheckpointAPI.Entities;

namespace CheckpointAPI.Business.Concrete
{
    public class GameService : IGameService
    {
        private readonly IGameDal _gameDal;

        public GameService(IGameDal gameDal)
        {
            _gameDal = gameDal;
        }

        public Task<List<Game>> GetTrendingGamesAsync() =>
            _gameDal.GetTrendingAsync();

        public Task<Game?> GetGameByIdAsync(int id) =>
            _gameDal.GetByIdWithGenresAsync(id);

        public Task<List<Game>> SearchGamesAsync(string query, string? genre = null) =>
            _gameDal.SearchAsync(query, genre);

        public Task<List<Game>> GetSimilarGamesAsync(int gameId) =>
            _gameDal.GetSimilarAsync(gameId);
    }
}
