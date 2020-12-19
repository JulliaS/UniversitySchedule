using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Schedule.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Schedule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private IUnitOfWork<Models.Schedule> _scheduleUnitOfWork;

        public ScheduleController(IUnitOfWork<Models.Schedule> scheduleRepository)
        {
            _scheduleUnitOfWork = scheduleRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Models.Schedule>> GetAllSchedules() => await _scheduleUnitOfWork.Repository.GetAll();

        [HttpGet("{id}")]
        public async Task<Models.Schedule> GetScheduleById(int id) => await _scheduleUnitOfWork.Repository.GetById(id);

        [HttpGet("with/properties")]
        public async Task<IEnumerable<Models.Schedule>> GetAllSchedules([FromQuery] string[] property) => await _scheduleUnitOfWork.Repository.GetWithInclude(property);

        [HttpGet("{id}/with/properties")]
        public async Task<Models.Schedule> GetScheduleById(int id, [FromQuery] string[] property) => await _scheduleUnitOfWork.Repository.GetWithIncludeById(id, property);

        [HttpPost]
        public async Task<Models.Schedule> AddSchedule([FromBody] Models.Schedule schedule)
        {
            var result = await _scheduleUnitOfWork.Repository.Insert(schedule);

            return await GetScheduleById(schedule.Id, new string[] { "Teacher", "Room", "Subject", "Lesson" });
        }

        [HttpPut("{id}")]
        public async Task<Models.Schedule> UpdateSchedule(int id, [FromBody] Models.Schedule schedule) => await _scheduleUnitOfWork.Repository.Update(id, schedule);

        [HttpDelete("{id}")]
        public async Task<bool> DeleteBook(int id) => await _scheduleUnitOfWork.Repository.Delete(id);
    }
}
