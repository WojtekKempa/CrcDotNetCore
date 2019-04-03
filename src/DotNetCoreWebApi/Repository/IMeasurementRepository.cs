using DotNetCoreWebApi.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DotNetCoreWebApi.Repository
{
    public interface IMeasurementRepository<TEntity>
    {
        Task<IEnumerable<TEntity>> GetAll();
        Task<TEntity> Get(long id);
        Task Add(TEntity entity);
        Task Update(Measurement measurement, TEntity entity);
        Task Delete(Measurement measurement);
    }
}
