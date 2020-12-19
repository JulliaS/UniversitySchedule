using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Schedule.Models;
// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Schedule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private IUnitOfWork<Group> _groupUnitOfWork;
        public GroupController(IUnitOfWork<Group> groupRepository)
        {
            _groupUnitOfWork = groupRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Group>> GetAllGroups() => await _groupUnitOfWork.Repository.GetAll();

        [HttpGet("{id}")]
        public async Task<Group> GetGroupById(int id) => await _groupUnitOfWork.Repository.GetById(id);

        [HttpGet("with/properties")]
        public async Task<IEnumerable<Group>> GetAllGroups([FromQuery] string[] property) => await _groupUnitOfWork.Repository.GetWithInclude(property);

        [HttpGet("{id}/with/properties")]
        public async Task<Group> GetGroupById(int id, [FromQuery] string[] property) => await _groupUnitOfWork.Repository.GetWithIncludeById(id, property);
        [HttpGet("groups/{facultyId}")]
        public async Task<IEnumerable<Group>> GetGroupsByFacultyId(int facultyId) => await _groupUnitOfWork.Repository.FindByCondition(group => group.FacultyId == facultyId);
  
        [HttpPost]
        public async Task<Group> AddGroup([FromBody] Group group)
        {
            var result = await _groupUnitOfWork.Repository.Insert(group);

            return await GetGroupById(group.Id, new string[] { "Faculty" });
        }

        [HttpPut("{id}")]
        public async Task<Group> UpdateGroup(int id, [FromBody] Group group) => await _groupUnitOfWork.Repository.Update(id, group);

        [HttpDelete("{id}")]
        public async Task<bool> DeleteBook(int id) => await _groupUnitOfWork.Repository.Delete(id);
    }
}
