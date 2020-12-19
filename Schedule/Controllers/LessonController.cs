using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Schedule.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Schedule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private IUnitOfWork<Lesson> _lessonUnitOfWork;
        public LessonController(IUnitOfWork<Lesson> lessonRepository)
        {
            _lessonUnitOfWork = lessonRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Lesson>> GetAll() => await _lessonUnitOfWork.Repository.GetAll();

        [HttpGet("{id}")]
        public async Task<Lesson> GetById(int id) => await _lessonUnitOfWork.Repository.GetById(id);

        [HttpPost]
        public async Task<Lesson> AddLesson([FromBody] Lesson lesson) => await _lessonUnitOfWork.Repository.Insert(lesson);

        [HttpPut("{id}")]
        public async Task<Lesson> UpdateLesson(int id, [FromBody] Lesson lesson) => await _lessonUnitOfWork.Repository.Update(id, lesson);

        [HttpDelete("{id}")]
        public async Task<bool> DeleteLesson(int id) => await _lessonUnitOfWork.Repository.Delete(id);
    }
}
