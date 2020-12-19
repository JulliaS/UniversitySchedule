using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Schedule.Models;

namespace Schedule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SemesterController : ControllerBase
    {
        private IUnitOfWork<Semester> _semesterUnitOfWork;

        public SemesterController(IUnitOfWork<Semester> semesterRepository)
        {
            _semesterUnitOfWork = semesterRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Semester>> GetAll() => await _semesterUnitOfWork.Repository.GetAll();

        [HttpGet("{id}")]
        public async Task<Semester> GetById(int id) => await _semesterUnitOfWork.Repository.GetById(id);

        [HttpPost]
        public async Task<Semester> AddSemester([FromBody] Semester semester) => await _semesterUnitOfWork.Repository.Insert(semester);

        [HttpPut("{id}")]
        public async Task<Semester> UpdateSemester(int id, [FromBody] Semester semester) => await _semesterUnitOfWork.Repository.Update(id, semester);

        [HttpDelete("{id}")]
        public async Task<bool> DeleteSemester(int id) => await _semesterUnitOfWork.Repository.Delete(id);
    }
}
