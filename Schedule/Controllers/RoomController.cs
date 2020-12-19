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
    public class RoomController : ControllerBase
    {

        private IUnitOfWork<Room> _roomUnitOfWork;
        public RoomController(IUnitOfWork<Room> roomRepository)
        {
            _roomUnitOfWork = roomRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Room>> GetAll() => await _roomUnitOfWork.Repository.GetAll();

        [HttpGet("{id}")]
        public async Task<Room> GetById(int id) => await _roomUnitOfWork.Repository.GetById(id);

        [HttpPost]
        public async Task<Room> AddRoom([FromBody] Room room) => await _roomUnitOfWork.Repository.Insert(room);

        [HttpPut("{id}")]
        public async Task<Room> UpdateRoom(int id, [FromBody] Room room) => await _roomUnitOfWork.Repository.Update(id, room);

        [HttpDelete("{id}")]
        public async Task<bool> DeleteRoom(int id) => await _roomUnitOfWork.Repository.Delete(id);
    }
}
