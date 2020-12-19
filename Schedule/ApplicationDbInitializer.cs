using System;
using System.Linq;
using NpgsqlTypes;
using Schedule.Models;

namespace Schedule
{
    public class ApplicationDbInitializer
    {

        public static void SeedData(ScheduleContext context)
        {
            if (!context.Availability.Any())
            {
                context.Availability.AddRange(
                new Availability
                {
                    Name = "Numerator"
                },
                new Availability
                {
                    Name = "Denominator"
                },
                new Availability
                {
                    Name = "Both"
                }
            );
            }
            context.SaveChanges();
            if (!context.Faculties.Any())
            {
                context.Faculties.AddRange(
               new Faculty
               {
                   Name = "Faculty of Foreign Languages"
               },
               new Faculty
               {
                   Name = "Faculty of Physics"
               },
               new Faculty
               {
                   Name = "Faculty of Applied Mathematics and Informatics"
               },
               new Faculty
               {
                   Name = "Faculty of Biology"
               },
               new Faculty
               {
                   Name = "Faculty of Chemistry"
               },
               new Faculty
               {
                   Name = "Faculty of Culture and Arts"
               },
               new Faculty
               {
                   Name = "Faculty of Economics"
               },
               new Faculty
               {
                   Name = "Faculty of Geography"
               },
               new Faculty
               {
                   Name = "Faculty of Geology"
               },
               new Faculty
               {
                   Name = "Faculty of History"
               },
               new Faculty
               {
                   Name = "Faculty of International Relations"
               },
               new Faculty
               {
                   Name = "Faculty of Journalism"
               },
               new Faculty
               {
                   Name = "Faculty of Law"
               },
               new Faculty
               {
                   Name = "Faculty of Mechanics and Mathematics"
               });
            }
            context.SaveChanges();

            if (!context.Groups.Any())
            {
                context.Groups.AddRange(
                 new Group
                 {
                     Name = "PMP51",
                     FacultyId = 3

                 },
                 new Group
                 {
                     Name = "PMP52",
                     FacultyId = 3

                 },
                 new Group
                 {
                     Name = "PMA51",
                     FacultyId = 3

                 },
                 new Group
                 {
                     Name = "PMA52",
                     FacultyId = 3

                 },
                 new Group
                 {
                     Name = "PMI51",
                     FacultyId = 3

                 },
                 new Group
                 {
                     Name = "PMI52",
                     FacultyId = 3

                 },
                 new Group
                 {
                     Name = "PMI53",
                     FacultyId = 3
                 }

             );
            }
            context.SaveChanges();
            if (!context.Lessons.Any())
            {
                context.Lessons.AddRange(
                    new Lesson
                    {
                        Number = 1,
                        Hour = 8,
                        Minute = 30
                    },
                    new Lesson
                    {
                        Number = 2,
                        Hour = 10,
                        Minute = 10
                    },
                    new Lesson
                    {
                        Number = 3,
                        Hour = 11,
                        Minute = 50
                    },
                    new Lesson
                    {
                        Number = 4,
                        Hour = 13,
                        Minute = 30
                    },
                    new Lesson
                    {
                        Number = 5,
                        Hour = 15,
                        Minute = 5
                    }
                    );
            }
            context.SaveChanges();
            if (!context.Rooms.Any())
            {
                context.Rooms.AddRange(
                    new Room
                    {
                        Name = "265"
                    },
                    new Room
                    {
                        Name = "111"
                    },
                    new Room
                    {
                        Name = "266"
                    },
                    new Room
                    {
                        Name = "439"
                    },
                    new Room
                    {
                        Name = "118"
                    },
                    new Room
                    {
                        Name = "116"
                    },
                    new Room
                    {
                        Name = "119a"
                    },
                    new Room
                    {
                        Name = "119b"
                    }
                    );
            }
            context.SaveChanges();

            if (!context.Semesters.Any())
            {
                context.Semesters.AddRange(
                    new Semester
                    {
                        Number = 1,
                        //StartDate = new DateTime(2020, 09, 01,0,0,0,DateTimeKind.Utc),
                        //EndDate = new DateTime(2020, 12, 31, 0, 0, 0, DateTimeKind.Utc)
                        StartDate = new DateTime(2020, 9, 1),
                        EndDate = new DateTime(2020, 12, 31)
                    }
                    //new Semester
                    //{
                    //    Number = 2,
                    //    StartDate = new DateTime(2021, 02, 11, 0, 0, 0, DateTimeKind.Utc),
                    //    EndDate = new DateTime(2021, 06, 31, 0, 0, 0, DateTimeKind.Utc)
                    //}
                    ) ;
            }
            context.SaveChanges();

            if (!context.Subjects.Any())
            {
                context.Subjects.AddRange(
                    new Subject
                    {
                        FacultyId = 3,
                        Name = "Algebra and Geometry"

                    },
                    new Subject
                    {
                        FacultyId = 3,
                        Name = "Discrete Mathematics"
                    },
                    new Subject
                    {
                        FacultyId = 3,
                        Name = "Algorithms for Computing Processes "
                    },
                    new Subject
                    {
                        FacultyId = 3,
                        Name = "Mathematical Analysis"
                    },
                    new Subject
                    {
                        FacultyId = 3,
                        Name = "Basics of Programming"
                    },
                    new Subject
                    {
                        FacultyId = 3,
                        Name = "History of Ukrainian Culture"
                    },
                    new Subject
                    {
                        FacultyId = 3,
                        Name = "History of Ukraine"
                    },
                    new Subject
                    {
                        FacultyId = 3,
                        Name = "Architecture of Computer Systems"
                    },
                    new Subject
                    {
                        FacultyId = 3,
                        Name = "Object Oriented Programming"
                    },
                    new Subject
                    {
                        FacultyId = 3,
                        Name = "Equations of Mathematical Physics"
                    }
                    );
            }
            context.SaveChanges();
            if (!context.Teachers.Any())
            {
                context.Teachers.AddRange(
                    new Teacher
                    {
                        FirstName = "Ivan",
                        LastName = "Dyyak",
                        FacultyId = 3,
                        Reference = "ivan.dyyak@lnu.edu.ua"
                    },
                    new Teacher
                    {
                        FirstName = "Ivan",
                        LastName = "Dyyak",
                        FacultyId = 3,
                        Reference = "ivan.dyyak@lnu.edu.ua"
                    },
                    new Teacher
                    {
                        FirstName = "Olha",
                        LastName = "Kovalchuk",
                        FacultyId = 3,
                        Reference = "olha.kovalchuk@lnu.edu.ua"
                    },
                    new Teacher
                    {
                        FirstName = "Vitaliy ",
                        LastName = "Horlatch",
                        FacultyId = 3,
                        Reference = "vitaliy.horlatch@lnu.edu.ua"
                    },
                    new Teacher
                    {
                        FirstName = "Andrii",
                        LastName = "Melnychyn",
                        FacultyId = 3,
                        Reference = "andriy.melnychyn@lnu.edu.ua"
                    },
                    new Teacher
                    {
                        FirstName = "Yarema",
                        LastName = "Savula",
                        FacultyId = 3,
                        Reference = "savula@lnu.edu.ua"
                    },
                    new Teacher
                    {
                        FirstName = "Vasyl",
                        LastName = "Biletskyj",
                        FacultyId = 3,
                        Reference = "Vasyl.Biletskyj@lnu.edu.ua"
                    },
                    new Teacher
                    {
                        FirstName = "Yuriy",
                        LastName = "Yashchuk",
                        FacultyId = 3,
                        Reference = "yuriy.yashchuk@lnu.edu.ua"
                    },
                    new Teacher
                    {
                        FirstName = "Roman",
                        LastName = "Chapko",
                        FacultyId = 3,
                        Reference = "roman.chapko@lnu.edu.ua"
                    },
                    new Teacher
                    {
                        FirstName = "Ihor",
                        LastName = "Mukha",
                        FacultyId = 3,
                        Reference = "ihor.mukha@lnu.edu.ua"
                    },
                    new Teacher
                    {
                        FirstName = "Mykhaylo",
                        LastName = "Shcherbatyy",
                        FacultyId = 3,
                        Reference = "mykhaylo.shcherbatyy@lnu.edu.ua"
                    });
            }
            context.SaveChanges();

            if (!context.Schedule.Any())
            {
                context.Schedule.AddRange(
                    new Models.Schedule
                    {
                        NumberDay = 1,
                        TeacherId = 1,
                        SubjectId = 1,
                        RoomId = 1,
                        LessonId = 1,
                        GroupId = 1,
                        SemesterId = 1,
                        AvailabilityId = 1
                    },
                    new Models.Schedule
                    {
                        NumberDay = 1,
                        TeacherId = 2,
                        SubjectId = 2,
                        RoomId = 1,
                        LessonId = 2,
                        GroupId = 2,
                        SemesterId = 1,
                        AvailabilityId = 3
                    },
                    new Models.Schedule
                    {
                        NumberDay = 1,
                        TeacherId = 3,
                        SubjectId = 3,
                        RoomId = 3,
                        LessonId = 3,
                        GroupId = 4,
                        SemesterId = 1,
                        AvailabilityId = 2
                    },
                    new Models.Schedule
                    {
                        NumberDay = 2,
                        TeacherId = 4,
                        SubjectId = 4,
                        RoomId = 2,
                        LessonId = 1,
                        GroupId = 3,
                        SemesterId = 1,
                        AvailabilityId = 2
                    },
                    new Models.Schedule
                    {
                        NumberDay = 2,
                        TeacherId = 5,
                        SubjectId = 5,
                        RoomId = 4,
                        LessonId = 2,
                        GroupId = 5,
                        SemesterId = 1,
                        AvailabilityId = 3
                    },
                    new Models.Schedule
                    {
                        NumberDay = 2,
                        TeacherId = 6,
                        SubjectId = 6,
                        RoomId = 5,
                        LessonId = 3,
                        GroupId = 6,
                        SemesterId = 1,
                        AvailabilityId = 2
                    },
                    new Models.Schedule
                    {
                        NumberDay = 2,
                        TeacherId = 7,
                        SubjectId = 7,
                        RoomId = 6,
                        LessonId = 4,
                        GroupId = 7,
                        SemesterId = 1,
                        AvailabilityId = 2
                    },
                    new Models.Schedule
                    {
                        NumberDay = 2,
                        TeacherId = 8,
                        SubjectId = 8,
                        RoomId = 7,
                        LessonId = 5,
                        GroupId = 2,
                        SemesterId = 1,
                        AvailabilityId = 3
                    },
                    new Models.Schedule
                    {
                        NumberDay = 3,
                        TeacherId = 9,
                        SubjectId = 9,
                        RoomId = 4,
                        LessonId = 1,
                        GroupId = 3,
                        SemesterId = 1,
                        AvailabilityId = 1
                    },
                    new Models.Schedule
                    {
                        NumberDay = 4,
                        TeacherId = 10,
                        SubjectId = 10,
                        RoomId = 5,
                        LessonId = 3,
                        GroupId = 4,
                        SemesterId = 1,
                        AvailabilityId = 3
                    }
                    );
            }
            context.SaveChanges();
        }
    }
}
