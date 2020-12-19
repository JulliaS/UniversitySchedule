using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Schedule.Models
{
    public class Semester : BaseEntity
    {
        public int Number { get; set; }
        public  SemesterBoundaries SemesterBoundaries { get; set; }
        public Year Year { get; set; }
    }
}