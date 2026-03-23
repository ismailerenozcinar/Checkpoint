namespace CheckpointAPI.DataAccess.Abstract
{
    /// <summary>
    /// Generic repository arayüzü
    /// Tüm veri erişim sınıfları için temel CRUD işlemleri
    /// </summary>
    public interface IRepository<T> where T : class
    {
        Task<List<T>> GetAllAsync();
        Task<T?> GetByIdAsync(int id);
        Task<T> AddAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task DeleteAsync(int id);
    }
}
