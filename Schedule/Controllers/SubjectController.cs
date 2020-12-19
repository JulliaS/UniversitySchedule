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
    public class SubjectController : ControllerBase
    {
        private IUnitOfWork<Subject> _subjectUnitOfWork;
        public SubjectController(IUnitOfWork<Subject> subjectRepository)
        {
            _subjectUnitOfWork = subjectRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Subject>> GetAllsubjects() => await _subjectUnitOfWork.Repository.GetAll();

        [HttpGet("{id}")]
        public async Task<Subject> GetSubjectById(int id) => await _subjectUnitOfWork.Repository.GetById(id);

        [HttpGet("with/properties")]
        public async Task<IEnumerable<Subject>> GetAllSubjects([FromQuery] string[] property) => await _subjectUnitOfWork.Repository.GetWithInclude(property);

        [HttpGet("{id}/with/properties")]
        public async Task<Subject> GetSubjectById(int id, [FromQuery] string[] property) => await _subjectUnitOfWork.Repository.GetWithIncludeById(id, property);
        [HttpGet("subjects/{facultyId}")]
        public async Task<IEnumerable<Subject>> GetSubjectsByFacultyId(int facultyId) => await _subjectUnitOfWork.Repository.FindByCondition(subject => subject.FacultyId == facultyId);
        [HttpPost]
        public async Task<Subject> AddSubject([FromBody] Subject subject)
        {
            var result = await _subjectUnitOfWork.Repository.Insert(subject);
            return await GetSubjectById(subject.Id, new string[] { "Faculty" });
        }

        [HttpPut("{id}")]
        public async Task<Subject> UpdateSubject(int id, [FromBody] Subject subject) => await _subjectUnitOfWork.Repository.Update(id, subject);

        [HttpDelete("{id}")]
        public async Task<bool> DeleteSubject(int id) => await _subjectUnitOfWork.Repository.Delete(id);
    }
}
