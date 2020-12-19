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
    public class AvailabilityController : ControllerBase
    {
        private IUnitOfWork<Availability> _availabilityUnitOfWork;
        public AvailabilityController(IUnitOfWork<Availability> availabilityRepository)
        {
            _availabilityUnitOfWork = availabilityRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Availability>> GetAll() => await _availabilityUnitOfWork.Repository.GetAll();

        [HttpGet("{id}")]
        public async Task<Availability> GetById(int id) => await _availabilityUnitOfWork.Repository.GetById(id);

        [HttpPost]
        public async Task<Availability> AddAvailability([FromBody] Availability availability) => await _availabilityUnitOfWork.Repository.Insert(availability);

        [HttpPut("{id}")]
        public async Task<Availability> UpdateAvailability(int id, [FromBody] Availability availability) => await _availabilityUnitOfWork.Repository.Update(id, availability);

        [HttpDelete("{id}")]
        public async Task<bool> DeleteAvailability(int id) => await _availabilityUnitOfWork.Repository.Delete(id);
    }
}
