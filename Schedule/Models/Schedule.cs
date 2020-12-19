using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Schedule.Models
{
    public class Schedule : BaseEntity
    {
        public int NumberDay {get; set;}
        public int TeacherId { get; set; }
        public int SubjectId { get; set; }
        public int RoomId { get; set; }
        public int LessonId { get; set; }
        public int GroupId { get; set; }
        public int SemesterId { get; set; }
        public int AvailabilityId { get; set; }
        public Teacher Teacher { get; set; }
        public Subject Subject { get; set; }
        public Room Room { get; set; }
        public Lesson Lesson { get; set; }
        public Group Group { get; set; }
        public Semester Semester { get; set; }
        public Availability Availability { get; set; }
    }
}
