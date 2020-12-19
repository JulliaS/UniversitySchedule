using Schedule.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Schedule
{
    public interface IUnitOfWork<T> where T : BaseEntity
    {
        IRepository<T> Repository { get; }
        void Save();
    }

}
