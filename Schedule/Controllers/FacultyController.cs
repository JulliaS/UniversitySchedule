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
    public class FacultyController : ControllerBase
    {
        private IUnitOfWork<Faculty> _facultyUnitOfWork;
        public FacultyController(IUnitOfWork<Faculty> facultyRepository)
        {
            _facultyUnitOfWork = facultyRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Faculty>> GetAll() => await _facultyUnitOfWork.Repository.GetAll();

        [HttpGet("{id}")]
        public async Task<Faculty> GetById(int id) => await _facultyUnitOfWork.Repository.GetById(id);

        [HttpPost]
        public async Task<Faculty> AddFaculty([FromBody] Faculty faculty) => await _facultyUnitOfWork.Repository.Insert(faculty);

        [HttpPut("{id}")]
        public async Task<Faculty> UpdateFaculty(int id, [FromBody] Faculty faculty) => await _facultyUnitOfWork.Repository.Update(id, faculty);

        [HttpDelete("{id}")]
        public async Task<bool> DeleteFaculty(int id) => await _facultyUnitOfWork.Repository.Delete(id);
    }
}
