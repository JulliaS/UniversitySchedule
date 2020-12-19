using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Schedule.Models;

namespace Schedule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private IUnitOfWork<Teacher> _teacherUnitOfWork;
        public TeacherController(IUnitOfWork<Teacher> teacherRepository)
        {
            _teacherUnitOfWork = teacherRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Teacher>> GetAllTeachers() => await _teacherUnitOfWork.Repository.GetAll();

        [HttpGet("{id}")]
        public async Task<Teacher> GetTeacherById(int id) => await _teacherUnitOfWork.Repository.GetById(id);

        [HttpGet("with/properties")]
        public async Task<IEnumerable<Teacher>> GetAllTeachers([FromQuery] string[] property) => await _teacherUnitOfWork.Repository.GetWithInclude(property);

        [HttpGet("{id}/with/properties")]
        public async Task<Teacher> GetTeacherById(int id, [FromQuery] string[] property) => await _teacherUnitOfWork.Repository.GetWithIncludeById(id, property);
       
        [HttpPost]
        public async Task<Teacher> AddTeacher([FromBody] Teacher teacher)
        {
            var result = await _teacherUnitOfWork.Repository.Insert(teacher);

            return await GetTeacherById(teacher.Id, new string[] { "Faculty" });
        }

        [HttpPut("{id}")]
        public async Task<Teacher> UpdateTeacher(int id, [FromBody] Teacher teacher) => await _teacherUnitOfWork.Repository.Update(id, teacher);

        [HttpDelete("{id}")]
        public async Task<bool> DeleteTeacher(int id) => await _teacherUnitOfWork.Repository.Delete(id);
    }
}
