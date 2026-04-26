using Microsoft.EntityFrameworkCore;
using CheckpointAPI.DataAccess.Abstract;
using CheckpointAPI.DataAccess.Context;
using CheckpointAPI.Entities;

namespace CheckpointAPI.DataAccess.Concrete
{
    public class EfGameDal : EfRepositoryBase<Game>, IGameDal
    {
        private readonly CheckpointDbContext _context;

        public EfGameDal(CheckpointDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Game>> GetTrendingAsync(int count = 10)
        {
            return await _context.Games
                .Include(g => g.GameGenres)
                    .ThenInclude(gg => gg.Genre)
                .OrderByDescending(g => g.Rating)
                .ThenByDescending(g => g.ReviewCount)
                .Take(count)
                .ToListAsync();
        }

        public async Task<Game?> GetByIdWithGenresAsync(int id)
        {
            return await _context.Games
                .Include(g => g.GameGenres)
                    .ThenInclude(gg => gg.Genre)
                .FirstOrDefaultAsync(g => g.Id == id);
        }

        public async Task<List<Game>> SearchAsync(string query, string? genre = null)
        {
            var q = _context.Games
                .Include(g => g.GameGenres)
                    .ThenInclude(gg => gg.Genre)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(query))
                q = q.Where(g => g.Title.Contains(query) ||
                                 (g.Developer != null && g.Developer.Contains(query)));

            if (!string.IsNullOrWhiteSpace(genre))
                q = q.Where(g => g.GameGenres.Any(gg => gg.Genre.Name == genre));

            return await q.OrderByDescending(g => g.Rating).ToListAsync();
        }

        public async Task<List<Game>> GetSimilarAsync(int gameId, int count = 6)
        {
            var genreIds = await _context.GameGenres
                .Where(gg => gg.GameId == gameId)
                .Select(gg => gg.GenreId)
                .ToListAsync();

            if (!genreIds.Any())
                return await GetTrendingAsync(count);

            return await _context.Games
                .Include(g => g.GameGenres)
                    .ThenInclude(gg => gg.Genre)
                .Where(g => g.Id != gameId && g.GameGenres.Any(gg => genreIds.Contains(gg.GenreId)))
                .OrderByDescending(g => g.Rating)
                .Take(count)
                .ToListAsync();
        }
    }
}
