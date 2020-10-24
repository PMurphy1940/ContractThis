using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ContractThis.Models;
using ContractThis.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ContractThis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;
        public ProjectController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;

        }

        [HttpGet("{id}")]
        public IActionResult GetUserProjects(int id)
        {
            var projects = _projectRepository.GetOwnerProjects(id);
            return projects == null ? NotFound() : (IActionResult)Ok(projects);
        }
    }
}
