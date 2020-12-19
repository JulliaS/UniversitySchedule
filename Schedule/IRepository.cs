using Schedule.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Schedule
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(int id);
        Task<T> Insert(T entity);
        Task<T> Update(int id, T entity);
        Task<bool> Delete(int id);
        Task<IEnumerable<T>> GetWithInclude(params string[] includeProperties);
        Task<T> GetWithIncludeById(int id, params string[] includeProperties);
        Task<IEnumerable<T>> FindByCondition(Expression<Func<T, bool>> expression);
    }
}
