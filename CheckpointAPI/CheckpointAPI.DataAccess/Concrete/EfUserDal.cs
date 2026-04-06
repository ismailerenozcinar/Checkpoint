using CheckpointAPI.Entities;
using CheckpointAPI.DataAccess.Context;
using CheckpointAPI.DataAccess.Abstract;
using Microsoft.EntityFrameworkCore;

namespace CheckpointAPI.DataAccess.Concrete
{
    public class EfUserDal : EfRepositoryBase<User>, IUserDal
    {
        private readonly CheckpointDbContext _context;

        public EfUserDal(CheckpointDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Username == username);
        }
    }
}
