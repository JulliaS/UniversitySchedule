using Schedule.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Schedule
{
    public class UnitOfWork<T> : IUnitOfWork<T>, IDisposable where T : BaseEntity
    {
        private readonly ScheduleContext _context;
        private IRepository<T> _repository;

        public UnitOfWork(ScheduleContext context)
        {
            _context = context;
        }

        public IRepository<T> Repository
        {
            get { return _repository ?? (_repository = new Repository<T>(_context)); }
        }

        public void Save()
        {
            _context.SaveChanges();
        }


        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
                this.disposed = true;
            }
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
