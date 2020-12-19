using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Schedule.Models
{
    public class Schedule : BaseEntity
    {
        public Teacher Teacher { get; set; }
        public Subject Subject { get; set; }
        public Room Room { get; set; }
        public Lesson Lesson { get; set; }
        public Group Group { get; set; }
        public Semester Semester { get; set; }
        public Availability Availability { get; set; }
    }
}
