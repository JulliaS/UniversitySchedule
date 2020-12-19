using Microsoft.EntityFrameworkCore;
using Schedule.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Schedule
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        protected readonly ScheduleContext context;
        private DbSet<T> entities;
        string errorMessage = "Null entity";
        public Repository(ScheduleContext context)
        {
            this.context = context;
            entities = context.Set<T>();
        }
        public async Task<IEnumerable<T>> GetAll()
        {
            return await entities.ToListAsync();
        }
        public async Task<T> GetById(int id)
        {
            return await entities.SingleOrDefaultAsync(s => s.Id == id);
        }
        public async Task<T> Insert(T entity)
        {
            if (entity == null) throw new ArgumentNullException(errorMessage);

            entities.Add(entity);
            await context.SaveChangesAsync();

            return entity;
        }
        public async Task<T> Update(int id, T entity)
        {
            if (entity == null) throw new ArgumentNullException(errorMessage);
            if (!entities.Any(x => x.Id == id))
            {
                throw new ArgumentNullException(errorMessage);
            }

            entity.Id = id;

            context.Update(entity);
            await context.SaveChangesAsync();
            
            return entity;
        }
        public async Task<bool> Delete(int id)
        {
            T entity = await entities.SingleOrDefaultAsync(s => s.Id == id);
            if (entity == null) throw new ArgumentNullException(errorMessage);

            entities.Remove(entity);
            await context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<T>> GetWithInclude(params string[] includeProperties)
        {
            return await Include(includeProperties).ToListAsync();
        }

        public async Task<T> GetWithIncludeById(int id,
            params string[] includeProperties)
        {
            var query = Include(includeProperties);
            return await query.Where(x => x.Id == id).FirstOrDefaultAsync();
        }
        public async Task<IEnumerable<T>> FindByCondition(Expression<Func<T,bool>> expression)
        {
            return await entities.Where(expression).AsNoTracking().ToListAsync();
        }
        private IQueryable<T> Include(params string[] properties)
        {
            Expression<Func<T, object>>[] includeProperties = new Expression<Func<T, object>>[properties.Length];

            for (int i = 0; i < properties.Length; i++)
            {
                var lambda = GetLambda(properties[i]);
                includeProperties[i] = lambda;
            }
            IQueryable<T> query = entities.AsNoTracking();
            return includeProperties
                .Aggregate(query, (current, includeProperty) => current.Include(includeProperty));
        }

        private Expression<Func<T, object>> GetLambda(string property)
        {
            var parentType = typeof(T);
            var param = Expression.Parameter(parentType, "p");
            Expression parent;
            if (property.Contains('.'))
            {
                string[] properties = property.Split('.');
               parent = Expression.Property(param, properties[0]);
                for (int i = 1; i < properties.Length; i++)
                {
                    parentType = parentType.GetProperty(properties[i - 1]).PropertyType;
                    parent = Expression.Property(parent, parentType, properties[i]);
                }
            }
            else
            {
                parent = Expression.Property(param, property);
            }

            if (!parent.Type.IsValueType)
            {
                return Expression.Lambda<Func<T, object>>(parent, param);
            }
            var convert = Expression.Convert(parent, typeof(object));
            return Expression.Lambda<Func<T, object>>(convert, param);
        }
    }
}
