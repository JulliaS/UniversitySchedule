using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Schedule.Models
{
    public class Lesson : BaseEntity
    {
        public int Number { get; set; }
        public int Hour { get; set; }
        public int Minute { get; set; }
    }
}