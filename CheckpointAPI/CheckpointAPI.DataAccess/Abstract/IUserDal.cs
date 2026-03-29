using CheckpointAPI.Entities;

namespace CheckpointAPI.DataAccess.Abstract
{
    public interface IUserDal : IRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByUsernameAsync(string username);
    }
}
