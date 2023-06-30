using JobBoard.Data;
using JobBoard.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobBoard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        ApiDbContext _dbContext = new ApiDbContext();

        // GET: api/<SkillsController>
        [HttpGet]
        [Authorize(Policy = "admin")]
        public IEnumerable<Role> GetRoles()
        {
            return _dbContext.Roles;
        }
    }
}
