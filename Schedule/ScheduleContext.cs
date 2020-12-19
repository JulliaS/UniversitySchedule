using Microsoft.EntityFrameworkCore;
using Schedule.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Schedule
{
    public class ScheduleContext : DbContext
    {
        public DbSet<Models.Schedule> Schedule{ get; set; }
        public DbSet<Faculty> Faculties{ get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Availability> Availability { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Semester> Semesters { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Teacher> Teachers { get; set; }

        public ScheduleContext(DbContextOptions<ScheduleContext> options) : base (options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

    }
}
